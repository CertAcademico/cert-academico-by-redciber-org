import React, { useEffect, useMemo, useState } from 'react';
import type { LearningPath } from '../types';
import {
  listResources, fileUrl, createResource, deleteResource, youtubeId,
  ACCEPTED_FILES, MAX_FILE_MB,
} from '../libraryService';
import type { CourseResource, ResourceKind } from '../libraryService';

const KINDS: { value: ResourceKind; label: string; icon: string }[] = [
  { value: 'video', label: 'Videos', icon: '🎬' },
  { value: 'document', label: 'Documentos', icon: '📄' },
  { value: 'presentation', label: 'Presentaciones', icon: '📊' },
  { value: 'link', label: 'Herramientas y enlaces', icon: '🔗' },
];
const kindIcon = (k: ResourceKind) => KINDS.find(x => x.value === k)?.icon ?? '📎';

// Sin tildes ni mayúsculas, y "ATT&CK" equivale a "attack" (es como lo escribe la mayoría).
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/att&ck/g, 'attack');

const inputCls = 'w-full bg-slate-900/80 border border-slate-700 focus:border-violet-500 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none';

/** Abre un recurso en otra pestaña. Los archivos privados piden antes un enlace firmado. */
const openResource = async (r: CourseResource) => {
  const w = window.open('', '_blank');
  try {
    const url = r.storagePath ? await fileUrl(r.storagePath) : r.url!;
    if (w) w.location.href = url; else window.location.href = url;
  } catch (err) {
    w?.close();
    alert((err as Error).message);
  }
};

const AddResourceForm: React.FC<{ pathId: string; path: LearningPath; userId: string; onAdded: (r: CourseResource) => void }> = ({ pathId, path, userId, onAdded }) => {
  const [kind, setKind] = useState<ResourceKind>('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [tags, setTags] = useState('');
  const [source, setSource] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const usesFile = kind === 'document' || kind === 'presentation';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Escriba un título.'); return; }
    if (kind === 'video' && !youtubeId(url)) { setError('Pegue un enlace válido de YouTube.'); return; }
    if (kind === 'link' && !/^https?:\/\//.test(url.trim())) { setError('Pegue un enlace que empiece por https://'); return; }
    if (usesFile && !file && !/^https?:\/\//.test(url.trim())) { setError('Suba un archivo o pegue un enlace.'); return; }
    setSaving(true);
    try {
      const r = await createResource({
        pathId, kind, title, description, source,
        moduleId: moduleId || null,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        url: usesFile && file ? null : url,
        file: usesFile ? file : null,
      }, userId);
      onAdded(r);
      setTitle(''); setDescription(''); setTags(''); setSource(''); setUrl(''); setFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-violet-500/30 rounded-2xl p-4 mb-5 grid gap-3">
      <p className="text-sm font-bold text-violet-200">➕ Agregar recurso (solo administradores)</p>
      <div className="grid md:grid-cols-3 gap-3">
        <select value={kind} onChange={e => setKind(e.target.value as ResourceKind)} className={inputCls}>
          {KINDS.map(k => <option key={k.value} value={k.value}>{k.icon} {k.label.replace(/s$/, '').replace(/ y enlaces$/, ' o enlace')}</option>)}
        </select>
        <select value={moduleId} onChange={e => setModuleId(e.target.value)} className={inputCls}>
          <option value="">Todo el curso</option>
          {path.modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
        </select>
        <input value={source} onChange={e => setSource(e.target.value)} placeholder="Fuente: autor, canal o institución" className={inputCls} />
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className={inputCls} required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción corta: para qué sirve" rows={2} className={inputCls} />
      {usesFile ? (
        <div className="grid md:grid-cols-2 gap-3 items-center">
          <input type="file" accept={ACCEPTED_FILES} onChange={e => setFile(e.target.files?.[0] ?? null)} className="text-sm text-slate-300" />
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="…o un enlace externo (https://)" className={inputCls} disabled={!!file} />
          <p className="text-xs text-slate-500 md:col-span-2">PDF, Word, PowerPoint, Excel o imagen, hasta {MAX_FILE_MB} MB. Los archivos quedan privados: solo los ve quien tiene acceso a este curso.</p>
        </div>
      ) : (
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder={kind === 'video' ? 'Enlace de YouTube' : 'https://…'} className={inputCls} />
      )}
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Etiquetas separadas por coma (ej.: ATT&CK, ransomware)" className={inputCls} />
      {error && <p className="text-sm text-rose-300">{error}</p>}
      <button type="submit" disabled={saving} className="justify-self-start bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-lg px-5 py-2 text-sm">
        {saving ? 'Guardando…' : 'Guardar recurso'}
      </button>
    </form>
  );
};

const LibraryView: React.FC<{ pathId: string; path: LearningPath; isAdmin: boolean; userId: string; onClose: () => void }> = ({ pathId, path, isAdmin, userId, onClose }) => {
  const [items, setItems] = useState<CourseResource[] | null>(null);
  const [kind, setKind] = useState<ResourceKind | 'all'>('all');
  const [moduleId, setModuleId] = useState('');
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    listResources(pathId).then(r => { if (!cancelled) setItems(r); });
    return () => { cancelled = true; };
  }, [pathId]);

  const moduleTitle = (id: string | null) => (id ? path.modules.find(m => m.id === id)?.title ?? '' : 'Todo el curso');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return (items ?? []).filter(r =>
      (kind === 'all' || r.kind === kind) &&
      (!moduleId || r.moduleId === moduleId) &&
      (!q || normalize([r.title, r.description, r.source, ...r.tags].join(' ')).includes(q)),
    );
  }, [items, kind, moduleId, query]);

  const remove = async (r: CourseResource) => {
    if (!confirm(`¿Eliminar "${r.title}" de la biblioteca?`)) return;
    try {
      await deleteResource(r);
      setItems(prev => (prev ?? []).filter(x => x.id !== r.id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const chip = (active: boolean) =>
    `text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors ${active ? 'bg-violet-600 border-violet-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 overflow-y-auto p-3 md:p-6" onClick={onClose}>
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 md:p-7 text-white" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start gap-4 mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-1">📚 Biblioteca del curso</p>
            <h2 className="text-xl md:text-2xl font-bold">{path.title.replace(/^Ruta:\s*/, '')}</h2>
            <p className="text-sm text-slate-400 mt-1">Videos, documentos, presentaciones y herramientas para profundizar. No cuentan como actividad: consúltelos cuando quiera.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl" aria-label="Cerrar biblioteca">✕</button>
        </div>

        {isAdmin && (
          <div className="mb-4">
            <button onClick={() => setShowForm(v => !v)} className="text-sm text-violet-300 border border-violet-500/40 hover:border-violet-300 rounded-lg px-3 py-1.5">
              {showForm ? 'Ocultar formulario' : '➕ Agregar recurso'}
            </button>
          </div>
        )}
        {isAdmin && showForm && (
          <AddResourceForm pathId={pathId} path={path} userId={userId} onAdded={r => setItems(prev => [...(prev ?? []), r])} />
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔎 Buscar por título, tema o etiqueta" className={inputCls} />
          <select value={moduleId} onChange={e => setModuleId(e.target.value)} className={`${inputCls} md:max-w-xs`}>
            <option value="">Todos los módulos</option>
            {path.modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          <button onClick={() => setKind('all')} className={chip(kind === 'all')}>Todos ({items?.length ?? 0})</button>
          {KINDS.map(k => {
            const n = (items ?? []).filter(r => r.kind === k.value).length;
            return n > 0 || isAdmin ? (
              <button key={k.value} onClick={() => setKind(k.value)} className={chip(kind === k.value)}>{k.icon} {k.label} ({n})</button>
            ) : null;
          })}
        </div>

        {items === null ? (
          <p className="text-slate-400 text-sm">Cargando…</p>
        ) : filtered.length === 0 ? (
          <p className="text-slate-400 text-sm bg-slate-800/50 rounded-xl p-5 text-center">
            {items.length === 0 ? 'Este curso todavía no tiene materiales en la biblioteca.' : 'Ningún recurso coincide con la búsqueda.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {filtered.map(r => {
              const vid = r.kind === 'video' && r.url ? youtubeId(r.url) : null;
              return (
                <li key={r.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{kindIcon(r.kind)} {r.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{[r.source, moduleTitle(r.moduleId)].filter(Boolean).join(' · ')}</p>
                      {r.description && <p className="text-sm text-slate-300 mt-2">{r.description}</p>}
                      {r.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {r.tags.map(t => (
                            <button key={t} onClick={() => setQuery(t)} className="text-[11px] text-violet-200 bg-violet-500/15 border border-violet-500/30 rounded-full px-2 py-0.5 hover:bg-violet-500/25">#{t}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {vid ? (
                        <button onClick={() => setPlaying(p => (p === r.id ? null : r.id))} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg px-4 py-2">
                          {playing === r.id ? 'Cerrar video' : '▶ Ver aquí'}
                        </button>
                      ) : (
                        <button onClick={() => openResource(r)} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg px-4 py-2">
                          {r.storagePath ? 'Abrir archivo ↗' : 'Abrir ↗'}
                        </button>
                      )}
                      {isAdmin && (
                        <button onClick={() => remove(r)} title="Eliminar de la biblioteca" className="text-rose-300 border border-rose-500/30 hover:border-rose-400 rounded-lg px-3 py-2 text-sm">🗑</button>
                      )}
                    </div>
                  </div>
                  {vid && playing === r.id && (
                    <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${vid}`}
                        title={r.title}
                        style={{ border: 0 }}
                        className="w-full h-full"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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

export default LibraryView;
