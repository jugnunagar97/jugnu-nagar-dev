import { list } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    const { blobs } = await list();
    const blogFile = blobs.find(b => b.pathname === 'blog-posts.json');
    
    if (blogFile) {
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      console.log('Loaded blog posts from Blob:', posts.length);
      return posts;
    } else {
      console.log('No blog posts file found');
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
      const { slug } = req.query;
      const posts = await loadBlogPosts();
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
