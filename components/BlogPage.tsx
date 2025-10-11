import React, { useEffect, useMemo, useState } from 'react';

type Post = {
  id: string;
  title: string;
  excerpt?: string;
  contentHtml?: string;
  cover: string;
  date: string;
  tags: string[];
  readMinutes?: number;
  slug?: string;
};

// Function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// Function to generate excerpt from content
function generateExcerpt(post: Post): string {
  // If excerpt exists, use it
  if (post.excerpt && post.excerpt.trim()) {
    return post.excerpt;
  }
  
  // Otherwise, extract from contentHtml
  if (post.contentHtml) {
    const plainText = stripHtml(post.contentHtml);
    // Get first 150-160 characters and end at the last complete word
    const excerpt = plainText.substring(0, 160);
    const lastSpace = excerpt.lastIndexOf(' ');
    return lastSpace > 100 ? excerpt.substring(0, lastSpace) + '...' : excerpt + '...';
  }
  
  // Fallback to title if no content
  return post.title;
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      console.error('Failed to fetch posts:', response.statusText);
      return [];
    }
    const data = await response.json();
    if (!data.ok) {
      console.error('API error:', data.error);
      return [];
    }
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

const TagChip: React.FC<{ active?: boolean; onClick?: () => void }> = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded-full text-sm transition-colors ${active ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{children}</button>
);

const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
  const excerpt = generateExcerpt(post);
  
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-gray-100 shadow-soft overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden">
        <img
          src={post.cover || 'https://via.placeholder.com/800x450'}
          alt={post.title}
          loading="lazy"
          className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {post.tags?.slice(0, 2).map((t) => (
            <span
              key={t}
              className="bg-white/95 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-gray-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <a href={`/blog/${post.slug || post.id}`} className="p-6 flex-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded">
        <h3 className="font-heading text-2xl font-medium text-gray-900 leading-snug">
          {post.title}
        </h3>
        <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          {post.readMinutes && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{post.readMinutes} min read</span>
            </>
          )}
        </div>
        <p className="mt-3 text-gray-700 leading-relaxed flex-1">{excerpt}</p>
        <div className="mt-5 pt-4 border-t border-gray-100 text-brand-blue text-sm font-semibold">
          Read more →
        </div>
      </a>
    </article>
  );
};

const BlogPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const fetchedPosts = await fetchPosts();
      console.log('Blog posts loaded:', fetchedPosts);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);
  
  const allTags = useMemo(() => {
    const tags = posts.flatMap(p => p.tags || []);
    return Array.from(new Set(tags));
  }, [posts]);

  const filtered = posts.filter(p => {
    const excerpt = generateExcerpt(p);
    return (
      (activeTag === 'All' || (p.tags && p.tags.includes(activeTag))) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) || 
       excerpt.toLowerCase().includes(query.toLowerCase()))
    );
  });

  const paginated = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <section className="py-24 sm:py-32 bg-gray-50 font-nunito">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-heading text-xs tracking-[0.25em] text-brand-700 uppercase">Articles</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900">Blog</h1>
          <p className="mt-3 text-gray-600">Insights on web development, UX, performance, and shipping products.</p>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-6 rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            <TagChip active={activeTag==='All'} onClick={() => { setActiveTag('All'); setPage(1); }}>All</TagChip>
            {allTags.map(t => (
              <TagChip key={t} active={activeTag===t} onClick={() => { setActiveTag(t); setPage(1); }}>{t}</TagChip>
            ))}
          </div>
          <div className="relative">
            <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search articles..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 text-center text-gray-500">
            <p>Loading articles...</p>
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginated.map(p => <BlogCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500">
            <p>No posts published yet.</p>
            <p className="text-sm mt-2">Publish your first article from the admin panel.</p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-40" disabled={page===1}>Prev</button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-40" disabled={page===totalPages}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
