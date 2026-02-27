import { createClient } from '@supabase/supabase-js';

export const config = {
    api: {
        bodyParser: false, // We need raw body for file uploads
    },
};

async function parseMultipartForm(req: any): Promise<{ file: Buffer; fileName: string; contentType: string; filePath: string }> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => {
            try {
                const body = Buffer.concat(chunks);
                const contentType = req.headers['content-type'] || '';
                const boundaryMatch = contentType.match(/boundary=(.+)/);

                if (!boundaryMatch) {
                    reject(new Error('No boundary found'));
                    return;
                }

                const boundary = boundaryMatch[1];
                const bodyStr = body.toString('latin1');
                const parts = bodyStr.split(`--${boundary}`);

                let file: Buffer | null = null;
                let fileName = 'unknown';
                let fileContentType = 'application/octet-stream';
                let filePath = '';

                for (const part of parts) {
                    if (part.includes('name="file"')) {
                        const fileNameMatch = part.match(/filename="([^"]+)"/);
                        if (fileNameMatch) fileName = fileNameMatch[1];
                        const ctMatch = part.match(/Content-Type:\s*(.+)\r\n/);
                        if (ctMatch) fileContentType = ctMatch[1].trim();

                        const headerEnd = part.indexOf('\r\n\r\n');
                        if (headerEnd !== -1) {
                            const fileData = part.substring(headerEnd + 4);
                            const cleanData = fileData.replace(/\r\n$/, '');
                            file = Buffer.from(cleanData, 'latin1');
                        }
                    }
                    if (part.includes('name="filePath"')) {
                        const headerEnd = part.indexOf('\r\n\r\n');
                        if (headerEnd !== -1) {
                            filePath = part.substring(headerEnd + 4).replace(/\r\n$/, '').trim();
                        }
                    }
                }

                if (!file) {
                    reject(new Error('No file found in request'));
                    return;
                }

                resolve({ file, fileName, contentType: fileContentType, filePath });
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
}

export default async function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { file, fileName, contentType, filePath } = await parseMultipartForm(req);

        const finalPath = filePath || `uploads/${Date.now()}_${fileName}`;

        const { data, error } = await supabase.storage
            .from('formularios')
            .upload(finalPath, file, {
                contentType,
                upsert: true,
            });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ success: true, path: data.path, fullPath: data.fullPath });
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}
