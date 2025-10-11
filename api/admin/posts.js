// Simple in-memory storage for serverless functions
let blogPosts = [];
let isInitialized = false;

async function initializeStorage() {
  if (isInitialized) return;
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
    
    if (fs.existsSync(BLOG_POSTS_FILE)) {
      const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
      blogPosts = JSON.parse(data);
      console.log('Loaded existing blog posts:', blogPosts.length);
    }
  } catch (error) {
    console.log('No existing data found, starting fresh');
    blogPosts = [];
  }
  
  isInitialized = true;
}

async function loadBlogPosts() {
  await initializeStorage();
  return [...blogPosts];
}

async function addBlogPost(post) {
  await initializeStorage();
  const existingIndex = blogPosts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    blogPosts[existingIndex] = post;
  } else {
    blogPosts.unshift(post);
  }
  
  // Try to persist to file system
  try {
    const fs = require('fs');
    const path = require('path');
    
    const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
    const dataDir = path.dirname(BLOG_POSTS_FILE);
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(blogPosts, null, 2));
    console.log('Successfully persisted to file system');
  } catch (fileError) {
    console.log('File system persistence failed, using in-memory storage:', fileError.message);
  }
  
  return true;
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
