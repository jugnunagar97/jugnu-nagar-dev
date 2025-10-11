import { list } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    // List all blobs to find our blog posts file
    const { blobs } = await list();
    const blogFile = blobs.find(b => b.pathname === 'blog-posts.json');
    
    if (blogFile) {
      // Fetch and parse the JSON file
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      console.log('Loaded blog posts from Blob:', posts.length);
      return posts;
    } else {
      console.log('No blog posts file found in Blob storage');
      return [];
    }
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
