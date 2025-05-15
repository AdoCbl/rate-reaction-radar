
import React, { useState } from 'react';
import { DotPlotYear } from './DotPlotYear';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { YearProjection } from './types';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type DotPlotProjectionProps = {
  onChange: (projections: YearProjection[]) => void;
  values: YearProjection[];
};

export const DotPlotProjection: React.FC<DotPlotProjectionProps> = ({
  onChange,
  values
}) => {
  const [showMedians, setShowMedians] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  
  // Fed SEP median values from the most recent projection
  const sepMedians = [
    { year: '2025', value: 0.0425 },
    { year: '2026', value: 0.0375 },
    { year: '2027', value: 0.0350 },
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
          className={`text-xs ${rate % 0.02 === 0 ? 'text-slate-300 font-medium' : 'text-slate-500'}`}
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
      className="w-full" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">Rate Projections</h3>
          <p className="text-slate-400 text-sm">Click on each column to place your forecast</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-400">SEP Medians</span>
          <Switch 
            checked={showMedians}
            onCheckedChange={setShowMedians}
            className="data-[state=checked]:bg-indigo-600"
          />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-slate-400 hover:text-slate-300 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                <p className="max-w-xs">Federal Reserve Summary of Economic Projections (SEP) median values</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
        <div className="flex space-x-2 justify-between relative">
          {/* Y-axis labels column */}
          <div className="flex flex-col justify-between h-[200px] pr-2 w-8 relative">
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
              stepSize={0.00125} // 0.125%
              sepMedian={showMedians ? getMedianForYear(yearData.year) : null}
              isHovered={hoveredYear === yearData.year}
              onHover={(hovered) => setHoveredYear(hovered ? yearData.year : null)}
            />
          ))}
        </div>
      </div>
      
      {/* Container with fixed height to prevent layout shifts */}
      <div className="h-8 mt-2">
        <AnimatePresence>
          {showMedians && (
            <motion.div 
              className="text-sm text-slate-400 bg-slate-800/70 p-2 rounded-md border border-slate-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p>FOMC SEP median values shown in light purple</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-slate-800/70 border border-transparent hover:border-slate-700"
        >
          Reset projections
        </button>
      </div>
    </motion.div>
  );
};
