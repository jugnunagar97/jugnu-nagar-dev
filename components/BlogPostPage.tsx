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
