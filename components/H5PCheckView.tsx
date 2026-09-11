import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { H5PCheckContent } from '../types';

interface H5PCheckViewProps {
  data: H5PCheckContent;
  onComplete?: (score: number, maxScore: number) => void;
}

export const H5PCheckView: React.FC<H5PCheckViewProps> = ({ data, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ question: string; chosen: string; isCorrect: boolean }[]>([]);

  const currentQuestion = data.questions[currentQuestionIndex];
  const maxPossible = data.questions.length * 10;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleValidate = () => {
    if (!selectedOptionId || isAnswered) return;
    const chosen = currentQuestion.options.find(o => o.id === selectedOptionId);
    if (!chosen) return;
    setIsAnswered(true);
    setTotalScore(prev => prev + (chosen.score || 0));
    setAnswersLog(prev => [...prev, {
      question: currentQuestion.question,
      chosen: chosen.text,
      isCorrect: chosen.isCorrect,
    }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setGameFinished(true);
      onComplete?.(totalScore, maxPossible);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setTotalScore(0);
    setIsAnswered(false);
    setGameFinished(false);
    setAnswersLog([]);
  };

  const getBadgeInfo = () => {
    const ratio = totalScore / maxPossible;
    if (ratio >= 0.85) return {
      label: 'Perito de Élite 🎓',
      desc: '¡Increíble! Dominas plenamente estos conceptos y estás listo para aplicar estas lecciones.',
      color: 'from-blue-600 to-indigo-500 text-white',
    };
    if (ratio >= 0.5) return {
      label: 'Analista de Sistemas 🔍',
      desc: '¡Buen trabajo! Tienes bases sólidas pero recuerda revisar los conceptos para afianzar el dominio total.',
      color: 'from-emerald-600 to-sky-500 text-white',
    };
    return {
      label: 'Explorador Tecnológico 💡',
      desc: 'Un gran inicio. Te recomendamos volver a repasar la teoría y videos para consolidar tus habilidades.',
      color: 'from-slate-600 to-slate-500 text-white',
    };
  };

  const checkSvg = (
    <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
  const errorSvg = (
    <svg className="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="my-8 bg-slate-800/40 border border-slate-700/45 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto backdrop-blur-md shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full">
            Cuestionario H5P (Interactive Assessment)
          </span>
          <h3 className="text-xl font-bold mt-2 text-slate-100">{data.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{data.description}</p>
        </div>
        {!gameFinished && (
          <div className="text-right text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50 shrink-0 ml-4">
            Pregunta {currentQuestionIndex + 1} de {data.questions.length}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!gameFinished ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="p-4 bg-slate-900/60 border border-slate-700/40 rounded-xl">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">PREGUNTA</span>
              <p className="text-base md:text-lg text-slate-100 font-medium leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                let style = 'border-slate-700 hover:border-slate-500 hover:bg-slate-700/10';
                if (isAnswered) {
                  if (option.isCorrect) style = 'border-emerald-600 bg-emerald-950/20 text-emerald-300';
                  else if (isSelected) style = 'border-rose-600 bg-rose-950/20 text-rose-300';
                  else style = 'border-slate-800 opacity-50';
                } else if (isSelected) {
                  style = 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30';
                }
                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 ${style}`}
                  >
                    <span>{option.text}</span>
                    <div className="shrink-0 ml-3">
                      {isAnswered ? (
                        option.isCorrect ? checkSvg : (isSelected ? errorSvg : null)
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500' : 'border-slate-600'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-slate-900/60 border border-slate-700/40 rounded-xl"
              >
                <div className="flex gap-2.5 items-start">
                  <span className="text-xl">💡</span>
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm">Explicación Académica:</h5>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                      {currentQuestion.feedback}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-700/30">
              {!isAnswered ? (
                <button
                  disabled={!selectedOptionId}
                  onClick={handleValidate}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Confirmar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  {currentQuestionIndex === data.questions.length - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta →'}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-tr from-slate-800/60 to-slate-700/40 shadow-xl flex flex-col items-center border border-slate-600/20">
              <span className="text-4xl block mb-2">🏆</span>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${getBadgeInfo().color}`}>
                {getBadgeInfo().label}
              </div>
              <h4 className="text-lg font-bold text-slate-100 mt-4">Cuestionario Completado</h4>
              <p className="text-slate-300 text-xs mt-2 px-4 leading-relaxed">{getBadgeInfo().desc}</p>
              <div className="text-2xl font-black text-blue-400 mt-4 bg-slate-900/60 px-5 py-1.5 rounded-xl border border-slate-700/50">
                Puntaje {totalScore} / {maxPossible}
              </div>
            </div>

            <div className="max-w-md mx-auto text-left bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <h5 className="text-sm font-bold text-slate-300 mb-3 block border-b border-slate-700/40 pb-2">Revisión del Intento:</h5>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {answersLog.map((log, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-2 bg-slate-950/45 rounded border border-slate-800/40 gap-4">
                    <span className="text-slate-300 line-clamp-1 flex-grow font-medium">{log.question}</span>
                    <span className={`shrink-0 font-bold ${log.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {log.isCorrect ? 'Correcta' : 'Incorrecta'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={resetGame}
                className="px-4 py-2 border border-slate-600 hover:border-slate-500 hover:bg-slate-700/20 text-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                🔄 Reintentar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default H5PCheckView;
