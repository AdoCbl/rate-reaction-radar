
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
    // Creating labels at 1% increments
    const labels = [];
    for (let rate = 0; rate <= 0.05; rate += 0.01) {
      labels.push(
        <div 
          key={rate} 
          className="text-xs text-slate-400 font-medium flex items-center justify-end"
          style={{ 
            position: 'absolute', 
            right: '4px', 
            top: `${(1 - rate / 0.05) * 100}%`,
            transform: 'translateY(-50%)',
            height: '1px', // Ensure label height aligns with grid lines
            width: '100%'
          }}
        >
          <span className="pr-1">{(rate * 100).toFixed(0)}%</span>
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
      <div className="flex items-center justify-between space-x-2 mb-2 text-sm">
        <span className="text-xs font-medium text-sky-400">Click to set your projections</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400">SEP Medians</span>
          <Switch 
            checked={showMedians}
            onCheckedChange={setShowMedians}
            className="data-[state=checked]:bg-indigo-600"
          />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-300 transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                <p>Federal Reserve Summary of Economic Projections (SEP) median values</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="bg-slate-800/60 p-2 rounded-md shadow-inner">
        <div className="flex relative h-[200px]">
          {/* Y-axis labels and grid lines container - positioned absolutely to span all years */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal grid lines - These will span across all columns */}
            {[0, 0.01, 0.02, 0.03, 0.04, 0.05].map(rate => (
              <div 
                key={rate}
                className="absolute w-full border-t border-slate-700"
                style={{ top: `${(1 - rate / 0.05) * 100}%` }}
              />
            ))}
            
            {/* Y-axis label container on the left */}
            <div className="absolute left-0 top-0 h-full w-8">
              {renderYAxisLabels()}
            </div>
          </div>
          
          {/* Year columns - start these after the y-axis labels */}
          <div className="pl-8 flex justify-between w-full">
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
      </div>
      
      <div className="flex justify-end mt-1">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-0.5 rounded-md hover:bg-slate-800/70"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
};
