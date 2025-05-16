
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

interface YieldEstimateInputProps {
  yieldEstimate: number;
  onYieldChange: (value: number) => void;
}

const YieldEstimateInput: React.FC<YieldEstimateInputProps> = ({ 
  yieldEstimate, 
  onYieldChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <div className="space-y-3">
      <label className="block text-base font-medium text-gray-200">
        How did the 2-year Treasury yield respond?
      </label>
      
      <div className="mt-5 relative">
        <motion.div
          className={cn(
            "absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-full font-bold text-lg border-2",
            yieldEstimate > 0 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : 
            yieldEstimate < 0 ? "bg-red-500/20 text-red-400 border-red-500" : 
            "bg-gray-500/20 text-gray-400 border-gray-500"
          )}
          animate={{
            x: `calc(${((yieldEstimate + 50) / 100) * 100}% - 50%)`,
            opacity: isDragging ? 1 : 0.9,
            scale: isDragging ? 1.1 : 1,
            boxShadow: isDragging ? '0 0 15px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
          }}
          key={yieldEstimate}
        >
          {yieldEstimate > 0 ? '+' : ''}{yieldEstimate} bps
        </motion.div>
        
        <div className="px-2">
          <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
            <span className="text-red-400">-50 bps</span>
            <span className="text-gray-400">0</span>
            <span className="text-emerald-400">+50 bps</span>
          </div>
          
          <div className="relative">
            {/* Colored track backgrounds */}
            <div className="absolute h-2 top-[10px] left-0 right-0 rounded-full overflow-hidden z-0">
              <div className="flex h-full w-full">
                <div className="bg-gradient-to-r from-red-600 to-red-500 h-full w-1/2"></div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full w-1/2"></div>
              </div>
            </div>
            
            {/* Center marker */}
            <div className="absolute h-5 w-0.5 bg-white/30 top-[7px] left-1/2 transform -translate-x-1/2 z-10"></div>
            
            <Slider
              min={-50}
              max={50}
              step={1}
              value={[yieldEstimate]}
              onValueChange={(value) => onYieldChange(value[0])}
              onValueCommit={() => setIsDragging(false)}
              className="mb-8 z-20"
              onPointerDown={() => setIsDragging(true)}
            />
          </div>
          
          {/* Tick marks */}
          <div className="grid grid-cols-11 gap-0 px-1 -mt-2">
            {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((tick) => (
              <div 
                key={tick} 
                className={cn(
                  "flex flex-col items-center",
                  tick === 0 ? "font-semibold" : ""
                )}
              >
                <div 
                  className={cn(
                    "h-1 w-0.5", 
                    tick === 0 ? "bg-white" : "bg-gray-500"
                  )}
                ></div>
                <span className="text-xs text-gray-500 mt-1">
                  {tick > 0 ? `+${tick}` : tick}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-2 text-center">
          <p className="text-sm text-gray-400">
            Drag slider to estimate how Treasury yields reacted to the Fed decision
          </p>
        </div>
      </div>
    </div>
  );
};

export default YieldEstimateInput;
