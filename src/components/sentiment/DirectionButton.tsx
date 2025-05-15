
import React from 'react';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export type Direction = 'hike' | 'hold' | 'cut';

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
        return <ArrowUp size={28} />;
      case 'hold':
        return <ArrowRight size={28} />;
      case 'cut':
        return <ArrowDown size={28} />;
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
    const baseStyle = "flex flex-col items-center justify-center py-5 px-2 rounded-xl border-2 transition-all duration-300 w-full font-medium";
    
    switch (direction) {
      case 'hike':
        return selected
          ? `${baseStyle} bg-emerald-900/30 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-900/20`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-emerald-700/70 hover:text-emerald-400 hover:bg-emerald-900/10`;
      case 'hold':
        return selected
          ? `${baseStyle} bg-sky-900/30 border-sky-500 text-sky-400 shadow-lg shadow-sky-900/20`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-sky-700/70 hover:text-sky-400 hover:bg-sky-900/10`;
      case 'cut':
        return selected
          ? `${baseStyle} bg-red-900/30 border-red-500 text-red-400 shadow-lg shadow-red-900/20`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-red-700/70 hover:text-red-400 hover:bg-red-900/10`;
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0.8 }}
      animate={{ 
        opacity: 1,
        y: selected ? -2 : 0,
        boxShadow: selected ? '0 8px 24px -4px rgba(0, 0, 0, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-2 pulse-glow">{getIcon()}</div>
      <span className="text-sm">{getLabel()}</span>
    </motion.button>
  );
};
