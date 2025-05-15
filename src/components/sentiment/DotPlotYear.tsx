
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type DotPlotYearProps = {
  year: string;
  value: number | null;
  onChange: (value: number) => void;
  minRate: number;
  maxRate: number;
  stepSize: number;
};

export const DotPlotYear: React.FC<DotPlotYearProps> = ({
  year,
  value,
  onChange,
  minRate = 0,
  maxRate = 7,
  stepSize = 0.25
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate number of steps based on min, max and step size
  const totalSteps = Math.floor((maxRate - minRate) / stepSize) + 1;
  
  // Calculate the height of each grid cell
  const cellHeight = 24;
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
  
  // Generate grid lines for the rate steps
  const renderGridLines = () => {
    return Array.from({ length: totalSteps }).map((_, index) => {
      const isFullUnit = (index * stepSize) % 1 === 0;
      const value = maxRate - (index * stepSize);
      
      return (
        <div 
          key={index}
          className={`absolute w-full border-t ${isFullUnit ? 'border-gray-700' : 'border-gray-800'} flex items-center`}
          style={{ top: index * cellHeight }}
        >
          {isFullUnit && (
            <span className="text-xs text-gray-500 absolute -left-7">
              {value.toFixed(value % 1 === 0 ? 0 : 2)}%
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-medium text-gray-300 mb-2">{year}</span>
      
      <div className="relative h-[400px] w-16 bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden">
        {/* Grid lines */}
        {renderGridLines()}
        
        {/* Interactive area for clicking/dragging */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleGridClick}
        />
        
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
      <div className="mt-2 h-7">
        {value !== null && (
          <motion.span 
            className="text-sm font-medium text-sky-400"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={value}
          >
            {value.toFixed(2)}%
          </motion.span>
        )}
      </div>
    </div>
  );
};
