
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
    <div className="space-y-4">
      <motion.h2 
        className="text-xl font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Your FOMC Outlook
      </motion.h2>
      
      <motion.p 
        className="text-sm text-gray-400 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        What's your outlook for the next meeting?
      </motion.p>
      
      {/* Direction Buttons */}
      <motion.div 
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
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
      </motion.div>
      
      {/* Current Rate Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4"
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Current target rate: <span className="text-white">{currentRate.toFixed(2)}%</span></p>
        </div>
      </motion.div>
      
      {/* Confidence Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4"
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
      </motion.div>
    </div>
  );
};
