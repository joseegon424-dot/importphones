import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string);

export default async function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { path } = req.query;
        if (!path) return res.status(400).json({ error: 'Path required' });

        const { data, error } = await supabase.storage
            .from('formularios')
            .createSignedUploadUrl(path);

        if (error) throw error;
        res.status(200).json({ signedUrl: data.signedUrl, token: data.token, path });
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}
