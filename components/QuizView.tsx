
import React, { useState, useRef, useEffect } from 'react';
import type { QuizData } from '../types';

interface QuizViewProps {
  data: QuizData;
  onComplete: () => void;
}

enum AnswerState {
  UNANSWERED,
  CORRECT,
  INCORRECT
}

const QuizView: React.FC<QuizViewProps> = ({ data, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.UNANSWERED);
  const retryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (answerState === AnswerState.INCORRECT) {
        retryButtonRef.current?.focus();
    }
  }, [answerState]);

  const handleOptionClick = (index: number) => {
    if (answerState !== AnswerState.UNANSWERED) return;

    setSelectedOption(index);
    if (index === data.correctOptionIndex) {
      setAnswerState(AnswerState.CORRECT);
      onComplete(); 
    } else {
      setAnswerState(AnswerState.INCORRECT);
    }
  };

  const handleRetry = () => {
      setSelectedOption(null);
      setAnswerState(AnswerState.UNANSWERED);
  }

  const getButtonClass = (index: number) => {
    if (answerState === AnswerState.UNANSWERED) {
      return 'bg-slate-700 hover:bg-slate-600';
    }
    if (index === data.correctOptionIndex) {
      return 'bg-green-600 animate-pulse';
    }
    if (index === selectedOption) {
      return 'bg-red-600';
    }
    return 'bg-slate-700 opacity-50 cursor-not-allowed';
  };
  
  const getFeedback = () => {
    if (answerState === AnswerState.CORRECT) {
        return <p className="text-green-400 mt-4">{data.feedback.correct}</p>;
    }
    if (answerState === AnswerState.INCORRECT) {
        return <p className="text-red-400 mt-4">{data.feedback.incorrect}</p>;
    }
    return <p className="mt-4 h-6">&nbsp;</p>; // Placeholder for layout stability
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{data.question}</h2>
      <div className="w-full max-w-2xl space-y-4">
        {data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={answerState !== AnswerState.UNANSWERED}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${getButtonClass(index)}`}
          >
            {option}
          </button>
        ))}
      </div>
       <div className="mt-6 max-w-2xl h-24" aria-live="polite">
          {getFeedback()}
          {answerState === AnswerState.INCORRECT && (
            <button
                ref={retryButtonRef}
                onClick={handleRetry}
                className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
                Intentar de nuevo
            </button>
          )}
          {answerState === AnswerState.CORRECT && (
              <p className="mt-4 text-slate-300">¡Correcto! Ahora puedes continuar a la siguiente página.</p>
          )}
       </div>
    </div>
  );
};

export default QuizView;