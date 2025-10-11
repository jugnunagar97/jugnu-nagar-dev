import { put, list } from '@vercel/blob';

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
      console.log('No blog posts file found, starting fresh');
      return [];
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Save blog posts to Vercel Blob storage
async function saveBlogPosts(posts) {
  try {
    // Convert posts array to JSON string
    const jsonData = JSON.stringify(posts, null, 2);
    
    // Upload to Blob storage
    const blob = await put('blog-posts.json', jsonData, {
      access: 'public',
      contentType: 'application/json',
    });
    
    console.log('Successfully saved to Blob storage:', blob.url);
    return true;
  } catch (error) {
    console.error('Error saving to Blob storage:', error);
    return false;
  }
}

// Add or update a blog post
async function addBlogPost(post) {
  try {
    const posts = await loadBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      // Update existing post
      posts[existingIndex] = post;
      console.log('Updated existing post:', post.id);
    } else {
      // Add new post at the beginning
      posts.unshift(post);
      console.log('Added new post:', post.id);
    }
    
    // Save back to Blob storage
    return await saveBlogPosts(posts);
  } catch (error) {
    console.error('Error adding blog post:', error);
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
      
      console.log('Saving blog post:', newPost);
      const success = await addBlogPost(newPost);
      
      if (success) {
        res.json({ ok: true, post: newPost });
      } else {
        console.error('Failed to add blog post');
        res.status(500).json({ ok: false, error: 'Failed to save post' });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ ok: false, error: 'Failed to save post', details: error.message });
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
}
