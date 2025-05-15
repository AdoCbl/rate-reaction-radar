
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Get confidence text and color based on value
  const getConfidenceInfo = () => {
    if (value < 20) return { text: 'Very Low Confidence', color: 'text-rose-400', bgColor: 'bg-rose-900/30', borderColor: 'border-rose-700' };
    if (value < 40) return { text: 'Low Confidence', color: 'text-orange-400', bgColor: 'bg-orange-900/30', borderColor: 'border-orange-700' };
    if (value < 60) return { text: 'Moderate Confidence', color: 'text-yellow-400', bgColor: 'bg-yellow-900/30', borderColor: 'border-yellow-700' };
    if (value < 80) return { text: 'High Confidence', color: 'text-sky-400', bgColor: 'bg-sky-900/30', borderColor: 'border-sky-700' };
    return { text: 'Very High Confidence', color: 'text-emerald-400', bgColor: 'bg-emerald-900/30', borderColor: 'border-emerald-700' };
  };
  
  const confidenceInfo = getConfidenceInfo();
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-base font-medium text-slate-300">How confident are you in your prediction?</span>
        <motion.span 
          key={value}
          initial={{ opacity: 0, scale: 0.9, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`text-base font-semibold ${confidenceInfo.color} ${confidenceInfo.bgColor} px-3 py-1 rounded-md border ${confidenceInfo.borderColor} shadow-lg`}
          style={{
            boxShadow: isDragging ? `0 0 15px 3px rgba(255, 255, 255, 0.1)` : 'none'
          }}
        >
          {value}%
        </motion.span>
      </div>
      
      <div className="relative pt-1 pb-8">
        <Slider
          min={0}
          max={100}
          step={5}
          value={[value]}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onDrag={() => setIsDragging(true)}
          className="py-6"
        />
        
        {/* Slider Track Labels */}
        <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="flex justify-center"
          key={confidenceInfo.text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className={`${confidenceInfo.color} inline-block px-4 py-2 rounded-md ${confidenceInfo.bgColor} border ${confidenceInfo.borderColor} text-base font-medium`}
            whileHover={{ scale: 1.05 }}
            animate={{ 
              boxShadow: isDragging ? `0 0 10px 2px rgba(255, 255, 255, 0.1)` : 'none' 
            }}
          >
            {confidenceInfo.text}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
