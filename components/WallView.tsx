import React, { useEffect, useState } from 'react';
import { listPosts, createPost, updatePost, deletePost, WALL_MAX_CHARS } from '../wallService';
import type { WallPost } from '../wallService';
import { formatRelativeTime } from '../utils';

const PROMPTS = [
  '¿Cómo te llamas y desde dónde te conectas?',
  '¿Qué estudias o en qué trabajas?',
  '¿Qué te gustaría aprender en este curso?',
  'Un dato curioso sobre ti, o un tema de ciberseguridad que te apasione.',
];

const AVATAR_COLORS = ['bg-violet-600', 'bg-sky-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600', 'bg-teal-600'];
const avatarColor = (id: string) => AVATAR_COLORS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length];
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]!.toUpperCase()).join('');

const textareaCls = 'w-full bg-slate-900/80 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none resize-y';

/** Muro de presentaciones del curso. */
const WallView: React.FC<{ pathId: string; courseTitle: string; userId: string; isAdmin: boolean; onClose: () => void }> = ({
  pathId, courseTitle, userId, isAdmin, onClose,
}) => {
  const [posts, setPosts] = useState<WallPost[] | null>(null);
  const [draft, setDraft] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    let cancelled = false;
    listPosts(pathId).then(p => { if (!cancelled) setPosts(p); });
    return () => { cancelled = true; };
  }, [pathId]);

  const alreadyPosted = !!posts?.some(p => p.userId === userId);

  const publish = async () => {
    setError('');
    if (!draft.trim()) return;
    setPosting(true);
    try {
      const p = await createPost(pathId, draft);
      setPosts(prev => [p, ...(prev ?? [])]);
      setDraft('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPosting(false);
    }
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    try {
      const p = await updatePost(id, editText);
      setPosts(prev => (prev ?? []).map(x => (x.id === id ? p : x)));
      setEditingId(null);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const remove = async (p: WallPost) => {
    const own = p.userId === userId;
    if (!confirm(own ? '¿Eliminar tu publicación?' : `¿Eliminar la publicación de ${p.authorName}? (moderación)`)) return;
    try {
      await deletePost(p.id);
      setPosts(prev => (prev ?? []).filter(x => x.id !== p.id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 overflow-y-auto p-3 md:p-6" onClick={onClose}>
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 md:p-7 text-white" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start gap-4 mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-1">💬 Muro del curso</p>
            <h2 className="text-xl md:text-2xl font-bold">Preséntate a tus compañeros</h2>
            <p className="text-sm text-slate-400 mt-1">{courseTitle.replace(/^Ruta:\s*/, '')} · {posts ? `${posts.length} ${posts.length === 1 ? 'publicación' : 'publicaciones'}` : 'cargando…'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl" aria-label="Cerrar muro">✕</button>
        </div>

        {/* Publicar */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-6">
          {alreadyPosted ? (
            <p className="text-sm text-slate-300 mb-3">✅ Ya te presentaste. Puedes publicar algo más o editar tu presentación abajo.</p>
          ) : (
            <div className="mb-3">
              <p className="text-sm text-slate-200 font-semibold mb-1">Ideas para tu presentación:</p>
              <ul className="text-sm text-slate-400 list-disc pl-5 space-y-0.5">
                {PROMPTS.map(q => <li key={q}>{q}</li>)}
              </ul>
            </div>
          )}
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value.slice(0, WALL_MAX_CHARS))}
            rows={4}
            placeholder="¡Hola a todos! Soy…"
            className={textareaCls}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <p className="text-xs text-slate-500">
              Lo verán tus compañeros y docentes de este curso, con tu nombre (no tu correo). No compartas datos sensibles como tu teléfono o documento.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{draft.length}/{WALL_MAX_CHARS}</span>
              <button
                onClick={publish}
                disabled={posting || !draft.trim()}
                className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold rounded-xl px-5 py-2 text-sm"
              >
                {posting ? 'Publicando…' : 'Publicar'}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-rose-300 mt-2">{error}</p>}
        </div>

        {/* Publicaciones */}
        {posts === null ? (
          <p className="text-slate-400 text-sm">Cargando…</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-400 text-sm bg-slate-800/50 rounded-xl p-6 text-center">Todavía nadie se ha presentado. ¡Sé el primero! 👋</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {posts.map(p => {
              const own = p.userId === userId;
              return (
                <li key={p.id} className={`rounded-2xl p-4 border ${own ? 'bg-sky-500/10 border-sky-500/30' : 'bg-slate-800/60 border-slate-700'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-full ${avatarColor(p.userId)} flex items-center justify-center text-sm font-bold shrink-0`}>{initials(p.authorName)}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{p.authorName}{own && <span className="text-sky-300 font-normal"> (tú)</span>}</p>
                      <p className="text-xs text-slate-500">{formatRelativeTime(p.createdAt)}{p.updatedAt ? ' · editado' : ''}</p>
                    </div>
                  </div>
                  {editingId === p.id ? (
                    <>
                      <textarea value={editText} onChange={e => setEditText(e.target.value.slice(0, WALL_MAX_CHARS))} rows={4} className={textareaCls} />
                      <div className="flex gap-3 mt-2 text-sm">
                        <button onClick={() => saveEdit(p.id)} className="text-sky-300 hover:underline">Guardar</button>
                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:underline">Cancelar</button>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-slate-200 whitespace-pre-line break-words">{p.body}</p>
                  )}
                  {(own || isAdmin) && editingId !== p.id && (
                    <div className="flex gap-3 mt-3 text-xs">
                      {own && <button onClick={() => { setEditingId(p.id); setEditText(p.body); }} className="text-slate-400 hover:text-white">Editar</button>}
                      <button onClick={() => remove(p)} className="text-rose-300/80 hover:text-rose-300">{own ? 'Eliminar' : 'Eliminar (moderación)'}</button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WallView;
