import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type SitemapData = {
  staticPages: Array<{
    url: string;
    title: string;
    description: string;
    priority: string;
    changefreq: string;
  }>;
  blogPosts: Array<{
    url: string;
    title: string;
    date: string;
    excerpt?: string;
  }>;
};

const SitemapPage: React.FC = () => {
  const [sitemapData, setSitemapData] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSitemapData = async () => {
      try {
        // Fetch blog posts
        const postsResponse = await fetch('/api/posts');
        const postsData = await postsResponse.json();
        
        const blogPosts = postsData.posts?.map((post: any) => ({
          url: `/blog/${post.slug || post.id}`,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt
        })) || [];

        // Static pages data
        const staticPages = [
          {
            url: '/',
            title: 'Home',
            description: 'Full Stack Developer Portfolio - Clean, fast, and scalable web applications',
            priority: '1.0',
            changefreq: 'weekly'
          },
          {
            url: '/blog',
            title: 'Blog',
            description: 'Latest articles on web development, programming, and technology',
            priority: '0.9',
            changefreq: 'weekly'
          },
          {
            url: '/services',
            title: 'Services',
            description: 'Professional web development services and solutions',
            priority: '0.8',
            changefreq: 'monthly'
          },
          {
            url: '/about',
            title: 'About',
            description: 'Learn more about Jugnu Nagar and his expertise',
            priority: '0.7',
            changefreq: 'monthly'
          },
          {
            url: '/contact',
            title: 'Contact',
            description: 'Get in touch for your next project',
            priority: '0.7',
            changefreq: 'monthly'
          },
          {
            url: '/projects',
            title: 'Projects',
            description: 'Portfolio of completed web development projects',
            priority: '0.8',
            changefreq: 'monthly'
          },
          {
            url: '/node-developer',
            title: 'Node.js Developer',
            description: 'Specialized Node.js development services',
            priority: '0.6',
            changefreq: 'monthly'
          }
        ];

        setSitemapData({ staticPages, blogPosts });
      } catch (error) {
        console.error('Error loading sitemap data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSitemapData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through all pages and content on this website. Find what you're looking for quickly and easily.
          </p>
        </div>

        {/* Static Pages Section */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
            </div>
            Main Pages
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sitemapData?.staticPages.map((page, index) => (
              <Link
                key={index}
                to={page.url}
                className="group p-6 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-brand-blue/20 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">
                    {page.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-200 rounded-full">
                      {page.priority}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {page.changefreq}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{page.description}</p>
                <div className="flex items-center text-sm text-brand-blue group-hover:text-blue-700 transition-colors">
                  <span>Visit page</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Posts Section */}
        {sitemapData?.blogPosts && sitemapData.blogPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-8 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Blog Articles
              <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {sitemapData.blogPosts.length} articles
              </span>
            </h2>
            
            <div className="space-y-4">
              {sitemapData.blogPosts.map((post, index) => (
                <Link
                  key={index}
                  to={post.url}
                  className="group block p-6 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors flex-1 mr-4">
                      {post.title}
                    </h3>
                    <time className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center text-sm text-green-600 group-hover:text-green-700 transition-colors">
                    <span>Read article</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Technical Info Section */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h3 className="font-heading text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-6 h-6 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            Technical Information
          </h3>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">XML Sitemap</h4>
              <p className="text-sm text-gray-600 mb-3">Machine-readable sitemap for search engines</p>
              <a 
                href="/api/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-brand-blue hover:text-blue-700 transition-colors"
              >
                View XML Sitemap →
              </a>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Sitemap Index</h4>
              <p className="text-sm text-gray-600 mb-3">Index of all sitemaps</p>
              <a 
                href="/api/sitemap-index.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-brand-blue hover:text-blue-700 transition-colors"
              >
                View Sitemap Index →
              </a>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Robots.txt</h4>
              <p className="text-sm text-gray-600 mb-3">Instructions for web crawlers</p>
              <a 
                href="/robots.txt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-brand-blue hover:text-blue-700 transition-colors"
              >
                View Robots.txt →
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SitemapPage;
