
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface YieldEstimateInputProps {
  yieldEstimate: number;
  onYieldChange: (value: number) => void;
}

const YieldEstimateInput: React.FC<YieldEstimateInputProps> = ({ 
  yieldEstimate, 
  onYieldChange 
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        How did the 2-year Treasury yield respond? (basis points)
      </label>
      <div className="px-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>-50 bps</span>
          <span>0</span>
          <span>+50 bps</span>
        </div>
        <Slider
          min={-50}
          max={50}
          step={1}
          value={[yieldEstimate]}
          onValueChange={(value) => onYieldChange(value[0])}
          className="mb-4"
        />
        <div className="text-center">
          <motion.span 
            className={cn(
              "font-medium text-lg",
              yieldEstimate > 0 ? "text-emerald-400" : 
              yieldEstimate < 0 ? "text-red-400" : 
              "text-gray-400"
            )}
            key={yieldEstimate}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {yieldEstimate > 0 ? '+' : ''}
            {yieldEstimate} bps
          </motion.span>
        </div>
      </div>
      <Separator className="bg-gray-800" />
    </div>
  );
};

export default YieldEstimateInput;
