import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InteractiveItem } from '../types';
import { PointerIcon } from './icons';

interface InteractiveCardProps {
  title: string;
  items: InteractiveItem[];
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, items }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="my-4 bg-slate-800/50 rounded-lg p-6 flex flex-col items-center w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 text-blue-400"><PointerIcon /></div>
                <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
            </div>
            <div className="w-full">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-slate-700 last:border-b-0">
                        <motion.button
                            onClick={() => handleToggle(index)}
                            className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-slate-100 hover:bg-slate-700/50 transition-colors"
                            aria-expanded={expandedIndex === index}
                            aria-controls={`definition-${index}`}
                        >
                            <span>{item.term}</span>
                            <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0 }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </motion.div>
                        </motion.button>
                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    id={`definition-${index}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-4 pt-0 text-slate-300 leading-relaxed">{item.definition}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractiveCard;