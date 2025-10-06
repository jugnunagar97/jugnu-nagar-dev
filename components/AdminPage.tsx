import React, { useEffect, useMemo, useState } from 'react';

type StoredPost = {
  id: string;
  title: string;
  slug?: string;
  tags: string[];
  cover?: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  readMinutes: number;
  published: boolean;
};

const STORAGE_KEY = 'jn_blog_posts_v1';
const ADMIN_TOKEN_KEY = 'jn_admin_token_v1';

async function fetchPosts(): Promise<StoredPost[]> {
  try {
    const response = await fetch('/api/admin/posts');
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

async function savePost(post: StoredPost): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      console.error('Failed to save post:', response.statusText);
      return false;
    }
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error saving post:', error);
    return false;
  }
}

async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      console.error('Failed to delete post:', response.statusText);
      return false;
    }
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

const LoginGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [secret, setSecret] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Very simple local gate; choose a strong secret below
    const expected = (import.meta as any).env?.VITE_ADMIN_SECRET || 'change-this-secret';
    if (secret === expected) {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, 'ok');
      onUnlock();
    } else {
      alert('Access denied');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-soft ring-1 ring-gray-100 w-full max-w-sm">
        <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Admin Access</h1>
        <p className="text-sm text-gray-600 mb-4">Enter your admin secret to continue.</p>
        <input value={secret} onChange={e=>setSecret(e.target.value)} type="password" className="w-full border rounded-md p-3 focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="Admin secret" />
        <button type="submit" className="mt-4 w-full bg-brand-blue text-white rounded-md py-3 font-semibold hover:bg-brand-blue-dark">Unlock</button>
      </form>
    </div>
  );
};

const RichTextEditor: React.FC<{ value: string; onChange: (html: string)=>void }> = ({ value, onChange }) => {
  const [html, setHtml] = useState(value);
  useEffect(()=>setHtml(value), [value]);

  const exec = (cmd: string, value?: string) => document.execCommand(cmd, false, value);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b">
        <button type="button" onClick={()=>exec('bold')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Bold</button>
        <button type="button" onClick={()=>exec('italic')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Italic</button>
        <button type="button" onClick={()=>exec('underline')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Underline</button>
        <span className="mx-1 w-px bg-gray-300" />
        <button type="button" onClick={()=>exec('formatBlock', '<h2>')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">H2</button>
        <button type="button" onClick={()=>exec('formatBlock', '<h3>')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">H3</button>
        <button type="button" onClick={()=>exec('formatBlock', '<blockquote>')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Quote</button>
        <span className="mx-1 w-px bg-gray-300" />
        <button type="button" onClick={()=>exec('insertUnorderedList')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Bullets</button>
        <button type="button" onClick={()=>exec('insertOrderedList')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Numbers</button>
        <button type="button" onClick={()=>{ const url = prompt('Link URL'); if (url) { exec('createLink', url); } }} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Link</button>
        <button type="button" onClick={()=>exec('removeFormat')} className="px-2 py-1 text-sm rounded hover:bg-gray-200">Clear</button>
      </div>
      <div
        className="min-h-[200px] p-4 outline-none"
        contentEditable
        onInput={(e)=>onChange((e.target as HTMLElement).innerHTML)}
        dangerouslySetInnerHTML={{__html: html}}
      />
    </div>
  );
};

const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState<boolean>(false);
  const [posts, setPosts] = useState<StoredPost[]>([]);
  const [draft, setDraft] = useState<StoredPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setAuthed(sessionStorage.getItem(ADMIN_TOKEN_KEY) === 'ok'); }, []);
  
  useEffect(() => {
    const loadPosts = async () => {
      if (authed) {
        setLoading(true);
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      }
    };
    loadPosts();
  }, [authed]);

  if (!authed) return <LoginGate onUnlock={()=>setAuthed(true)} />;

  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');
  const startNew = () => setDraft({ id: crypto.randomUUID(), title: '', slug: '', tags: [], cover: '', excerpt: '', contentHtml: '', date: new Date().toISOString(), readMinutes: 5, published: false });
  const editPost = (p: StoredPost) => setDraft({ ...p });
  
  const removePost = async (id: string) => {
    const success = await deletePost(id);
    if (success) {
      setPosts(ps => ps.filter(p => p.id !== id));
    } else {
      alert('Failed to delete post. Please try again.');
    }
  };
  
  const saveDraft = async () => {
    if (!draft) return;
    const success = await savePost(draft);
    if (success) {
      setPosts(ps => { const i = ps.findIndex(p=>p.id===draft.id); if (i>=0) { const copy=[...ps]; copy[i]=draft; return copy; } return [draft, ...ps]; });
      setDraft(null);
    } else {
      alert('Failed to save post. Please try again.');
    }
  };
  
  const publish = async (id: string, published: boolean) => {
    console.log(`Publishing post ${id} as ${published ? 'published' : 'draft'}`);
    const post = posts.find(p => p.id === id);
    if (post) {
      const updatedPost = { ...post, published };
      const success = await savePost(updatedPost);
      if (success) {
        setPosts(ps => ps.map(p => p.id===id? updatedPost: p));
      } else {
        alert('Failed to update post status. Please try again.');
      }
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-semibold text-gray-900">Admin Panel</h1>
          <div className="flex gap-2">
            <button onClick={startNew} className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold">New Post</button>
            <button onClick={()=>{ sessionStorage.removeItem(ADMIN_TOKEN_KEY); setAuthed(false); }} className="px-4 py-2 rounded-md border text-sm">Logout</button>
          </div>
        </div>

        {draft && (
          <div className="bg-white ring-1 ring-gray-100 rounded-xl shadow-soft p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={draft.title} onChange={e=>{ const title=e.target.value; const auto = draft.slug ? draft.slug : toSlug(title); setDraft({ ...draft, title, slug: auto }); }} placeholder="Title" className="border rounded-md p-3 w-full" />
              <input value={draft.slug||''} onChange={e=>setDraft({ ...draft, slug: toSlug(e.target.value) })} placeholder="Slug (optional) e.g. designing-fast-web-apps" className="border rounded-md p-3 w-full" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Featured image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e)=>{
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const res = await fetch('/api/upload', { method: 'POST', body: f });
                    if (res.ok) {
                      const data = await res.json();
                      setDraft({ ...draft, cover: data.url });
                    }
                  }}
                  className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:text-gray-700 hover:file:bg-gray-50"
                />
              </div>
              <input value={draft.tags.join(', ')} onChange={e=>setDraft({ ...draft, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean) })} placeholder="Tags (comma separated)" className="border rounded-md p-3 w-full" />
              <input value={draft.readMinutes} onChange={e=>setDraft({ ...draft, readMinutes: Number(e.target.value||5) })} placeholder="Read minutes" className="border rounded-md p-3 w-full" />
            </div>
            {draft.cover && (
              <div className="mt-2">
                <img src={draft.cover} alt="Cover preview" className="max-h-40 rounded-md ring-1 ring-gray-200" />
              </div>
            )}
            <textarea value={draft.excerpt} onChange={e=>setDraft({ ...draft, excerpt: e.target.value })} placeholder="Excerpt" className="border rounded-md p-3 w-full mt-4" />
            <div className="mt-4">
              <RichTextEditor value={draft.contentHtml} onChange={(html)=>setDraft({ ...draft, contentHtml: html })} />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={saveDraft} className="px-4 py-2 rounded-md bg-brand-blue text-white text-sm font-semibold">Save</button>
              <button onClick={()=>setDraft(null)} className="px-4 py-2 rounded-md border text-sm">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">
            <p>Loading posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map(p => (
            <div key={p.id} className="bg-white ring-1 ring-gray-100 rounded-xl shadow-soft p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-gray-900">{p.title || 'Untitled'}</h3>
                  <p className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()} • {p.readMinutes} min • {p.published ? 'Published' : 'Draft'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>editPost(p)} className="px-3 py-1.5 rounded-md border text-sm">Edit</button>
                  <button onClick={()=>publish(p.id, !p.published)} className={`px-3 py-1.5 rounded-md text-sm ${p.published ? 'bg-yellow-100 text-yellow-800' : 'bg-green-600 text-white'}`}>{p.published ? 'Unpublish' : 'Publish'}</button>
                  <button onClick={()=>removePost(p.id)} className="px-3 py-1.5 rounded-md border text-sm">Delete</button>
                </div>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{p.excerpt}</p>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPage;


