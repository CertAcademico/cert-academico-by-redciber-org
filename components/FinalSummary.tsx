import React, { useEffect, useState } from 'react';
import { getGroupProgress, type GroupProgress } from '../submissionService';
import { getMyCertificates, type Certificate } from '../certificateService';
import { getCourseProgress } from '../progressService';
import type { CourseProgress } from '../types';

// Suma de la jornada: lo de cada estudiante y lo de su equipo, en un solo vistazo.
const GROUP_BLOCKS = ['pd_b1', 'pd_b2', 'pd_b3', 'pd_b4', 'pd_b5', 'pd_b6'];

const FinalSummary: React.FC<{ userId: string; pathId: string; totalModules: number; refreshKey: string }> = ({ userId, pathId, totalModules, refreshKey }) => {
  const [gp, setGp] = useState<GroupProgress | null>(null);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [cp, setCp] = useState<CourseProgress | null>(null);

  useEffect(() => {
    getGroupProgress(pathId).then(setGp).catch(() => undefined);
    getMyCertificates(userId).then(setCerts).catch(() => undefined);
    getCourseProgress(userId, pathId).then(setCp).catch(() => undefined);
  }, [userId, pathId, refreshKey]);

  const done = cp?.completedModules ?? [];
  const delivered = GROUP_BLOCKS.filter(m => gp?.delivered.includes(m)).length;
  const starred = GROUP_BLOCKS.filter(m => gp?.starred.includes(m)).length;
  // 3 estrellas por bloque (1 a 6): reto propio, entrega del grupo y entrega destacada.
  const stars = GROUP_BLOCKS.reduce((n, m, i) => n + (done.includes(i) ? 1 : 0) + (gp?.delivered.includes(m) ? 1 : 0) + (gp?.starred.includes(m) ? 1 : 0), 0);
  const badges = certs.filter(c => c.pathId.startsWith(`${pathId}_b`)).length;
  const certificate = certs.some(c => c.pathId === pathId);
  const exam = cp?.scores?.['pd_b7'] ?? cp?.scores?.['pd_b8'];
  const examPct = exam && exam.maxScore ? Math.round((100 * exam.score) / exam.maxScore) : null;

  const tile = (label: string, value: string, ok: boolean) => (
    <div className={`rounded-xl border px-4 py-3 ${ok ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-600 bg-slate-900/60'}`}>
      <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-xl font-bold text-white mt-1">{value}</p>
    </div>
  );

  return (
    <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-5 text-left">
      <p className="text-lg font-bold text-white">📊 Su suma de la jornada</p>
      <p className="text-sm text-slate-300 mt-1">
        {gp?.group ? `Grupo ${gp.group}` : 'Sin grupo'} · lo personal y lo del equipo, sumado. Se actualiza al aprobar la evaluación.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {tile('Bloques completados', `${done.length} de ${totalModules}`, done.length >= totalModules)}
        {tile('Entregas del equipo', `${delivered} de 6`, delivered === 6)}
        {tile('Estrellas (bloques 1 a 6)', `${stars} de 18`, stars >= 12)}
        {tile('Entregas destacadas', `${starred} de 6`, starred > 0)}
        {tile('Badges', `${badges} de 7`, badges === 7)}
        {tile('Evaluación final', examPct === null ? 'Pendiente' : `${examPct} % ✅`, examPct !== null)}
      </div>
      <p className={`mt-4 text-sm font-semibold ${certificate ? 'text-emerald-300' : 'text-amber-200'}`}>
        {certificate
          ? '🎓 Certificado del curso emitido. Lo encuentra en su perfil.'
          : '🎓 Certificado: se emite al aprobar la evaluación final con los 7 bloques completos.'}
      </p>
    </div>
  );
};

export default FinalSummary;
