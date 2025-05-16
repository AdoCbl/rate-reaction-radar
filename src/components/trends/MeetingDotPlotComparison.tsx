import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type MeetingDotPlotComparisonProps = {
  meetingDate: Date;
  showFullFedDots?: boolean;
  showRealizedRates?: boolean;
};

// Mock data structure for the client and Fed forecasts
// In a real app, this would come from an API or database
type ForecastData = {
  year: string;
  clientMedian: number;
  fedMedian: number;
  clientDots: number[]; // Individual client projections
  fedDots: number[]; // Individual Fed member projections
  realizedRate?: number; // Actual EFFR for past years
};

// Function to generate mock data based on the meeting date
const generateMockDataForMeeting = (meetingDate: Date): ForecastData[] => {
  // This would normally be fetched from an API
  // Here we're just generating sample data for demonstration
  
  // Generate a seed based on the meeting date for consistent "random" values
  const seed = meetingDate.getTime();
  const seedRandom = (min: number, max: number, offset = 0): number => {
    const x = Math.sin(seed + offset) * 10000;
    const rand = x - Math.floor(x);
    return min + rand * (max - min);
  };
  
  const years = ['2023', '2024', '2025', '2026', 'Long Run'];
  const currentYear = new Date().getFullYear();
  
  return years.map((year, i) => {
    // Base values that change based on the meeting date
    let baseClientMedian: number;
    let baseFedMedian: number;
    
    // Adjust expectations based on meeting date
    if (meetingDate.getTime() > new Date('2024-01-01').getTime()) {
      // More recent meetings have lower rate expectations
      baseClientMedian = 0.035 - (i * 0.0025);
      baseFedMedian = 0.0375 - (i * 0.0025);
    } else {
      // Earlier meetings had higher rate expectations
      baseClientMedian = 0.045 - (i * 0.0025);
      baseFedMedian = 0.0475 - (i * 0.0025);
    }
    
    // Add some variation based on the meeting date
    const clientMedian = Math.max(0.02, Math.min(0.055, baseClientMedian + seedRandom(-0.005, 0.005, i * 10)));
    const fedMedian = Math.max(0.02, Math.min(0.055, baseFedMedian + seedRandom(-0.0025, 0.0025, i * 20)));
    
    // Generate individual client dots clustered around the median
    const clientDots = Array.from({ length: 8 + Math.floor(seedRandom(3, 8, i * 30)) }, (_, j) => {
      return Math.max(0.02, Math.min(0.055, clientMedian + seedRandom(-0.0075, 0.0075, i * 40 + j)));
    });
    
    // Generate individual Fed dots (fewer, more clustered)
    const fedDots = Array.from({ length: 12 }, (_, j) => {
      return Math.max(0.02, Math.min(0.055, fedMedian + seedRandom(-0.005, 0.005, i * 50 + j)));
    });
    
    // For years in the past, add a realized rate
    const yearNum = year === 'Long Run' ? 9999 : parseInt(year);
    let realizedRate: number | undefined = undefined;
    
    if (yearNum < currentYear) {
      // Past year, so add a realized rate
      // This would normally come from historical data
      realizedRate = Math.max(0.02, Math.min(0.055, fedMedian + seedRandom(-0.0025, 0.0025, i * 60)));
    }
    
    return {
      year,
      clientMedian,
      fedMedian,
      clientDots,
      fedDots,
      realizedRate,
    };
  }).filter(data => {
    // Filter out years that are before the meeting date's year
    // except keep Long Run
    if (data.year === 'Long Run') return true;
    const yearNum = parseInt(data.year);
    const meetingYear = meetingDate.getFullYear();
    return yearNum >= meetingYear;
  });
};

export const MeetingDotPlotComparison: React.FC<MeetingDotPlotComparisonProps> = ({ 
  meetingDate,
  showFullFedDots = false,
  showRealizedRates = false
}) => {
  const forecastData = generateMockDataForMeeting(meetingDate);
  const currentYear = new Date().getFullYear();
  
  // Format rate as percentage
  const formatRateValue = (rate: number): string => {
    return `${(rate * 100).toFixed(2)}%`;
  };
  
  // Generate y-axis labels
  const renderYAxisLabels = () => {
    const labels = [];
    for (let rate = 0; rate <= 0.06; rate += 0.01) {
      labels.push(
        <div 
          key={rate} 
          className="absolute left-0 text-xs text-slate-400"
          style={{ 
            bottom: `${(rate / 0.06) * 100}%`, 
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
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-sky-400"></div>
          <span className="text-xs text-slate-300">Client Projections</span>
        </div>
        <div className="flex items-center gap-1.5 ml-4">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <span className="text-xs text-slate-300">Fed SEP Projections</span>
        </div>
        {showRealizedRates && (
          <div className="flex items-center gap-1.5 ml-4">
            <div className="w-4 h-0.5 bg-gray-400"></div>
            <span className="text-xs text-slate-300">Realized EFFR</span>
          </div>
        )}
      </div>

      <div className="h-[300px] relative bg-slate-900/40 rounded-lg border border-slate-700 p-4">
        {/* Y-axis labels */}
        <div className="absolute left-2 top-0 bottom-0 w-6 flex flex-col justify-between">
          {renderYAxisLabels()}
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-8 right-4 top-0 bottom-0 pointer-events-none">
          {[0, 1, 2, 3, 4, 5, 6].map((value) => (
            <div 
              key={value} 
              className="absolute left-0 right-0 border-t border-slate-700"
              style={{ 
                bottom: `${(value / 6) * 100}%`, 
              }}
            />
          ))}
        </div>

        {/* Overlay view - Both client and Fed dots on the same chart */}
        <div className="flex justify-around h-full pl-8">
          {forecastData.map((data, idx) => (
            <div key={data.year} className="relative flex flex-col items-center justify-between flex-1">
              <div className="text-sm font-medium text-slate-300 mb-2">{data.year}</div>
              
              <div className="relative w-full h-full">
                {/* Fed dots (if enabled) */}
                {showFullFedDots && data.fedDots.map((dot, i) => {
                  // Add horizontal jitter and slight vertical jitter for Fed dots
                  const jitterX = ((i % 4) - 1.5) * 5; 
                  const jitterY = ((i % 3) - 1) * 2;
                  
                  return (
                    <TooltipProvider key={`fed-${i}`}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 border border-purple-300"
                            style={{ 
                              left: `calc(50% + ${jitterX}px)`,
                              bottom: `calc(${(dot / 0.06) * 100}% - 3px + ${jitterY}px)`,
                              opacity: 0.6,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.03) }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                          Fed projection ({data.year}): {formatRateValue(dot)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
                
                {/* Client dots */}
                {data.clientDots.map((dot, i) => {
                  // Add horizontal jitter (centered around the middle)
                  const jitterX = ((i % 5) - 2) * 4; 
                  
                  return (
                    <TooltipProvider key={`client-${i}`}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="absolute w-2.5 h-2.5 rounded-full bg-sky-400"
                            style={{ 
                              left: `calc(50% + ${jitterX}px)`,
                              bottom: `calc(${(dot / 0.06) * 100}% - 3px)`
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.03) }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                          Client projection ({data.year}): {formatRateValue(dot)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
                
                {/* Client median */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div 
                        className="absolute left-1/2 w-10 h-1 bg-sky-400"
                        style={{ 
                          bottom: `calc(${(data.clientMedian / 0.06) * 100}% - 2px)`,
                          transform: 'translateX(-50%)',
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 0.9, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                      Client median ({data.year}): {formatRateValue(data.clientMedian)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Fed median */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div 
                        className="absolute left-1/2 w-12 h-1 bg-purple-500"
                        style={{ 
                          bottom: `calc(${(data.fedMedian / 0.06) * 100}% - 2px)`,
                          transform: 'translateX(-50%)',
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white text-xs">
                      Fed SEP median ({data.year}): {formatRateValue(data.fedMedian)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Realized EFFR for past years */}
                {showRealizedRates && data.realizedRate && parseInt(data.year) < currentYear && (
                  <>
                    <motion.div 
                      className="absolute left-0 right-0 h-0.5 bg-gray-400 z-10"
                      style={{ 
                        bottom: `calc(${(data.realizedRate / 0.06) * 100}%)`,
                        opacity: 0.8,
                      }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 0.8, scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="absolute right-0 px-1 py-0.5 bg-gray-700 rounded-sm text-[10px] text-gray-300"
                            style={{ 
                              bottom: `calc(${(data.realizedRate / 0.06) * 100}% + 2px)`,
                              transform: 'translateY(50%)',
                            }}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                          >
                            {formatRateValue(data.realizedRate)}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="bg-slate-800 border-slate-700 text-white text-xs">
                          Realized EFFR ({data.year}): {formatRateValue(data.realizedRate)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )}
                
                {/* Divergence highlight if difference is > 50 bps */}
                {Math.abs(data.clientMedian - data.fedMedian) > 0.005 && (
                  <motion.div 
                    className={`absolute left-1/2 w-3 h-3 rounded-full border-2 ${
                      data.clientMedian > data.fedMedian 
                        ? 'border-red-500/70' 
                        : 'border-green-500/70'
                    }`}
                    style={{ 
                      bottom: `calc(${(data.clientMedian / 0.06) * 100}% - 3px)`,
                      transform: 'translateX(-50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-between text-xs text-slate-400">
        <div>
          <span className="text-sky-400 font-medium">Client Accuracy: </span>
          {forecastData.some(d => Math.abs(d.clientMedian - d.fedMedian) > 0.005) ? 
            "Diverged > 50 bps on some projections" : 
            "Within 50 bps of Fed projections"
          }
        </div>
        <div>
          <span className="text-purple-400 font-medium">Data collected: </span>
          {new Date(meetingDate.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
