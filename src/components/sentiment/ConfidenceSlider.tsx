
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';

type ConfidenceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange }) => {
  // Handle Slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  
  // Get confidence text and color based on value
  const getConfidenceInfo = () => {
    if (value < 20) return { text: 'Very Low Confidence', color: 'text-red-400' };
    if (value < 40) return { text: 'Low Confidence', color: 'text-orange-400' };
    if (value < 60) return { text: 'Moderate Confidence', color: 'text-yellow-400' };
    if (value < 80) return { text: 'High Confidence', color: 'text-sky-400' };
    return { text: 'Very High Confidence', color: 'text-emerald-400' };
  };
  
  const confidenceInfo = getConfidenceInfo();
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">How confident are you in your prediction?</span>
        <motion.span 
          key={value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-semibold bg-gray-800 text-white px-2.5 py-1 rounded-md"
        >
          {value}%
        </motion.span>
      </div>
      
      <Slider
        min={0}
        max={100}
        step={5}
        value={[value]}
        onValueChange={handleSliderChange}
        className="py-6"
      />
      
      <div className="text-center">
        <motion.span 
          className={`text-sm font-medium ${confidenceInfo.color} inline-block px-3 py-1 rounded-full bg-gray-800/50`}
          key={value}
          initial={{ opacity: 0.5, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {confidenceInfo.text}
        </motion.span>
      </div>
    </div>
  );
};
