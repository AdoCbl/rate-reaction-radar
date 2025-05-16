
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
      {/* Current Rate Display - Moved to top for context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-1">
          <p className="text-sm font-medium text-slate-300">Current target rate:</p>
        </div>
        <div className="flex items-center">
          <span className="px-4 py-2 bg-slate-700/70 rounded-md text-white text-xl font-semibold">
            {currentRate.toFixed(2)}%
          </span>
        </div>
      </motion.div>
      
      {/* Direction Question */}
      <div>
        <p className="text-sm font-medium text-slate-300 mb-2">
          What action do you expect at the next meeting?
        </p>
        
        {/* Direction Buttons */}
        <div className="grid grid-cols-3 gap-2">
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
      </div>
      
      {/* Confidence Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="pt-2"
      >
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-slate-300">How confident are you?</p>
          <span className="text-sm font-semibold text-white px-2 py-0.5 bg-slate-700 rounded">
            {confidence}%
          </span>
        </div>
        
        <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
        
        <div className="flex justify-between mt-1 text-xs text-slate-400">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </motion.div>
      
      {/* Selected direction confirmation */}
      {direction && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-slate-700/50 border border-slate-600 rounded-md"
        >
          <p className="text-sm text-slate-200">
            You selected: 
            <span className="font-medium ml-1.5 text-sky-400">
              {direction.charAt(0).toUpperCase() + direction.slice(1)}
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
