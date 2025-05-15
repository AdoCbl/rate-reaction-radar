
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
};

export const DotPlotYear: React.FC<DotPlotYearProps> = ({
  year,
  value,
  onChange,
  minRate = 0.03, // Default min rate now 0.03 (3%)
  maxRate = 0.05, // Default max rate now 0.05 (5%)
  stepSize = 0.0025, // Default step size now 0.0025 (0.25%)
  sepMedian
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate number of steps based on min, max and step size
  const totalSteps = Math.floor((maxRate - minRate) / stepSize) + 1;
  
  // Calculate the height of each grid cell - reduced height for compactness
  const cellHeight = 20; // Reduced from 24 for more compact display
  const totalHeight = totalSteps * cellHeight;
  
  // Convert rate value to grid position (inverted since we draw from top to bottom)
  const valueToPosition = (rate: number | null): number => {
    if (rate === null) return -1;
    const steps = Math.round((maxRate - rate) / stepSize);
    return steps * cellHeight + cellHeight / 2;
  };
  
  // Convert grid position to rate value
  const positionToValue = (posY: number): number => {
    const steps = Math.round(posY / cellHeight);
    const rate = maxRate - (steps * stepSize);
    return Math.min(Math.max(rate, minRate), maxRate);
  };
  
  // Handle click on the grid
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posY = e.clientY - rect.top;
    onChange(positionToValue(posY));
  };
  
  // Format rate values as percentages
  const formatRateValue = (rate: number): string => {
    return `${(rate * 100).toFixed(2)}%`;
  };
  
  // Generate grid lines for the rate steps - now showing all labels for more explicit y-axis
  const renderGridLines = () => {
    return Array.from({ length: totalSteps }).map((_, index) => {
      const isFullUnit = (index * stepSize) % 0.01 === 0; // Show full label at each 1%
      const isHalfUnit = (index * stepSize) % 0.005 === 0; // Show smaller tick at each 0.5%
      const value = maxRate - (index * stepSize);
      
      return (
        <div 
          key={index}
          className={`absolute w-full border-t ${isFullUnit ? 'border-gray-700' : isHalfUnit ? 'border-gray-800' : 'border-gray-900'} flex items-center`}
          style={{ top: index * cellHeight }}
        >
          {/* Always show labels for more explicit y-axis */}
          <span className={`text-xs ${isFullUnit ? 'text-gray-400' : 'text-gray-600'} absolute -left-8`}>
            {isFullUnit || isHalfUnit ? formatRateValue(value) : ''}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-medium text-gray-300 mb-1">{year}</span>
      
      <div className="relative h-[320px] w-16 bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden">
        {/* Grid lines */}
        {renderGridLines()}
        
        {/* Interactive area for clicking/dragging */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleGridClick}
        />
        
        {/* SEP median dot (dimmed) */}
        {sepMedian !== null && (
          <motion.div
            className="absolute left-1/2 w-4 h-4 bg-purple-400/50 rounded-full"
            style={{ 
              top: valueToPosition(sepMedian), 
              x: '-50%', 
              y: '-50%' 
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        
        {/* User's dot marker */}
        {value !== null && (
          <motion.div
            className="absolute left-1/2 w-5 h-5 bg-sky-500 rounded-full shadow-lg shadow-sky-500/20 cursor-grab active:cursor-grabbing"
            style={{ 
              top: valueToPosition(value), 
              x: '-50%', 
              y: '-50%' 
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: isDragging ? '0 0 0 4px rgba(56, 189, 248, 0.3)' : '0 0 0 0px rgba(56, 189, 248, 0)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: totalHeight }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              // Calculate new value based on position
              const newValue = positionToValue(valueToPosition(value) + info.offset.y);
              onChange(newValue);
            }}
          />
        )}
      </div>
      
      {/* Show selected value below */}
      <div className="mt-1 h-5">
        {value !== null && (
          <motion.span 
            className="text-xs font-medium text-sky-400"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={value}
          >
            {formatRateValue(value)}
          </motion.span>
        )}
      </div>
    </div>
  );
};
