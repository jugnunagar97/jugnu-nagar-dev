export default async function handler(req, res) {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
    
    res.json({
      ok: true,
      cwd: process.cwd(),
      filePath: BLOG_POSTS_FILE,
      fileExists: fs.existsSync(BLOG_POSTS_FILE),
      dataDirExists: fs.existsSync(path.dirname(BLOG_POSTS_FILE)),
      fileContent: fs.existsSync(BLOG_POSTS_FILE) ? fs.readFileSync(BLOG_POSTS_FILE, 'utf8') : 'File does not exist'
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
