import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

export default async function handler(req, res) {
  try {
    // Check if data directory exists
    const dataDir = path.dirname(BLOG_POSTS_FILE);
    const dataDirExists = fs.existsSync(dataDir);
    
    // Check if blog posts file exists
    const fileExists = fs.existsSync(BLOG_POSTS_FILE);
    
    // Try to read the file
    let fileContent = null;
    try {
      if (fileExists) {
        fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
      }
    } catch (error) {
      fileContent = `Error reading file: ${error.message}`;
    }
    
    // Try to write a test file
    let writeTest = false;
    try {
      const testFile = path.join(dataDir, 'test.txt');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      writeTest = true;
    } catch (error) {
      writeTest = false;
    }
    
    res.json({
      ok: true,
      dataDir,
      dataDirExists,
      fileExists,
      fileContent,
      writeTest,
      cwd: process.cwd()
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
