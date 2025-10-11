import { put, list, del } from '@vercel/blob';

// Load blog posts from Vercel Blob storage
async function loadBlogPosts() {
  try {
    const { blobs } = await list({
      prefix: 'blog-posts',
    });
    
    console.log('All blobs found:', blobs.map(b => b.pathname));
    
    // Find any blog posts file (with or without random suffix)
    const blogFile = blobs.find(b => b.pathname.startsWith('blog-posts'));
    
    if (blogFile) {
      console.log('Admin: Found blog file:', blogFile.pathname);
      const response = await fetch(blogFile.url);
      const posts = await response.json();
      console.log('Admin: Loaded blog posts from Blob:', posts.length);
      return { posts, existingBlob: blogFile };
    } else {
      console.log('Admin: No blog posts file found, starting fresh');
      return { posts: [], existingBlob: null };
    }
  } catch (error) {
    console.error('Admin: Error loading blog posts:', error);
    return { posts: [], existingBlob: null };
  }
}

// Save blog posts to Vercel Blob storage
async function saveBlogPosts(posts, existingBlob = null) {
  try {
    // Delete old blob if it exists
    if (existingBlob) {
      console.log('Admin: Deleting old blob:', existingBlob.pathname);
      await del(existingBlob.url);
    }
    
    // Convert posts array to JSON string
    const jsonData = JSON.stringify(posts, null, 2);
    
    // Upload to Blob storage with addRandomSuffix: false
    const blob = await put('blog-posts.json', jsonData, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    
    console.log('Admin: Successfully saved to Blob storage:', blob.pathname);
    return true;
  } catch (error) {
    console.error('Admin: Error saving to Blob storage:', error);
    return false;
  }
}

// Add or update a blog post
async function addBlogPost(post) {
  try {
    const { posts, existingBlob } = await loadBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      // Update existing post
      posts[existingIndex] = post;
      console.log('Admin: Updated existing post:', post.id);
    } else {
      // Add new post at the beginning
      posts.unshift(post);
      console.log('Admin: Added new post:', post.id);
    }
    
    // Save back to Blob storage
    return await saveBlogPosts(posts, existingBlob);
  } catch (error) {
    console.error('Admin: Error adding blog post:', error);
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
      const { posts } = await loadBlogPosts();
      res.json({ ok: true, posts });
    } catch (error) {
      console.error('Admin: Error fetching admin posts:', error);
      res.status(500).json({ ok: false, error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const newPost = req.body;
      if (!newPost.id || !newPost.title) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }
      
      console.log('Admin: Saving blog post:', newPost.title, 'Published:', newPost.published);
      const success = await addBlogPost(newPost);
      
      if (success) {
        res.json({ ok: true, post: newPost });
      } else {
        console.error('Admin: Failed to add blog post');
        res.status(500).json({ ok: false, error: 'Failed to save post' });
      }
    } catch (error) {
      console.error('Admin: Error saving post:', error);
      res.status(500).json({ ok: false, error: 'Failed to save post', details: error.message });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
