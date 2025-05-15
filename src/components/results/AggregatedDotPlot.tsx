
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

type AggregatedDotPlotProps = {
  projections: {
    [key: string]: number[];
  };
  userProjections: {
    [key: string]: number;
  };
  medians: {
    [key: string]: number;
  };
};

export const AggregatedDotPlot: React.FC<AggregatedDotPlotProps> = ({
  projections,
  userProjections,
  medians
}) => {
  const [showSepMedians, setShowSepMedians] = useState(false);
  const years = Object.keys(projections);
  
  // SEP median values - using realistic values
  const sepMedians = {
    '2025': 0.0425,
    '2026': 0.0375,
    '2027': 0.0325,
    'Long Run': 0.0250
  };

  // Format rate as percentage
  const formatRateValue = (rate: number): string => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  // Calculate position on the y-axis for rates
  // The visible range is 0% to 6% (0 to 0.06)
  const getPositionFromRate = (rate: number): number => {
    // Set the limits to ensure values stay within the chart boundaries
    const maxRate = 0.06; // 6%
    // Calculate position as a percentage of height (inverted since 0% is at the bottom)
    return 100 - Math.min(100, (rate / maxRate) * 100);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 tracking-tight">Client Rate Path Projections</h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">SEP</span>
          <Switch 
            checked={showSepMedians}
            onCheckedChange={setShowSepMedians}
          />
        </div>
      </div>
      
      <div className="flex-grow relative">
        <div className="flex justify-between h-[380px] mt-6 relative">
          {/* Y-axis labels - more detailed with 0.25% increments */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
            {[6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0].map((value) => (
              <div 
                key={value} 
                className="flex items-center"
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: `${getPositionFromRate(value / 100)}%`, 
                  transform: 'translateY(-50%)' 
                }}
              >
                <span className="text-xs text-slate-500 w-8 text-right pr-2">
                  {value}%
                </span>
                <div className="absolute w-full border-t border-slate-200 dark:border-slate-700" style={{left: '14px', width: 'calc(100vw - 28px)'}}></div>
              </div>
            ))}
          </div>
          
          {/* Dot plots for each year */}
          <div className="flex justify-between w-full pl-10 space-x-3">
            {years.map((year) => (
              <div key={year} className="flex flex-col items-center flex-1">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{year}</span>
                
                <div className="relative h-[380px] w-full max-w-16 bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  {/* Client dots */}
                  {projections[year].map((value, index) => {
                    const position = getPositionFromRate(value);
                    const isUserDot = Math.abs(userProjections[year] - value) < 0.0001;
                    const jitterX = isUserDot ? 0 : (index % 5) - 2; // Add some horizontal jitter
                    
                    return (
                      <motion.div
                        key={`${year}-${index}-${value}`}
                        className={`absolute rounded-full ${isUserDot ? 
                          'w-4 h-4 bg-indigo-500 shadow-lg shadow-indigo-500/30 z-10 pulse-glow' : 
                          'w-2 h-2 bg-sky-400/70'
                        }`}
                        style={{ 
                          left: `calc(50% + ${jitterX}px)`,
                          top: `${position}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: isUserDot ? 0.6 : 0.2 + (index * 0.05) 
                        }}
                        title={isUserDot ? `You: ${formatRateValue(value)}` : `Client: ${formatRateValue(value)}`}
                      />
                    );
                  })}
                  
                  {/* SEP median line */}
                  <AnimatePresence>
                    {showSepMedians && sepMedians[year as keyof typeof sepMedians] && (
                      <motion.div
                        className="absolute w-10 h-[1px] bg-indigo-400/50 left-1/2 transform -translate-x-1/2"
                        style={{ 
                          top: `${getPositionFromRate(sepMedians[year as keyof typeof sepMedians])}%`
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.7 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        title={`SEP Median: ${formatRateValue(sepMedians[year as keyof typeof sepMedians])}`}
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Year median value */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Median: {formatRateValue(medians[year])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info text */}
      <AnimatePresence>
        {showSepMedians && (
          <motion.div 
            className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/70 p-2 rounded-md border border-slate-200 dark:border-slate-700 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Latest FOMC SEP median values shown in purple.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
