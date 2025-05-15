
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';

type ConfidenceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle Slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  
  // Get confidence color based on value
  const getConfidenceColor = () => {
    if (value < 20) return 'text-rose-400';
    if (value < 40) return 'text-orange-400';
    if (value < 60) return 'text-yellow-400';
    if (value < 80) return 'text-sky-400';
    return 'text-emerald-400';
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-base font-medium text-slate-300">How confident are you in your prediction?</span>
        <motion.span 
          key={value}
          initial={{ opacity: 0, scale: 0.9, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`text-base font-semibold ${getConfidenceColor()} px-3 py-1 rounded-md border border-slate-700 shadow-lg`}
          style={{
            boxShadow: isDragging ? `0 0 15px 3px rgba(255, 255, 255, 0.1)` : 'none'
          }}
        >
          {value}%
        </motion.span>
      </div>
      
      <div className="relative pt-1 pb-2">
        <Slider
          min={0}
          max={100}
          step={5}
          value={[value]}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onDrag={() => setIsDragging(true)}
          className="py-3"
        />
        
        {/* Slider Track Labels */}
        <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
