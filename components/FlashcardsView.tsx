import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FlashcardItem } from '../types';

interface FlashcardsViewProps {
  title: string;
  cards: FlashcardItem[];
  onComplete?: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ title, cards, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Record<number, boolean>>({});

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const markAsKnown = (known: boolean) => {
    setKnownCards(prev => ({ ...prev, [currentIndex]: known }));
    // Automatically advance with a little delay for gamification
    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const currentCard = cards[currentIndex];
  const knownCount = Object.values(knownCards).filter(Boolean).length;
  const progressPercent = Math.round((Object.keys(knownCards).length / cards.length) * 100);

  return (
    <div className="my-8 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto backdrop-blur-md shadow-2xl">
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full">
            Tarjetas de Repaso (Flashcards)
          </span>
          <h3 className="text-xl font-bold mt-2 text-slate-100">{title}</h3>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
          Tarjeta {currentIndex + 1} de {cards.length}
        </div>
      </div>

      {/* Progress mini indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progreso de estudio</span>
          <span>{knownCount} dominada(s) de {cards.length}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400/80 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard with 3D Flip effect */}
      <div className="flex flex-col items-center justify-center min-h-[260px] cursor-pointer perspective mb-8" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-64 relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Front Face */}
          <div className="absolute inset-0 w-full h-full rounded-xl bg-slate-900/80 border-2 border-slate-700/65 flex flex-col items-center justify-center text-center p-6 backface-hidden shadow-lg hover:border-amber-500/50 transition-colors">
            <div className="absolute top-3 right-3 text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>Fácil</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 animate-pulse text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l.707-.707a1 1 0 101.414 1.414l-.707.707zM5 10a1 1 0 11-2 0 1 1 0 012 0zM8 16a1 1 0 100-2H7a1 1 0 100 2h1zM5.657 13.05a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM15.657 14.243a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
              </svg>
            </div>
            <p className="text-lg md:text-xl font-medium px-4 text-slate-100 leading-normal">
              {currentCard.front}
            </p>
            <span className="absolute bottom-4 text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full flex items-center gap-1">
              💡 Tocar para voltear
            </span>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 w-full h-full rounded-xl bg-slate-900 border-2 border-amber-600/60 flex flex-col items-center justify-center text-center p-6 backface-hidden shadow-2xl rotate-y-180"
          >
            <p className="text-base md:text-lg text-slate-200 leading-relaxed max-h-48 overflow-y-auto px-2">
              {currentCard.back}
            </p>
            <span className="absolute bottom-4 text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700/60">
              🔙 Tocar para volver al frente
            </span>
          </div>
        </motion.div>
      </div>

      {/* Navigation and interactive self-evaluation */}
      <div className="flex flex-col gap-4">
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-3"
          >
            <button
              onClick={(e) => { e.stopPropagation(); markAsKnown(false); }}
              className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-medium rounded-xl transition-all flex items-center gap-1.5 text-sm"
            >
              ⚠️ Repasar más tarde
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); markAsKnown(true); }}
              className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-300 font-medium rounded-xl transition-all flex items-center gap-1.5 text-sm shadow-emerald-900/10"
            >
              🎯 ¡Entendido!
            </button>
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-2 border-t border-slate-700/40 pt-4">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700/50 rounded-lg text-xs font-semibold text-slate-350 transition-colors flex items-center gap-1"
          >
            ← Anterior
          </button>
          
          <div className="text-xs text-slate-400 italic">
            Tip: Trata de recordar la respuesta antes de voltearla
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white border border-amber-500 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm shadow-amber-900/10"
          >
            {currentIndex === cards.length - 1 ? 'Finalizar' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsView;
