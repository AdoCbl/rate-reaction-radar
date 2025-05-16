
import React from 'react';
import { Button } from '@/components/ui/button';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Question 1: Fed Response */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold text-white">What do you think the Fed did in response?</h3>
        <div className="grid grid-cols-3 gap-4 mt-3">
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
        className="space-y-4 pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-white">How do you think the 2-Year Treasury Yield reacted?</h3>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-6">
          <YieldEstimateInput 
            yieldEstimate={yieldEstimate} 
            onYieldChange={onYieldChange} 
          />
        </div>
      </motion.div>
      
      {/* Confidence Section */}
      <motion.div 
        className="space-y-4 pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-white">How confident are you in your prediction?</h3>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-6">
          <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
        </div>
      </motion.div>
      
      {/* Prediction Summary */}
      {direction && (
        <motion.div
          className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-slate-400 text-center block">
            You predicted: <span className="font-semibold text-white">{direction.charAt(0).toUpperCase() + direction.slice(1)}</span> | 
            <span className="font-semibold text-white"> {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps</span> | 
            Confidence: <span className="font-semibold text-white">{confidence}%</span>
          </span>
        </motion.div>
      )}
      
      <motion.div 
        className="flex items-center text-sm text-slate-300 mt-2 bg-slate-800/40 p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Info size={18} className="mr-2 text-indigo-400 flex-shrink-0" />
        <span>Your responses will be scored based on accuracy and confidence level. Higher confidence increases potential score but also risks.</span>
      </motion.div>
      
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <Button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 text-base rounded-lg"
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
