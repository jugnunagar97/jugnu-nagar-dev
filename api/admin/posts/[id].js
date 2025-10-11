import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
const dataDir = path.dirname(BLOG_POSTS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

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

function saveBlogPosts(posts) {
  try {
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
}

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
      const posts = loadBlogPosts();
      const filteredPosts = posts.filter(p => p.id !== id);
      
      if (saveBlogPosts(filteredPosts)) {
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
