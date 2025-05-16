
import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';

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
  
  // Convert rate value to grid position (inverted since we draw from bottom to top)
  const valueToPosition = (rate: number | null): number => {
    if (rate === null) return -1;
    const percentage = (maxRate - rate) / (maxRate - minRate);
    return percentage * 100; // Return as percentage of container height
  };
  
  // Convert grid position to rate value
  const positionToValue = (posPercentage: number): number => {
    // Convert percentage to a rate value
    const rate = maxRate - ((posPercentage / 100) * (maxRate - minRate));
    
    // Snap to the nearest valid step
    const validSteps = Math.round(rate / stepSize);
    const validRate = validSteps * stepSize;
    
    // Clamp the value to ensure it's within range
    return Math.min(Math.max(validRate, minRate), maxRate);
  };
  
  // Handle click on the grid
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = e.clientY;
    const posY = clientY - rect.top;
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

  // Generate placeholder dots to hint at interactivity
  const renderPlaceholderDots = () => {
    if (value !== null) return null;
    
    const placeholders = [];
    const numDots = 5; // Number of placeholder dots
    
    for (let i = 1; i <= numDots; i++) {
      const position = 100 * i / (numDots + 1);
      const rateValue = positionToValue(position);
      
      // Only show placeholder dots at whole or half percentages
      const percentValue = rateValue * 100;
      if (percentValue % 0.5 !== 0) continue;
      
      placeholders.push(
        <motion.div
          key={`placeholder-${i}`}
          className="absolute left-1/2 w-3 h-3 rounded-full bg-slate-700/30 border border-slate-600/30"
          style={{ 
            top: `${position}%`,
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
    }
    
    return placeholders;
  };

  return (
    <div 
      className="flex flex-col items-center h-full"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <motion.span 
        className={`text-sm font-medium ${isHovered ? 'text-white' : 'text-slate-300'} mb-2 transition-colors`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {year}
      </motion.span>
      
      <motion.div 
        className="relative flex-1 w-full bg-transparent rounded-lg overflow-hidden cursor-pointer"
        animate={{ 
          backgroundColor: isHovered ? 'rgba(15, 23, 42, 0.9)' : undefined
        }}
        onClick={handleGridClick}
      >
        {/* Placeholder dots to suggest interactivity */}
        {renderPlaceholderDots()}
        
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
              boxShadow: isDragging ? '0 0 0 6px rgba(59, 130, 246, 0.2)' : '0 0 0 0px rgba(59, 130, 246, 0)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info: PanInfo) => {
              setIsDragging(false);
              const element = document.getElementById(`year-${year}`);
              const rect = element?.getBoundingClientRect();
              if (!rect) return;
              
              // Calculate position as percentage of parent height
              const offsetY = info.offset.y;
              const parentHeight = rect.height;
              const currentTop = valueToPosition(value);
              const newPosPercentage = currentTop + (offsetY / parentHeight * 100);
              
              // Calculate new value based on position
              const newValue = positionToValue(newPosPercentage);
              onChange(newValue);
            }}
          />
        )}
      </motion.div>
      
      {/* Value display with consistent height */}
      <div className="mt-2 h-6 flex items-center justify-center"> 
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
