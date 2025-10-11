import { loadBlogPosts, addBlogPost } from './lib/storage.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const posts = await loadBlogPosts();
      res.json({ ok: true, posts });
    } catch (error) {
      console.error('Error fetching admin posts:', error);
      res.status(500).json({ ok: false, error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const newPost = req.body;
      if (!newPost.id || !newPost.title) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }
      
      console.log('Adding blog post:', newPost);
      const success = await addBlogPost(newPost);
      console.log('Add result:', success);
      
      if (success) {
        res.json({ ok: true, post: newPost });
      } else {
        console.error('Failed to add blog post');
        res.status(500).json({ ok: false, error: 'Failed to save post' });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      console.error('Error details:', error.message, error.stack);
      res.status(500).json({ ok: false, error: 'Failed to save post', details: error.message });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
