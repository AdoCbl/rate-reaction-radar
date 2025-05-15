
import React from 'react';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Direction } from './types';

type DirectionButtonProps = {
  direction: Direction;
  selected: boolean;
  onClick: (direction: Direction) => void;
};

export const DirectionButton: React.FC<DirectionButtonProps> = ({
  direction,
  selected,
  onClick,
}) => {
  const getIcon = () => {
    switch (direction) {
      case 'hike':
        return <ArrowUp size={28} strokeWidth={2.5} />;
      case 'hold':
        return <ArrowRight size={28} strokeWidth={2.5} />;
      case 'cut':
        return <ArrowDown size={28} strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (direction) {
      case 'hike':
        return 'Rate Hike';
      case 'hold':
        return 'Hold';
      case 'cut':
        return 'Rate Cut';
      default:
        return '';
    }
  };

  const getStyles = () => {
    const baseStyle = "flex flex-col items-center justify-center py-6 px-3 rounded-xl border-2 transition-all duration-300 w-full font-medium";
    
    switch (direction) {
      case 'hike':
        return selected
          ? `${baseStyle} bg-gradient-to-b from-emerald-900/60 to-emerald-900/30 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20`
          : `${baseStyle} bg-slate-800/80 border-slate-700 text-slate-300 hover:border-emerald-600 hover:text-emerald-400 hover:bg-emerald-900/20`;
      case 'hold':
        return selected
          ? `${baseStyle} bg-gradient-to-b from-sky-900/60 to-sky-900/30 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/20`
          : `${baseStyle} bg-slate-800/80 border-slate-700 text-slate-300 hover:border-sky-600 hover:text-sky-400 hover:bg-sky-900/20`;
      case 'cut':
        return selected
          ? `${baseStyle} bg-gradient-to-b from-rose-900/60 to-rose-900/30 border-rose-500 text-rose-400 shadow-lg shadow-rose-500/20`
          : `${baseStyle} bg-slate-800/80 border-slate-700 text-slate-300 hover:border-rose-600 hover:text-rose-400 hover:bg-rose-900/20`;
      default:
        return baseStyle;
    }
  };

  return (
    <motion.button
      className={getStyles()}
      onClick={() => onClick(direction)}
      type="button"
      aria-pressed={selected}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0.8 }}
      animate={{ 
        opacity: 1,
        y: selected ? -3 : 0,
        boxShadow: selected ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className={`mb-3 ${selected ? 'pulse-glow' : ''}`}
        animate={{ 
          scale: selected ? [1, 1.05, 1] : 1 
        }}
        transition={{ 
          duration: 2, 
          repeat: selected ? Infinity : 0,
          repeatType: "reverse" 
        }}
      >
        {getIcon()}
      </motion.div>
      <span className="text-base font-semibold">{getLabel()}</span>
    </motion.button>
  );
};
