import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  themeColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completedCount, totalCount, themeColor = 'default' }) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Map theme color keys to beautiful gradients
  const gradientMap: Record<string, string> = {
    cybersecurity: 'from-blue-500 to-cyan-400 shadow-cyan-500/50',
    cybercrime: 'from-red-600 to-rose-400 shadow-rose-500/50',
    cybercriminology: 'from-purple-500 to-indigo-400 shadow-indigo-500/50',
    quantum_computing: 'from-fuchsia-500 to-pink-400 shadow-pink-500/50',
    forensic_auditing: 'from-green-500 to-emerald-400 shadow-emerald-500/50',
    artificial_intelligence: 'from-amber-500 to-yellow-400 shadow-amber-500/50',
    default: 'from-blue-500 to-indigo-400 shadow-blue-500/50',
  };

  const gradientClass = gradientMap[themeColor] || gradientMap.default;

  return (
    <div id="learning-progress-container" className="w-full bg-slate-900/40 border border-slate-700/30 rounded-2xl p-4 mb-6 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-300">
          Progreso de la Ruta: <span className="font-bold text-white">{completedCount}</span> de <span className="font-bold text-white">{totalCount}</span> módulos completados
        </span>
        <span className="text-sm font-bold font-mono text-slate-200 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700/60 flex items-center gap-1">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-[2px] border border-slate-800">
        <motion.div
          id="learning-progress-fill"
          className={`h-full rounded-full bg-gradient-to-r ${gradientClass} shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
