import React, { useEffect, useState } from 'react';
import profileImg from './jugnu-nagar.jpg';
import { useParams, Link } from 'react-router-dom';

type StoredPost = {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  cover?: string;
  contentHtml: string;
  date: string;
  tags?: string[];
  readMinutes?: number;
  published?: boolean;
};

// Function to generate Article schema markup
function generateArticleSchema(post: StoredPost): object {
  const baseUrl = 'https://jugnunagar.dev';
  const postUrl = `${baseUrl}/blog/${post.slug || post.id}`;
  
  // Strip HTML tags from content for description
  const stripHtml = (html: string): string => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || stripHtml(post.contentHtml).substring(0, 160),
    "image": post.cover ? {
      "@type": "ImageObject",
      "url": post.cover.startsWith('http') ? post.cover : `${baseUrl}${post.cover}`,
      "width": 800,
      "height": 450
    } : undefined,
    "author": {
      "@type": "Person",
      "name": "Jugnu Nagar",
      "jobTitle": "Full Stack Developer",
      "email": "mailto:dev.nagarjugnu@gmail.com",
      "url": baseUrl,
      "sameAs": [
        "https://x.com/serp_guy",
        "https://in.linkedin.com/in/jugnu-nagar"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Jugnu Nagar",
      "url": baseUrl
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "articleSection": "Technology",
    "keywords": post.tags?.join(', ') || "web development, programming, technology",
    "wordCount": post.contentHtml ? stripHtml(post.contentHtml).split(' ').length : undefined,
    "timeRequired": post.readMinutes ? `PT${post.readMinutes}M` : undefined,
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

// Custom hook to manage document head
function useDocumentHead(post: StoredPost | null) {
  useEffect(() => {
    if (!post) return;

    // Update page title
    document.title = `${post.title} | Jugnu Nagar`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.excerpt || "Read this article by Jugnu Nagar");
    }

    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', post.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', post.excerpt || "Read this article by Jugnu Nagar");
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'article');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://jugnunagar.dev/blog/${post.slug || post.id}`);
    }

    // Add or update article schema
    let schemaScript = document.querySelector('script[type="application/ld+json"][data-article-schema]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('data-article-schema', 'true');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(generateArticleSchema(post));

    // Cleanup function
    return () => {
      // Reset title
      document.title = "Jugnu Nagar — Full Stack Developer";
      
      // Reset meta description
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Jugnu Nagar — Full Stack Developer building clean, fast, and scalable web applications. Portfolio, services, work, and contact.');
      }

      // Reset Open Graph tags
      if (ogTitle) {
        ogTitle.setAttribute('content', 'Jugnu Nagar — Full Stack Developer');
      }
      if (ogDescription) {
        ogDescription.setAttribute('content', 'Clean, fast, and scalable web apps. View services, projects, and get in touch.');
      }
      if (ogType) {
        ogType.setAttribute('content', 'website');
      }
      if (ogUrl) {
        ogUrl.setAttribute('content', 'https://jugnunagar.dev/');
      }

      // Remove article schema
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [post]);
}

async function fetchPostBySlug(slug: string | undefined): Promise<StoredPost | null> {
  if (!slug) return null;
  try {
    console.log('Fetching post with slug:', slug);
    
    // Fetch ALL posts from admin API (which we know works)
    const response = await fetch('/api/admin/posts');
    
    if (!response.ok) {
      console.error('Failed to fetch posts:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    if (!data.ok) {
      console.error('API error:', data.error);
      return null;
    }
    
    // Find the post by slug on the client side
    const posts = data.posts || [];
    console.log('All posts:', posts.map((p: StoredPost) => ({ id: p.id, slug: p.slug, published: p.published })));
    
    const post = posts.find((p: StoredPost) => {
      const matches = (p.slug === slug || p.id === slug);
      console.log(`Checking post: slug="${p.slug}", id="${p.id}", matches=${matches}, published=${p.published}`);
      return matches && p.published === true;
    });
    
    console.log('Found post:', post ? post.title : 'not found');
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<StoredPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the custom hook to manage document head
  useDocumentHead(post);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const fetchedPost = await fetchPostBySlug(slug);
      setPost(fetchedPost);
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900">Loading...</h1>
          <p className="mt-3 text-gray-600">Please wait while we fetch the article.</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900">Post not found</h1>
          <p className="mt-3 text-gray-600">The article you're looking for doesn't exist or isn't published yet.</p>
          <Link to="/blog" className="inline-block mt-8 bg-brand-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="py-24 sm:py-32 bg-white font-nunito">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="mb-6 text-sm text-gray-500">
          <Link to="/blog" className="hover:underline">← All articles</Link>
        </div>
        <h1 className="font-heading text-4xl font-medium text-gray-900 leading-snug">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3">
          <img src={profileImg} alt="Jugnu Nagar" width="32" height="32" className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200" />
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-800">Jugnu Nagar</div>
            <div className="flex items-center gap-2">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              {post.readMinutes ? (<><span className="w-1 h-1 rounded-full bg-gray-300" /><span>{post.readMinutes} min read</span></>) : null}
            </div>
          </div>
        </div>
        {post.cover && (
          <img src={post.cover} alt={post.title} loading="lazy" className="mt-6 rounded-xl ring-1 ring-gray-100 w-full object-cover" />
        )}
        {post.excerpt && (
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">{post.excerpt}</p>
        )}
        <div className="prose prose-lg max-w-none mt-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </article>
  );
};

export default BlogPostPage;
