import { list } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    console.log('Loading posts for individual post view...');
    
    const { blobs } = await list({
      prefix: 'blog-posts',
    });
    
    // Find any blog posts file (with or without random suffix)
    const blogFile = blobs.find(b => b.pathname.startsWith('blog-posts'));
    
    if (blogFile) {
      console.log('Found blog file:', blogFile.pathname);
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      console.log('Loaded posts:', posts.length);
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
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      console.log('Looking for post with slug:', slug);
      
      const posts = await loadBlogPosts();
      console.log('All posts:', posts.map(p => ({ id: p.id, slug: p.slug, published: p.published })));
      
      // Find post by slug or id
      const post = posts.find(p => {
        const matches = (p.slug === slug || p.id === slug);
        console.log(`Checking post ${p.id}: slug="${p.slug}", matches=${matches}, published=${p.published}`);
        return matches;
      });
      
      console.log('Found post:', post ? post.id : 'not found');
      
      if (!post) {
        console.log('Post not found');
        return res.status(404).json({ ok: false, error: 'Post not found' });
      }
      
      if (!post.published) {
        console.log('Post is not published');
        return res.status(404).json({ ok: false, error: 'Post not published' });
      }
      
      console.log('Returning post:', post.title);
      res.status(200).json({ ok: true, post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ 
        ok: false, 
        error: 'Failed to fetch post', 
        details: error.message
      });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
