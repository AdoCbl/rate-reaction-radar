
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

type ConfidenceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Handle Slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  
  // Get confidence description
  const getConfidenceDescription = () => {
    if (value < 20) return 'Very Low';
    if (value < 40) return 'Low';
    if (value < 60) return 'Moderate';
    if (value < 80) return 'High';
    return 'Very High';
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
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-base font-medium text-white">Confidence Level</span>
          <Info 
            size={16} 
            className="ml-2 text-gray-400 cursor-pointer hover:text-sky-400 transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          
          {showTooltip && (
            <motion.div 
              className="absolute z-50 bg-gray-800 text-white text-xs p-2 rounded border border-gray-700 shadow-lg max-w-[250px] ml-6"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Higher confidence increases potential score for correct answers but penalizes incorrect ones more heavily.
            </motion.div>
          )}
        </div>
        
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-base font-semibold ${getConfidenceColor()} px-3 py-1 rounded-full 
                      bg-gradient-to-br ${getThumbColor()} shadow-lg flex items-center gap-2`}
          style={{
            boxShadow: isDragging ? `0 0 15px 3px rgba(255, 255, 255, 0.15)` : 'none'
          }}
        >
          {getConfidenceDescription()} 
          <span className="bg-black/30 px-2 py-0.5 rounded-full text-white text-sm">
            {value}%
          </span>
        </motion.div>
      </div>
      
      <div className="relative pt-1">
        {/* Gradient track background */}
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-600/30 via-yellow-600/30 to-emerald-600/30 absolute top-2"></div>
        
        <Slider
          min={0}
          max={100}
          step={5}
          value={[value]}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onDrag={() => setIsDragging(true)}
          onPointerDown={() => setIsDragging(true)}
          className="py-1"
        />
        
        {/* Confidence level markers */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <div className="text-center">
            <div className="h-1 w-0.5 bg-rose-500 mb-1 mx-auto"></div>
            <span>Very Low</span>
          </div>
          <div className="text-center">
            <div className="h-1 w-0.5 bg-orange-500 mb-1 mx-auto"></div>
            <span>Low</span>
          </div>
          <div className="text-center">
            <div className="h-1 w-0.5 bg-yellow-500 mb-1 mx-auto"></div>
            <span>Moderate</span>
          </div>
          <div className="text-center">
            <div className="h-1 w-0.5 bg-sky-500 mb-1 mx-auto"></div>
            <span>High</span>
          </div>
          <div className="text-center">
            <div className="h-1 w-0.5 bg-emerald-500 mb-1 mx-auto"></div>
            <span>Very High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
