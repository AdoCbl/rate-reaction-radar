
import React, { useState } from 'react';
import { DotPlotYear } from './DotPlotYear';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { YearProjection } from './types';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

type DotPlotProjectionProps = {
  onChange: (projections: YearProjection[]) => void;
  values: YearProjection[];
};

export const DotPlotProjection: React.FC<DotPlotProjectionProps> = ({
  onChange,
  values
}) => {
  const isMobile = useIsMobile();
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
    const labels = [];
    for (let rate = 0; rate <= 0.05; rate += 0.01) {
      labels.push(
        <div 
          key={rate} 
          className="flex items-center justify-end"
          style={{ 
            position: 'absolute', 
            bottom: `${(rate / 0.05) * 100}%`,
            transform: 'translateY(50%)',
            left: 0,
            right: 0,
          }}
        >
          <span className="text-xs text-slate-400 font-medium pr-2">
            {(rate * 100).toFixed(0)}%
          </span>
          <div 
            className="absolute border-t border-slate-700/70"
            style={{
              left: '100%',
              right: '-100%',
              width: 'calc(100% + 15px)',
            }}
          />
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
        <span className="text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors">
          Click to set your projections
        </span>
        <div className="flex items-center gap-2 pr-2">
          <span className="text-sm text-slate-400">SEP Medians</span>
          <Switch 
            checked={showMedians}
            onCheckedChange={setShowMedians}
            className="data-[state=checked]:bg-indigo-600"
          />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                <p>Federal Reserve Summary of Economic Projections (SEP) median values</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className={`bg-slate-800/60 p-4 rounded-xl shadow-sm border border-slate-700/50 ${isMobile ? 'px-2' : 'px-4'}`}>
        {/* Main chart container with fixed height */}
        <div className="flex relative h-[180px]">
          {/* Fixed-width Y-axis column */}
          <div className="w-10 relative">
            {renderYAxisLabels()}
          </div>
          
          {/* Chart columns container */}
          <div className="grid grid-cols-4 gap-2 flex-1 relative">
            {/* Unified grid lines that span all columns */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={`grid-${index}`}
                  className="absolute w-full border-t border-slate-700/70"
                  style={{ bottom: `${index * 20}%` }}
                />
              ))}
            </div>
            
            {/* Year columns */}
            {values.map((yearData) => (
              <DotPlotYear
                key={yearData.year}
                year={yearData.year}
                value={yearData.value}
                onChange={(value) => handleYearChange(yearData.year, value)}
                minRate={0}
                maxRate={0.05}
                stepSize={0.00125}
                sepMedian={showMedians ? getMedianForYear(yearData.year) : null}
                isHovered={hoveredYear === yearData.year}
                onHover={(hovered) => setHoveredYear(hovered ? yearData.year : null)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-slate-800/70"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
};
