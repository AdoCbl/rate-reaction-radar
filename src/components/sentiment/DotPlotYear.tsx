
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type DotPlotYearProps = {
  year: string;
  value: number | null;
  onChange: (value: number) => void;
  minRate: number;
  maxRate: number;
  stepSize: number;
  sepMedian: number | null;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
};

export const DotPlotYear: React.FC<DotPlotYearProps> = ({
  year,
  value,
  onChange,
  minRate = 0, // 0%
  maxRate = 0.05, // 5%
  stepSize = 0.00125, // 0.125%
  sepMedian,
  isHovered = false,
  onHover
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate number of steps based on min, max and step size
  const totalSteps = Math.floor((maxRate - minRate) / stepSize) + 1;
  
  // Calculate the height of each grid cell - reduced height for compactness
  const cellHeight = 5; // Further reduced for more compact display with 0.125% increments
  const totalHeight = totalSteps * cellHeight;
  
  // Convert rate value to grid position (inverted since we draw from top to bottom)
  const valueToPosition = (rate: number | null): number => {
    if (rate === null) return -1;
    // Calculate position as percentage of height (inverted)
    return (1 - (rate - minRate) / (maxRate - minRate)) * 100;
  };
  
  // Convert grid position (percentage) to rate value
  const positionToValue = (posPercentage: number): number => {
    // Convert from percentage position to rate value
    const rate = maxRate - ((posPercentage / 100) * (maxRate - minRate));
    
    // Validate the rate is exactly a multiple of 0.125% = 0.00125 in decimal
    const validSteps = Math.round(rate / stepSize);
    const validRate = validSteps * stepSize;
    
    // Clamp the value to ensure it's within range
    return Math.min(Math.max(validRate, minRate), maxRate);
  };
  
  // Handle click on the grid
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posY = e.clientY - rect.top;
    const posPercentage = (posY / rect.height) * 100;
    const newValue = positionToValue(posPercentage);
    
    // Add a small animation delay
    setTimeout(() => {
      onChange(newValue);
    }, 50);
  };
  
  // Format rate values as percentages
  const formatRateValue = (rate: number): string => {
    // Format to exactly 2 decimal places for display
    return `${(rate * 100).toFixed(2)}%`;
  };

  return (
    <div 
      className="flex flex-col items-center flex-1"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <motion.span 
        className={`text-base font-medium ${isHovered ? 'text-white' : 'text-slate-300'} mb-1 transition-colors`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {year}
      </motion.span>
      
      <motion.div 
        className="relative h-full w-full bg-slate-900/80 border border-slate-800 rounded-lg overflow-hidden transition-colors"
        animate={{ 
          borderColor: isHovered ? 'rgb(71 85 105)' : undefined,
          backgroundColor: isHovered ? 'rgba(15, 23, 42, 0.9)' : undefined
        }}
      >
        {/* Interactive area for clicking/dragging */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleGridClick}
        />
        
        {/* SEP median dot */}
        {sepMedian !== null && (
          <motion.div
            className="absolute left-1/2 w-3 h-3 bg-purple-400/70 ring-2 ring-purple-300/30 rounded-full"
            style={{ 
              top: `${valueToPosition(sepMedian)}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        
        {/* Placeholder dots to hint at interactivity */}
        {value === null && (
          <div className="absolute inset-0">
            {[1, 2, 3, 4].map((i) => {
              const rateValue = maxRate - (i * 0.01); // Place at whole percentage points
              return (
                <motion.div
                  key={`placeholder-${i}`}
                  className="absolute left-1/2 w-3 h-3 rounded-full bg-slate-700/30 border border-slate-600/30"
                  style={{
                    top: `${valueToPosition(rateValue)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    opacity: isHovered ? 0.8 : 0.3,
                    scale: isHovered ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* User's dot marker */}
        {value !== null && (
          <motion.div
            className="absolute left-1/2 w-5 h-5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/20 cursor-grab active:cursor-grabbing z-10"
            style={{ 
              top: `${valueToPosition(value)}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: isDragging ? '0 0 0 6px rgba(59, 130, 246, 0.2)' : '0 0 0 0px rgba(59,, 130, 246, 0)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag="y"
            dragConstraints={{ 
              top: 0, 
              bottom: 200 // Using a fixed pixel value for constraints
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              // Get current element and its position
              const element = info.target as HTMLElement;
              const rect = element.getBoundingClientRect();
              const parentRect = element.parentElement?.getBoundingClientRect();
              
              if (parentRect) {
                // Calculate the Y position as a percentage of the parent height
                const posY = (info.point.y - parentRect.top);
                const posPercentage = (posY / parentRect.height) * 100;
                // Calculate new value based on position percentage
                const newValue = positionToValue(posPercentage);
                onChange(newValue);
              }
            }}
          />
        )}
      </motion.div>
      
      {/* Show selected value below with more spacing to prevent overlap */}
      <div className="mt-2 h-6 text-center">
        {value !== null ? (
          <motion.span 
            className="text-sm font-medium text-blue-400 inline-block px-2 py-0.5 bg-blue-900/30 rounded border border-blue-800/50"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={value}
          >
            {formatRateValue(value)}
          </motion.span>
        ) : (
          <motion.span 
            className={`text-xs text-slate-500 ${isHovered ? 'text-slate-400' : ''} transition-colors`}
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          >
            Click to set
          </motion.span>
        )}
      </div>
    </div>
  );
};
