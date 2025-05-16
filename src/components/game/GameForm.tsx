
import React from 'react';
import { Button } from '@/components/ui/button';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Direction } from '@/components/sentiment/types';
import YieldEstimateInput from './YieldEstimateInput';

interface GameFormProps {
  direction: Direction | null;
  yieldEstimate: number;
  confidence: number;
  submitted: boolean;
  onDirectionChange: (direction: Direction) => void;
  onYieldChange: (value: number) => void;
  onConfidenceChange: (value: number) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const GameForm: React.FC<GameFormProps> = ({
  direction,
  yieldEstimate,
  confidence,
  submitted,
  onDirectionChange,
  onYieldChange,
  onConfidenceChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Question 1: Fed Response */}
      <motion.div 
        className="space-y-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-base font-medium text-gray-200">How did the Fed respond?</label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <DirectionButton 
            direction="hike" 
            selected={direction === 'hike'} 
            onClick={onDirectionChange}
          />
          <DirectionButton 
            direction="hold" 
            selected={direction === 'hold'} 
            onClick={onDirectionChange}
          />
          <DirectionButton 
            direction="cut" 
            selected={direction === 'cut'} 
            onClick={onDirectionChange}
          />
        </div>
      </motion.div>
      
      {/* Question 2: Yield Estimate */}
      <motion.div 
        className="space-y-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <YieldEstimateInput 
          yieldEstimate={yieldEstimate} 
          onYieldChange={onYieldChange} 
        />
      </motion.div>
      
      {/* Confidence Section */}
      <motion.div 
        className="space-y-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-base font-medium text-gray-200 mb-1">How confident are you?</label>
        <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
      </motion.div>
      
      <motion.div 
        className="flex items-center text-sm text-gray-300 mt-2 bg-gray-800/40 p-3 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Info size={18} className="mr-2 text-sky-400 flex-shrink-0" />
        <span>Your responses will be scored based on accuracy and confidence level. Higher confidence increases potential score but also risks.</span>
      </motion.div>
      
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          type="submit" 
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-6 text-base"
          disabled={!direction || submitted}
        >
          {submitted ? (
            <motion.span 
              className="flex items-center"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
            >
              Processing <ArrowRight className="ml-2" size={18} />
            </motion.span>
          ) : (
            "Submit Your Prediction"
          )}
        </Button>
      </motion.div>
    </form>
  );
};

export default GameForm;
