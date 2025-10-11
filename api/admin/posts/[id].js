import { loadBlogPosts, deleteBlogPost } from '../lib/storage.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      console.log('Deleting post with id:', id);
      
      const success = await deleteBlogPost(id);
      console.log('Delete result:', success);
      
      if (success) {
        res.json({ ok: true });
      } else {
        res.status(500).json({ ok: false, error: 'Failed to delete post' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ ok: false, error: 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
