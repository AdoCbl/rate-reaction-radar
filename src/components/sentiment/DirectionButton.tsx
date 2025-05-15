
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
        return <ArrowUp size={24} strokeWidth={2.5} />;
      case 'hold':
        return <ArrowRight size={24} strokeWidth={2.5} />;
      case 'cut':
        return <ArrowDown size={24} strokeWidth={2.5} />;
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

  const getGradient = () => {
    switch (direction) {
      case 'hike':
        return selected
          ? 'from-emerald-600/90 to-emerald-800/90'
          : 'from-slate-700/70 to-slate-800/70 hover:from-emerald-800/30 hover:to-emerald-900/30';
      case 'hold':
        return selected
          ? 'from-sky-600/90 to-sky-800/90'
          : 'from-slate-700/70 to-slate-800/70 hover:from-sky-800/30 hover:to-sky-900/30';
      case 'cut':
        return selected
          ? 'from-rose-600/90 to-rose-800/90'
          : 'from-slate-700/70 to-slate-800/70 hover:from-rose-800/30 hover:to-rose-900/30';
      default:
        return '';
    }
  };

  const getBorderColor = () => {
    switch (direction) {
      case 'hike':
        return selected
          ? 'border-emerald-400'
          : 'border-slate-600 hover:border-emerald-500';
      case 'hold':
        return selected
          ? 'border-sky-400'
          : 'border-slate-600 hover:border-sky-500';
      case 'cut':
        return selected
          ? 'border-rose-400'
          : 'border-slate-600 hover:border-rose-500';
      default:
        return 'border-slate-600';
    }
  };

  const getTextColor = () => {
    switch (direction) {
      case 'hike':
        return selected ? 'text-emerald-300' : 'text-slate-300 hover:text-emerald-300';
      case 'hold':
        return selected ? 'text-sky-300' : 'text-slate-300 hover:text-sky-300';
      case 'cut':
        return selected ? 'text-rose-300' : 'text-slate-300 hover:text-rose-300';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <motion.button
      className={`
        flex flex-col items-center justify-center py-2 px-2 rounded-lg 
        border-2 transition-all duration-300 w-full font-medium
        bg-gradient-to-br ${getGradient()} ${getBorderColor()} ${getTextColor()}
        ${selected ? 'shadow-lg' : ''}
      `}
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
        className={`mb-1 ${selected ? 'pulse-glow' : ''}`}
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
      <span className="text-sm font-semibold">{getLabel()}</span>
    </motion.button>
  );
};
