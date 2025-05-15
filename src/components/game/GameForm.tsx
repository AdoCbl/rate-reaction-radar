
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
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">How did the Fed respond?</label>
        <div className="grid grid-cols-3 gap-3">
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
      </div>
      
      <Separator className="bg-gray-800" />
      
      {/* Question 2: Yield Estimate */}
      <YieldEstimateInput 
        yieldEstimate={yieldEstimate} 
        onYieldChange={onYieldChange} 
      />
      
      {/* Confidence */}
      <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
      
      <div className="flex items-center text-xs text-gray-400 mt-2 bg-gray-800/30 p-2 rounded-md">
        <Info size={14} className="mr-1 text-sky-400" />
        <span>Your responses will be scored based on accuracy and confidence level.</span>
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium"
        disabled={!direction || submitted}
      >
        {submitted ? (
          <motion.span 
            className="flex items-center"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
          >
            Processing <ArrowRight className="ml-2" size={16} />
          </motion.span>
        ) : (
          "Submit Your Prediction"
        )}
      </Button>
    </form>
  );
};

export default GameForm;
