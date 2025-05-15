
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
        return 'Hike';
      case 'hold':
        return 'Hold';
      case 'cut':
        return 'Cut';
      default:
        return '';
    }
  };

  const getStyles = () => {
    const baseStyle = "flex flex-col items-center justify-center py-4 px-2 rounded-lg border-2 transition-all duration-200 w-full font-medium";
    
    switch (direction) {
      case 'hike':
        return selected
          ? `${baseStyle} bg-emerald-900/30 border-emerald-600 text-emerald-400`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-emerald-700 hover:text-emerald-400`;
      case 'hold':
        return selected
          ? `${baseStyle} bg-sky-900/30 border-sky-600 text-sky-400`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-sky-700 hover:text-sky-400`;
      case 'cut':
        return selected
          ? `${baseStyle} bg-red-900/30 border-red-600 text-red-400`
          : `${baseStyle} bg-gray-800/50 border-gray-700 text-gray-300 hover:border-red-700 hover:text-red-400`;
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
        boxShadow: selected ? '0 8px 16px -2px rgba(0, 0, 0, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-1">{getIcon()}</div>
      <span>{getLabel()}</span>
    </motion.button>
  );
};
