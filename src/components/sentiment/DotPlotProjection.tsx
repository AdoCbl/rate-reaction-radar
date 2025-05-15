
import React, { useState } from 'react';
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
  
  // Fed SEP median values from the most recent projection
  const sepMedians = [
    { year: '2024', value: 0.0425 },
    { year: '2025', value: 0.0375 },
    { year: '2026', value: 0.0350 },
    { year: 'Long Run', value: 0.0325 }
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
  
  // Get median for a specific year
  const getMedianForYear = (year: string) => {
    const median = sepMedians.find(item => item.year === year);
    return median ? median.value : null;
  };
  
  // Generate y-axis labels for the interest rate range (0-5%)
  const renderYAxisLabels = () => {
    // Creating labels at 1% intervals
    const labels = [];
    for (let rate = 0; rate <= 0.05; rate += 0.01) {
      labels.push(
        <div 
          key={rate} 
          className="text-xs text-gray-400" 
          style={{ 
            position: 'absolute', 
            right: '8px', 
            bottom: `${(rate / 0.05) * 100}%`,
            transform: 'translateY(50%)'
          }}
        >
          {(rate * 100).toFixed(0)}%
        </div>
      );
    }
    return labels;
  };
  
  return (
    <motion.div 
      className="w-full space-y-3" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Rate Projections</h3>
          <p className="text-sm text-gray-400">Forecast future interest rates</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">SEP medians</span>
          <Switch 
            checked={showMedians}
            onCheckedChange={setShowMedians}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex space-x-1 justify-between relative">
          {/* Y-axis labels column */}
          <div className="flex flex-col justify-between h-[200px] pr-2 w-10 relative">
            {renderYAxisLabels()}
          </div>
          
          {values.map((yearData) => (
            <DotPlotYear
              key={yearData.year}
              year={yearData.year}
              value={yearData.value}
              onChange={(value) => handleYearChange(yearData.year, value)}
              minRate={0} // 0%
              maxRate={0.05} // 5%
              stepSize={0.0025} // 0.25%
              sepMedian={showMedians ? getMedianForYear(yearData.year) : null}
            />
          ))}
        </div>
      </div>
      
      {/* SEP Median information (only shown when toggle is on) */}
      {showMedians && (
        <motion.div 
          className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded-md border border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Latest FOMC SEP median values shown in light blue.</p>
        </motion.div>
      )}
      
      <div className="flex justify-end mt-1">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-gray-800/50"
        >
          Reset Projections
        </button>
      </div>
    </motion.div>
  );
};
