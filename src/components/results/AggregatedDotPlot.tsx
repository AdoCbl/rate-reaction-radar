
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  
  // Fed SEP median values from the most recent projection - using realistic values
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-white">Client Rate Path Projections</h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">SEP</span>
          <Switch 
            checked={showSepMedians}
            onCheckedChange={setShowSepMedians}
          />
        </div>
      </div>
      
      <div className="flex-grow relative">
        <div className="flex justify-between h-[200px] mt-6 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
            {[5, 4, 3, 2, 1, 0].map((value) => (
              <div key={value} className="flex items-center">
                <span className="text-xs text-gray-500 w-8 text-right pr-2">
                  {value}%
                </span>
              </div>
            ))}
          </div>
          
          {/* Dot plots for each year */}
          <div className="flex justify-between w-full pl-10">
            {years.map((year) => (
              <div key={year} className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-300 mb-1">{year}</span>
                
                <div className="relative h-[200px] w-10 bg-gray-900/40 border border-gray-800 rounded-lg">
                  {/* Grid lines */}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const rate = 0.05 - (i * 0.0025);
                    const isFullPercent = Math.abs(Math.round(rate * 100) - rate * 100) < 0.01;
                    const isHalfPercent = Math.abs(Math.round(rate * 100 * 2) / 2 - rate * 100) < 0.01;
                    
                    return (
                      <div 
                        key={i}
                        className={`absolute w-full border-t ${
                          isFullPercent ? 'border-gray-700' : 
                          isHalfPercent ? 'border-gray-800' : 
                          'border-gray-900/30'
                        }`}
                        style={{ top: (i * 10) }}
                      />
                    );
                  })}
                  
                  {/* Client dots */}
                  {projections[year].map((value, index) => {
                    const top = Math.min(200, (value / 0.05) * 200); // Ensure it stays within bounds
                    const isUserDot = userProjections[year] === value;
                    const jitterX = isUserDot ? 0 : (index % 5) - 2; // Add some horizontal jitter
                    
                    return (
                      <motion.div
                        key={`${year}-${index}-${value}`}
                        className={`absolute rounded-full ${isUserDot ? 
                          'w-4 h-4 bg-sky-500 shadow-lg shadow-sky-500/50 z-10 pulse-glow' : 
                          'w-2 h-2 bg-blue-400/70'
                        }`}
                        style={{ 
                          left: `calc(50% + ${jitterX}px)`,
                          bottom: `${top}px`,
                          transform: 'translate(-50%, 50%)'
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
                  {showSepMedians && (
                    <motion.div
                      className="absolute w-8 h-0.5 bg-purple-400/70 left-1/2 transform -translate-x-1/2"
                      style={{ 
                        bottom: `${(sepMedians[year as keyof typeof sepMedians] / 0.05) * 200}px`
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      title={`SEP Median: ${formatRateValue(sepMedians[year as keyof typeof sepMedians])}`}
                    />
                  )}
                </div>
                
                {/* Year median value */}
                <div className="mt-1 text-center">
                  <span className="text-xs text-gray-400">
                    Median: {formatRateValue(medians[year])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info text */}
      <div className="h-8 mt-2">
        {showSepMedians && (
          <motion.div 
            className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded-md border border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Latest FOMC SEP median values shown in purple.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
