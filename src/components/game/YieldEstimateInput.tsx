
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface YieldEstimateInputProps {
  yieldEstimate: number;
  onYieldChange: (value: number) => void;
}

const YieldEstimateInput: React.FC<YieldEstimateInputProps> = ({ 
  yieldEstimate, 
  onYieldChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-0.5">      
      <div className="relative">
        <motion.div
          className={cn(
            "absolute -top-5 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-semibold",
            "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
          )}
          animate={{
            x: `calc(${((yieldEstimate + 50) / 100) * 100}% - 50%)`,
            opacity: isDragging ? 1 : 0.9,
            scale: isDragging ? 1.1 : 1
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
        
        <div className="px-1">
          <div className="relative">
            {/* Center marker */}
            <div className="absolute h-3 w-0.5 bg-white/30 top-[6px] left-1/2 transform -translate-x-1/2 z-10"></div>
            
            <Slider
              min={-50}
              max={50}
              step={1}
              value={[yieldEstimate]}
              onValueChange={(value) => onYieldChange(value[0])}
              onValueCommit={() => setIsDragging(false)}
              className="mb-1 z-20"
              onPointerDown={() => setIsDragging(true)}
            />
          </div>
          
          {/* Tick marks - more compact */}
          <div className="grid grid-cols-11 gap-0 px-1 -mt-1">
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
                    tick === 0 ? "bg-white" : "bg-slate-500"
                  )}
                ></div>
                <span className={`${isMobile ? 'text-[8px]' : 'text-[9px]'} text-slate-400`}>
                  {tick > 0 ? `+${tick}` : tick}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldEstimateInput;
