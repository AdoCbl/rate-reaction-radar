
import React from 'react';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { motion } from 'framer-motion';
import { Direction } from './types';

type FomcOutlookSectionProps = {
  direction: Direction | null;
  confidence: number;
  currentRate: number;
  onDirectionClick: (direction: Direction) => void;
  onConfidenceChange: (value: number) => void;
};

export const FomcOutlookSection: React.FC<FomcOutlookSectionProps> = ({
  direction,
  confidence,
  currentRate,
  onDirectionClick,
  onConfidenceChange
}) => {
  return (
    <motion.div 
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      {/* Direction Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <DirectionButton 
          direction="cut" 
          selected={direction === 'cut'} 
          onClick={onDirectionClick}
        />
        <DirectionButton 
          direction="hold" 
          selected={direction === 'hold'} 
          onClick={onDirectionClick}
        />
        <DirectionButton 
          direction="hike" 
          selected={direction === 'hike'} 
          onClick={onDirectionClick}
        />
      </div>
      
      {/* Current Rate Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <p className="text-base font-medium text-slate-300">Current target rate: 
            <span className="ml-1 px-2 py-0.5 bg-slate-700/70 rounded-md text-white font-semibold">
              {currentRate.toFixed(2)}%
            </span>
          </p>
        </div>
      </motion.div>
      
      {/* Confidence Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-1"
      >
        <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
      </motion.div>
    </motion.div>
  );
};
