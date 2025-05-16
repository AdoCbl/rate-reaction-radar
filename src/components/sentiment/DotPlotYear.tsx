
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
    const steps = Math.round((maxRate - rate) / stepSize);
    return steps * cellHeight + cellHeight / 2;
  };
  
  // Convert grid position to rate value, ensuring it's exactly a multiple of 0.00125 (0.125%)
  const positionToValue = (posY: number): number => {
    const steps = Math.round(posY / cellHeight);
    
    // Calculate raw rate value based on steps
    const rate = maxRate - (steps * stepSize);
    
    // Validate the rate is exactly a multiple of 0.125%
    // Fixed increments of 0.125% = 0.00125 in decimal
    // We'll calculate this by determining how many 0.125% steps fit in the value
    
    // Get the number of 0.125% increments (round to nearest to enforce proper spacing)
    const validSteps = Math.round(rate / 0.00125);
    
    // Convert back to proper decimal rate with exact precision
    const validRate = validSteps * 0.00125;
    
    // Clamp the value to ensure it's within range
    return Math.min(Math.max(validRate, minRate), maxRate);
  };
  
  // Handle click on the grid
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posY = e.clientY - rect.top;
    const newValue = positionToValue(posY);
    
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
  
  // Generate grid lines for the rate steps with emphasis on full percentage points
  const renderGridLines = () => {
    return Array.from({ length: totalSteps }).map((_, index) => {
      const value = maxRate - (index * stepSize);
      const isFullPercent = Math.abs(Math.round(value * 100) - value * 100) < 0.01;
      const isHalfPercent = Math.abs(Math.round(value * 100 * 2) / 2 - value * 100) < 0.01;
      const isQuarterPercent = Math.abs(Math.round(value * 100 * 4) / 4 - value * 100) < 0.01;
      
      // Only render lines that matter for clarity
      if (!isFullPercent && !isHalfPercent && !isQuarterPercent && index % 4 !== 0) {
        return null;
      }
      
      return (
        <motion.div 
          key={index}
          className={`absolute w-full border-t ${
            isFullPercent 
              ? 'border-slate-600' 
              : isHalfPercent 
                ? 'border-slate-700' 
                : 'border-slate-800'
          } flex items-center`}
          animate={{
            borderColor: isHovered
              ? isFullPercent 
                ? 'rgb(100 116 139)' // slate-500
                : isHalfPercent 
                  ? 'rgb(71 85 105)' // slate-600
                  : 'rgb(51 65 85)' // slate-700
              : undefined
          }}
          style={{ top: index * cellHeight }}
        />
      );
    }).filter(Boolean);
  };

  // Generate placeholder dots to hint at interactivity
  const renderPlaceholderDots = () => {
    if (value !== null) return null;
    
    const placeholders = [];
    const numDots = 5; // Number of placeholder dots
    const interval = totalHeight / (numDots + 1);
    
    for (let i = 1; i <= numDots; i++) {
      const position = interval * i;
      const rateValue = positionToValue(position);
      
      // Only show placeholder dots at whole or half percentages
      const percentValue = rateValue * 100;
      if (percentValue % 0.5 !== 0) continue;
      
      placeholders.push(
        <motion.div
          key={`placeholder-${i}`}
          className="absolute left-1/2 w-3 h-3 rounded-full bg-slate-700/30 border border-slate-600/30"
          style={{ 
            top: position,
            x: '-50%', 
            y: '-50%' 
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
      className="flex flex-col items-center justify-between w-full"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <motion.span 
        className={`text-sm font-medium ${isHovered ? 'text-white' : 'text-slate-300'} mb-3 transition-colors`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {year}
      </motion.span>
      
      <motion.div 
        className="relative h-[180px] w-full bg-slate-900/80 border border-slate-800 rounded-lg overflow-hidden transition-colors"
        animate={{ 
          borderColor: isHovered ? 'rgb(71 85 105)' : undefined,
          backgroundColor: isHovered ? 'rgba(15, 23, 42, 0.9)' : undefined
        }}
      >
        {/* Grid lines */}
        {renderGridLines()}
        
        {/* Placeholder dots to suggest interactivity */}
        {renderPlaceholderDots()}
        
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
              top: valueToPosition(sepMedian), 
              x: '-50%', 
              y: '-50%' 
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
              top: valueToPosition(value), 
              x: '-50%', 
              y: '-50%' 
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: isDragging ? '0 0 0 6px rgba(59, 130, 246, 0.2)' : '0 0 0 0px rgba(59,, 130, 246, 0)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: totalHeight }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              // Calculate new value based on position, ensuring it's a multiple of 0.125%
              const newValue = positionToValue(valueToPosition(value) + info.offset.y);
              onChange(newValue);
            }}
          />
        )}
      </motion.div>
      
      {/* Show selected value below with more spacing to prevent overlap */}
      <div className="mt-3 h-6 text-center"> {/* Increased spacing */}
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
