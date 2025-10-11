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
    console.log('Saving to file:', BLOG_POSTS_FILE);
    console.log('Posts to save:', posts);
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    console.log('Successfully saved blog posts');
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
}

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
      const posts = loadBlogPosts();
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
      
      const posts = loadBlogPosts();
      const existingIndex = posts.findIndex(p => p.id === newPost.id);
      
      if (existingIndex >= 0) {
        posts[existingIndex] = newPost;
      } else {
        posts.unshift(newPost);
      }
      
      console.log('Attempting to save posts:', posts);
      const saveResult = saveBlogPosts(posts);
      console.log('Save result:', saveResult);
      if (saveResult) {
        res.json({ ok: true, post: newPost });
      } else {
        console.error('Failed to save blog posts');
        res.status(500).json({ ok: false, error: 'Failed to save post' });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ ok: false, error: 'Failed to save post' });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
