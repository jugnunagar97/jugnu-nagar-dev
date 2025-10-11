import { list } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    console.log('Attempting to load blog posts from Blob storage...');
    
    const { blobs } = await list({
      prefix: 'blog-posts',
    });
    
    console.log('All blobs:', blobs.map(b => b.pathname));
    
    // Find any blog posts file (with or without random suffix)
    const blogFile = blobs.find(b => b.pathname.startsWith('blog-posts'));
    
    if (blogFile) {
      console.log('Found blog posts file:', blogFile.pathname, 'at:', blogFile.url);
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      console.log('Loaded blog posts:', posts.length, 'posts');
      return posts;
    } else {
      console.log('No blog-posts file found in Blob storage');
      return [];
    }
  } catch (error) {
    console.error('Error loading blog posts from Blob:', error);
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
      console.log('Total posts loaded:', posts.length);
      
      // Only return published posts for public API
      const publishedPosts = posts.filter(post => post.published === true);
      console.log('Published posts:', publishedPosts.length);
      
      res.json({ ok: true, posts: publishedPosts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ ok: false, error: 'Failed to fetch posts', details: error.message });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
