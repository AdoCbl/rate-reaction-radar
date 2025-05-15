
import React, { useState, useEffect } from 'react';
import { DotPlotYear } from './DotPlotYear';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

type YearProjection = {
  year: string;
  value: number | null;
};

type DotPlotProjectionProps = {
  onChange: (projections: YearProjection[]) => void;
  values: YearProjection[];
};

export const DotPlotProjection: React.FC<DotPlotProjectionProps> = ({
  onChange,
  values
}) => {
  const [showMedians, setShowMedians] = useState(false);
  
  // Sample Fed SEP median values (to be replaced with actual data)
  const sepMedians = [
    { year: '2024', value: 4.75 },
    { year: '2025', value: 3.5 },
    { year: '2026', value: 3.0 },
    { year: 'Long Run', value: 2.5 }
  ];
  
  // Handle changing a single year's value
  const handleYearChange = (year: string, value: number) => {
    const newValues = values.map(item => 
      item.year === year ? { ...item, value } : item
    );
    onChange(newValues);
  };
  
  // Reset all projections
  const handleReset = () => {
    const resetValues = values.map(item => ({ ...item, value: null }));
    onChange(resetValues);
  };
  
  return (
    <motion.div 
      className="w-full space-y-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold text-white">Place your projection on the dot plot</h3>
        <p className="text-sm text-gray-400">Where do you think the Fed funds rate will be in the coming years?</p>
        
        <div className="flex items-center justify-end space-x-2 text-sm">
          <span className="text-gray-400">Show SEP medians</span>
          <Switch 
            checked={showMedians}
            onCheckedChange={setShowMedians}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 justify-between min-w-[400px]">
          {/* Left Y-axis labels are handled within each DotPlotYear component */}
          
          {/* Year columns */}
          {values.map((yearData) => (
            <DotPlotYear
              key={yearData.year}
              year={yearData.year}
              value={yearData.value}
              onChange={(value) => handleYearChange(yearData.year, value)}
              minRate={0}
              maxRate={7}
              stepSize={0.25}
            />
          ))}
        </div>
      </div>
      
      {/* SEP Median information (only shown when toggle is on) */}
      {showMedians && (
        <motion.div 
          className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-md border border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Latest FOMC Summary of Economic Projections (SEP) median values shown in light blue.</p>
        </motion.div>
      )}
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-800/50"
        >
          Reset Projections
        </button>
      </div>
    </motion.div>
  );
};
