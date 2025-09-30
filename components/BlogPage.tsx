import React, { useMemo, useState } from 'react';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  tags: string[];
  readMinutes: number;
  slug?: string;
};

function getStored(): Post[] {
  try {
    const raw = localStorage.getItem('jn_blog_posts_v1');
    if (!raw) return [];
    const parsed = JSON.parse(raw) as any[];
    const toSlug = (s: string) => s?.toLowerCase()?.replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');
    return parsed
      .filter(p => p.published)
      .map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        cover: p.cover || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
        date: p.date,
        tags: p.tags || [],
        readMinutes: p.readMinutes || 5,
        slug: p.slug || toSlug(p.title || String(p.id)),
      }));
  } catch { return []; }
}

const TagChip: React.FC<{ active?: boolean; onClick?: () => void }> = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded-full text-sm transition-colors ${active ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{children}</button>
);

const BlogCard: React.FC<{ post: Post }> = ({ post }) => (
  <article className="group rounded-2xl bg-white ring-1 ring-gray-100 shadow-soft overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
    <div className="relative overflow-hidden">
      <img
        src={post.cover}
        alt={post.title}
        loading="lazy"
        className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        {post.tags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="bg-white/95 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-gray-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
    <a href={`/${post.slug || post.id}`} className="p-6 flex-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded">
      <h3 className="font-heading text-2xl font-medium text-gray-900 leading-snug">
        {post.title}
      </h3>
      <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>{post.readMinutes} min read</span>
      </div>
      <p className="mt-3 text-gray-700 leading-relaxed flex-1">{post.excerpt}</p>
      <div className="mt-5 pt-4 border-t border-gray-100 text-brand-blue text-sm font-semibold">
        Read more →
      </div>
    </a>
  </article>
);

const BlogPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const posts = useMemo(() => getStored(), []);
  const allTags = useMemo(() => Array.from(new Set(posts.flatMap(p => p.tags))), [posts]);

  const filtered = posts.filter(p =>
    (activeTag === 'All' || p.tags.includes(activeTag)) &&
    (p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
  );

  const paginated = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
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

        {paginated.length > 0 ? (
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


