
import React from 'react';
import { Button } from '@/components/ui/button';
import { DirectionButton } from '@/components/sentiment/DirectionButton';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Direction } from '@/components/sentiment/types';
import YieldEstimateInput from './YieldEstimateInput';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Question 1: Fed Response */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white">What do you think the Fed did in response?</h3>
        <div className="grid grid-cols-3 gap-3 mt-1">
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
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white">How do you think the 2-Year Treasury Yield reacted?</h3>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <YieldEstimateInput 
            yieldEstimate={yieldEstimate} 
            onYieldChange={onYieldChange} 
          />
        </div>
      </motion.div>
      
      {/* Confidence Section */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white">How confident are you in your prediction?</h3>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />
        </div>
      </motion.div>
      
      {/* Prediction Summary */}
      {direction && (
        <motion.div
          className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-slate-400 text-center text-sm block">
            You predicted: <span className="font-semibold text-white">{direction.charAt(0).toUpperCase() + direction.slice(1)}</span> | 
            <span className="font-semibold text-white"> {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps</span> | 
            Confidence: <span className="font-semibold text-white">{confidence}%</span>
          </span>
        </motion.div>
      )}
      
      <motion.div 
        className="flex items-center text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Info size={16} className="mr-2 text-blue-400 flex-shrink-0" />
        <span>Your responses will be scored based on accuracy and confidence level.</span>
      </motion.div>
      
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-2"
      >
        <Button 
          type="submit" 
          className={`w-full py-2 font-medium rounded-lg transition-all duration-300 shadow-lg text-base
            ${submitted 
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' 
              : direction === null
                ? 'bg-slate-700 text-slate-300 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white hover:shadow-sky-500/20 hover:shadow-xl'
            }`}
          disabled={submitted || direction === null}
        >
          {submitted ? (
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Submitted!
            </span>
          ) : (
            "Submit Your Prediction"
          )}
        </Button>
      </motion.div>
    </form>
  );
};

export default GameForm;
