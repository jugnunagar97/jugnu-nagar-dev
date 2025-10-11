import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const chunks = [];
      req.on('data', c => chunks.push(c));
      req.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const filename = `covers/${Date.now()}.jpg`;
        const { url } = await put(filename, buffer, { access: 'public' });
        res.json({ ok: true, url });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: 'Upload failed' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
