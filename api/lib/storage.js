// Simple in-memory storage with persistence for serverless functions
// This works better than file system operations in Vercel

let blogPosts = [];
let isInitialized = false;

// Initialize storage from existing data
async function initializeStorage() {
  if (isInitialized) return;
  
  try {
    // Try to load from existing file if it exists
    const fs = await import('fs');
    const path = await import('path');
    
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

export async function loadBlogPosts() {
  await initializeStorage();
  return [...blogPosts]; // Return a copy
}

export async function saveBlogPosts(posts) {
  try {
    await initializeStorage();
    blogPosts = [...posts]; // Store a copy
    
    // Try to persist to file system (may not work in serverless)
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
      const dataDir = path.dirname(BLOG_POSTS_FILE);
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
      console.log('Successfully persisted to file system');
    } catch (fileError) {
      console.log('File system persistence failed, using in-memory storage:', fileError.message);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
}

export async function addBlogPost(post) {
  await initializeStorage();
  const existingIndex = blogPosts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    blogPosts[existingIndex] = post;
  } else {
    blogPosts.unshift(post);
  }
  
  return await saveBlogPosts(blogPosts);
}

export async function deleteBlogPost(id) {
  await initializeStorage();
  blogPosts = blogPosts.filter(p => p.id !== id);
  return await saveBlogPosts(blogPosts);
}
