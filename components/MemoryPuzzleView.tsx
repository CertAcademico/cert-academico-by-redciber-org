import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MemoryPair } from '../types';

interface MemoryPuzzleViewProps {
  title: string;
  pairs: MemoryPair[];
  onComplete?: () => void;
}

interface CardItem {
  id: string;
  text: string;
  isDefinition: boolean;
  pairIndex: number; // Index of the matching pair
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryPuzzleView: React.FC<MemoryPuzzleViewProps> = ({ title, pairs, onComplete }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle cards
  const initializeGame = () => {
    // Generate terms and definitions separately with unique IDs
    const termCards: CardItem[] = pairs.map((pair, index) => ({
      id: `term-${index}`,
      text: pair.term,
      isDefinition: false,
      pairIndex: index,
      isFlipped: false,
      isMatched: false,
    }));

    const definitionCards: CardItem[] = pairs.map((pair, index) => ({
      id: `def-${index}`,
      text: pair.definition,
      isDefinition: true,
      pairIndex: index,
      isFlipped: false,
      isMatched: false,
    }));

    // Combine and shuffle arrays
    const combined = [...termCards, ...definitionCards];
    // Simple, reliable shuffle
    const shuffled = combined
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);

    setCards(shuffled);
    setSelectedIndices([]);
    setTurns(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [pairs]);

  const handleCardClick = (clickedIndex: number) => {
    const card = cards[clickedIndex];

    // Ignore clicks if the card is already flipped, matched, or if 2 cards are already selected
    if (card.isFlipped || card.isMatched || selectedIndices.length >= 2) {
      return;
    }

    const newIndices = [...selectedIndices, clickedIndex];
    
    // Toggle clicked card state
    setCards(prev => prev.map((c, idx) => idx === clickedIndex ? { ...c, isFlipped: true } : c));
    setSelectedIndices(newIndices);

    // If we have selected two cards, check for a match
    if (newIndices.length === 2) {
      const [firstIdx, secondIdx] = newIndices;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      setTurns(prev => prev + 1);

      // Check if they are part of the same pair but different types (one term, one definition)
      if (firstCard.pairIndex === secondCard.pairIndex && firstCard.isDefinition !== secondCard.isDefinition) {
        // Matched!
        setTimeout(() => {
          setCards(prev => prev.map((c, idx) => 
            idx === firstIdx || idx === secondIdx ? { ...c, isMatched: true } : c
          ));
          setSelectedIndices([]);

          // Check if game is completed
          setCards(currentCards => {
            if (currentCards.every(c => c.isMatched)) {
              setIsWon(true);
              onComplete?.();
            }
            return currentCards;
          });
        }, 600);
      } else {
        // Not a match, flip back
        setTimeout(() => {
          setCards(prev => prev.map((c, idx) => 
            idx === firstIdx || idx === secondIdx ? { ...c, isFlipped: false } : c
          ));
          setSelectedIndices([]);
        }, 1200);
      }
    }
  };

  const matchedCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div className="my-8 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Rompecabezas de Memoria (Memory Match)
          </span>
          <h3 className="text-xl font-bold mt-2 text-slate-100">{title}</h3>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <div className="bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
            Intentos: <span className="font-bold text-white">{turns}</span>
          </div>
          <div className="bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
            Pares: <span className="font-bold text-emerald-400">{matchedCount} de {pairs.length}</span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 leading-relaxed">
        Instrucciones: Encuentra la correspondencia entre los <strong>Términos clave</strong> y sus correspondientes <strong>Definiciones</strong>. Selecciona dos tarjetas consecutivamente para ver si coinciden.
      </p>

      {/* Grid of memory cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        {cards.map((card, index) => {
          const isSelected = selectedIndices.includes(index);
          const showFront = card.isFlipped || card.isMatched;
          
          let cardBorderClass = 'border-slate-700/80 bg-slate-900/50 hover:border-slate-500';
          let textColor = 'text-slate-100';

          if (card.isMatched) {
            cardBorderClass = 'border-emerald-600/80 bg-emerald-950/20';
            textColor = 'text-emerald-400';
          } else if (isSelected) {
            cardBorderClass = 'border-blue-500 bg-slate-850';
            textColor = 'text-blue-400';
          }

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.isMatched ? 1 : 1.02 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.98 }}
              className={`h-28 rounded-xl border-2 p-3 flex items-center justify-center text-center cursor-pointer transition-all duration-300 overflow-y-auto ${cardBorderClass} select-none`}
              onClick={() => handleCardClick(index)}
            >
              {showFront ? (
                <div className="flex flex-col h-full justify-center items-center">
                  <span className={`text-xs ${textColor} font-semibold uppercase tracking-wider mb-1 opacity-60 text-slate-400`}>
                    {card.isDefinition ? 'DEFINICIÓN' : 'TÉRMINO'}
                  </span>
                  <p className={`text-xs md:text-sm leading-snug font-medium ${textColor}`}>
                    {card.text}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-wider opacity-60">REVELAR</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 bg-gradient-to-br from-emerald-900/30 to-green-950/20 border border-emerald-500/30 rounded-xl text-center shadow-lg"
          >
            <h4 className="text-lg font-bold text-emerald-400 mb-1">¡Felicitaciones! 🎉</h4>
            <p className="text-slate-300 text-sm mb-3">Has completado el ejercicio de memoria y dominas estos conceptos.</p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              🔄 Jugar de nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryPuzzleView;
