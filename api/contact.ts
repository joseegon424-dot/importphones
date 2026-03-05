import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_EMAIL || 'info@importphones.net';

export default async function handler(req, res) {
  // CORS handles
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, location, service, message, filePath } = req.body;

    let fileUrl = '';
    if (filePath) {
      try {
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        if (!supabaseUrl || !supabaseKey) {
          console.error("Missing Supabase credentials in Vercel Env");
        }
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase.storage.from('formularios').createSignedUrl(filePath, 60 * 60 * 24 * 30); // Valid 30 days

        if (error) {
          console.error('Supabase createSignedUrl error:', error);
        } else if (data) {
          fileUrl = data.signedUrl;
        }
      } catch (err) {
        console.error('Supabase client error in createSignedUrl:', err);
      }
    }

    const data = await resend.emails.send({
      from: 'Importphones Web <onboarding@resend.dev>',
      to: [toEmail],
      subject: `Contacto Web: ${name} (${service || 'General'})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px;">
          <h2 style="color: #E53935; margin-top: 0;">Nuevo Mensaje de Contacto</h2>
          <p>Has recibido un nuevo mensaje desde el formulario web.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;"/>
          
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'N/A'}</p>
          <p><strong>Localidad/CP:</strong> ${location || 'N/A'}</p>
          <p><strong>Servicio de interés:</strong> ${service || 'N/A'}</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Mensaje:</p>
            <p style="margin-top: 5px; white-space: pre-wrap;">${message || 'Sin mensaje adicional.'}</p>
          </div>

          ${fileUrl ? `
          <div style="margin-top: 20px; padding: 15px; background: #fff3f3; border-left: 4px solid #E53935; border-radius: 4px;">
            <p style="margin-top: 0;"><strong>📎 Archivo Adjunto (Factura/Documento):</strong></p>
            <a href="${fileUrl}" style="display: inline-block; background: #E53935; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin: 10px 0;">Ver / Descargar Archivo</a>
            <p style="font-size: 0.8em; color: #666; margin-bottom: 0;">Enlace seguro válido por 30 días.</p>
          </div>
          ` : '<p style="color: #666; font-style: italic;">Sin archivo adjunto.</p>'}
        </div>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: (error as any).message || 'Internal error' });
  }
}
