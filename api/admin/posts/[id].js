import { put, list, del } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    const { blobs } = await list({
      prefix: 'blog-posts',
    });
    
    const blogFile = blobs.find(b => b.pathname.startsWith('blog-posts'));
    
    if (blogFile) {
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      return { posts, existingBlob: blogFile };
    }
    return { posts: [], existingBlob: null };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return { posts: [], existingBlob: null };
  }
}

// Save blog posts to Vercel Blob storage
async function saveBlogPosts(posts, existingBlob = null) {
  try {
    if (existingBlob) {
      await del(existingBlob.url);
    }
    
    const jsonData = JSON.stringify(posts, null, 2);
    await put('blog-posts.json', jsonData, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    return true;
  } catch (error) {
    console.error('Error saving to Blob storage:', error);
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
      const { posts, existingBlob } = await loadBlogPosts();
      
      // Remove the post with matching id
      const filteredPosts = posts.filter(p => p.id !== id);
      
      if (filteredPosts.length === posts.length) {
        return res.status(404).json({ ok: false, error: 'Post not found' });
      }
      
      const success = await saveBlogPosts(filteredPosts, existingBlob);
      
      if (success) {
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
