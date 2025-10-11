import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Helper functions for blog posts
function loadBlogPosts() {
  try {
    if (!fs.existsSync(BLOG_POSTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

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
      const posts = loadBlogPosts();
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
