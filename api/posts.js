import { loadBlogPosts } from './lib/storage.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const posts = await loadBlogPosts();
      // Only return published posts for public API
      const publishedPosts = posts.filter(post => post.published);
      res.json({ ok: true, posts: publishedPosts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ ok: false, error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
