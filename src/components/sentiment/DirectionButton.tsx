
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

  const getBgGradient = () => {
    return selected
      ? 'from-blue-600/20 to-blue-800/20'
      : 'from-slate-700/70 to-slate-800/70 hover:from-blue-800/20 hover:to-blue-900/20';
  };

  const getBorderColor = () => {
    return selected
      ? 'border-blue-400 ring-2 ring-blue-500/40'
      : 'border-slate-600 hover:border-blue-500';
  };

  const getTextColor = () => {
    return selected ? 'text-blue-200' : 'text-slate-300 hover:text-blue-300';
  };

  return (
    <motion.button
      className={`
        flex flex-col items-center justify-center py-3 px-2 rounded-lg 
        border-2 transition-all duration-300 w-full font-medium
        bg-gradient-to-br ${getBgGradient()} ${getBorderColor()} ${getTextColor()}
        ${selected ? 'shadow-lg shadow-blue-500/20' : ''}
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
        boxShadow: selected ? '0 10px 25px -5px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
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
