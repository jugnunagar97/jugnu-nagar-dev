import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Blog posts storage
const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
const dataDir = path.dirname(BLOG_POSTS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper functions for blog posts
function loadBlogPosts() {
  try {
    if (!fs.existsSync(BLOG_POSTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

function saveBlogPosts(posts) {
  try {
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
}

// Load env
const PORT = process.env.PORT || 5174;
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const TO_EMAIL = process.env.TO_EMAIL || 'dev.nagarjugnu@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

function ownerHtml({ fullName, reply_to, message }) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:24px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto;background:#ffffff;border-radius:12px;border:1px solid #eef0f4;overflow:hidden">
      <tr>
        <td style="padding:20px 24px;border-bottom:1px solid #eef0f4">
          <h1 style="margin:0;font-size:18px;color:#0f172a">New inquiry</h1>
          <p style="margin:4px 0 0;font-size:12px;color:#64748b">From your website contact form</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px">
          <p style="margin:0 0 12px"><strong style="color:#0f172a">Name:</strong> ${fullName}</p>
          <p style="margin:0 0 12px"><strong style="color:#0f172a">Email:</strong> <a href="mailto:${reply_to}" style="color:#2563eb;text-decoration:none">${reply_to}</a></p>
          <div style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #eef0f4;border-radius:10px;color:#0f172a;line-height:1.6">${String(message || '').replace(/\n/g,'<br/>')}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #eef0f4;color:#94a3b8;font-size:12px">© ${new Date().getFullYear()} Jugnu Nagar</td>
      </tr>
    </table>
  </div>`;
}

function userHtml({ fullName }) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:24px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto;background:#ffffff;border-radius:12px;border:1px solid #eef0f4;overflow:hidden">
      <tr>
        <td style="padding:24px;text-align:center">
          <h1 style="margin:0 0 6px;font-size:18px;color:#0f172a">Thanks, ${fullName}.</h1>
          <p style="margin:0;color:#64748b;font-size:14px">I received your message and will reply shortly.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 20px">
          <div style="margin-top:10px;padding:14px 16px;background:#f8fafc;border:1px solid #eef0f4;border-radius:10px;color:#0f172a;font-size:14px">
            In the meantime, feel free to reply to this email with any extra details.
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #eef0f4;color:#94a3b8;font-size:12px">© ${new Date().getFullYear()} Jugnu Nagar</td>
      </tr>
    </table>
  </div>`;
}

app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, reply_to, message } = req.body || {};
    if (!fullName || !reply_to || !message) {
      return res.status(400).json({ ok: false, error: 'Missing fields' });
    }
    if (!SMTP_HOST || !FROM_EMAIL) {
      return res.status(500).json({ ok: false, error: 'Mailer not configured' });
    }

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New inquiry from ${fullName}`,
      replyTo: reply_to,
      text: message,
      html: ownerHtml({ fullName, reply_to, message }),
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: reply_to,
      subject: 'Thanks for reaching out — Jugnu Nagar',
      text: `Hi ${fullName},\n\nThanks for reaching out. I received your message and will reply shortly.\n\n— Jugnu Nagar`,
      html: userHtml({ fullName }),
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Email failed' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const filename = `covers/${Date.now()}.jpg`;
      const { url } = await put(filename, buffer, { access: 'public' });
      res.json({ ok: true, url });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Upload failed' });
  }
});

// Blog posts API endpoints
app.get('/api/posts', (req, res) => {
  try {
    const posts = loadBlogPosts();
    // Only return published posts for public API
    const publishedPosts = posts.filter(post => post.published);
    res.json({ ok: true, posts: publishedPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ ok: false, error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const posts = loadBlogPosts();
    const post = posts.find(p => p.slug === slug || p.id === slug);
    
    if (!post || !post.published) {
      return res.status(404).json({ ok: false, error: 'Post not found' });
    }
    
    res.json({ ok: true, post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ ok: false, error: 'Failed to fetch post' });
  }
});

// Admin endpoints (require authentication in production)
app.get('/api/admin/posts', (req, res) => {
  try {
    const posts = loadBlogPosts();
    res.json({ ok: true, posts });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ ok: false, error: 'Failed to fetch posts' });
  }
});

app.post('/api/admin/posts', (req, res) => {
  try {
    const newPost = req.body;
    if (!newPost.id || !newPost.title) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }
    
    const posts = loadBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === newPost.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = newPost;
    } else {
      posts.unshift(newPost);
    }
    
    if (saveBlogPosts(posts)) {
      res.json({ ok: true, post: newPost });
    } else {
      res.status(500).json({ ok: false, error: 'Failed to save post' });
    }
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ ok: false, error: 'Failed to save post' });
  }
});

app.delete('/api/admin/posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const posts = loadBlogPosts();
    const filteredPosts = posts.filter(p => p.id !== id);
    
    if (saveBlogPosts(filteredPosts)) {
      res.json({ ok: true });
    } else {
      res.status(500).json({ ok: false, error: 'Failed to delete post' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ ok: false, error: 'Failed to delete post' });
  }
});

// Dynamic sitemap generation
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://jugnunagar.dev';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Get all published blog posts
    const posts = loadBlogPosts();
    const publishedPosts = posts.filter(post => post.published === true);
    
    // Static pages configuration
    const staticPages = [
      {
        url: '/',
        changefreq: 'weekly',
        priority: '1.0',
        lastmod: currentDate
      },
      {
        url: '/blog',
        changefreq: 'weekly',
        priority: '0.9',
        lastmod: currentDate
      },
      {
        url: '/services',
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: currentDate
      },
      {
        url: '/about',
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: currentDate
      },
      {
        url: '/contact',
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: currentDate
      },
      {
        url: '/projects',
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: currentDate
      },
      {
        url: '/node-developer',
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: currentDate
      }
    ];
    
    // Generate XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    // Add static pages
    staticPages.forEach(page => {
      const lastmod = page.lastmod || currentDate;
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    });
    
    // Add blog posts
    publishedPosts.forEach(post => {
      const postUrl = `/blog/${post.slug || post.id}`;
      const postDate = new Date(post.date).toISOString().split('T')[0];
      
      sitemap += `
  <url>
    <loc>${baseUrl}${postUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${postDate}</lastmod>
  </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    // Set proper headers for XML
    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(sitemap);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to generate sitemap',
      details: error.message 
    });
  }
});

// Generate sitemap index
app.get('/api/sitemap-index.xml', async (req, res) => {
  try {
    const baseUrl = 'https://jugnunagar.dev';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/api/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(sitemapIndex);
    
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to generate sitemap index',
      details: error.message 
    });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Mailer API listening on http://localhost:${PORT}`);
  console.log(`SMTP host: ${SMTP_HOST || '(not set)'} from: ${FROM_EMAIL || '(not set)'}`);
});


