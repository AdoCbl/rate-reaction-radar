
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
    if (value < 20) return 'text-rose-400 from-rose-500 to-rose-600';
    if (value < 40) return 'text-orange-400 from-orange-500 to-orange-600';
    if (value < 60) return 'text-yellow-400 from-yellow-500 to-yellow-600';
    if (value < 80) return 'text-sky-400 from-sky-500 to-sky-600';
    return 'text-emerald-400 from-emerald-500 to-emerald-600';
  };

  const getTrackBackground = () => {
    if (value < 20) return 'bg-rose-600/30';
    if (value < 40) return 'bg-orange-600/30';
    if (value < 60) return 'bg-yellow-600/30';
    if (value < 80) return 'bg-sky-600/30';
    return 'bg-emerald-600/30';
  };
  
  // Get color for the thumb
  const getThumbColor = () => {
    if (value < 20) return 'bg-gradient-to-br from-rose-500 to-rose-600 border-rose-400';
    if (value < 40) return 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400';
    if (value < 60) return 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-400';
    if (value < 80) return 'bg-gradient-to-br from-sky-500 to-sky-600 border-sky-400';
    return 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400';
  };
  
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-slate-300">Confidence</span>
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-base font-semibold ${getConfidenceColor()} px-2 py-0.5 rounded-full 
                     bg-gradient-to-br ${getThumbColor()} shadow-lg`}
          style={{
            boxShadow: isDragging ? `0 0 15px 3px rgba(255, 255, 255, 0.15)` : 'none'
          }}
        >
          {value}%
        </motion.div>
      </div>
      
      <div className="relative pt-1">
        <div className={`h-2 w-full rounded-full ${getTrackBackground()} absolute top-2`}></div>
        <Slider
          min={0}
          max={100}
          step={5}
          value={[value]}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onDrag={() => setIsDragging(true)}
          className="py-1"
        />
        
        {/* Simplified labels - just start and end */}
        <div className="flex justify-between text-xs text-slate-500 mt-0.5 px-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
