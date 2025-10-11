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
      const { slug } = req.query;
      const posts = loadBlogPosts();
      const post = posts.find(p => p.slug === slug || p.id === slug);
      
      if (!post || !post.published) {
        return res.status(404).json({ ok: false, error: 'Post not found' });
      }
      
      res.json({ ok: true, post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ ok: false, error: 'Failed to fetch post' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
