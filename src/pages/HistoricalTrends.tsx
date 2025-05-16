
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MeetingDotPlotComparison } from '@/components/trends/MeetingDotPlotComparison';
import { ChevronUp, ChevronDown, CircleDot, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ForecastAccuracyChart } from '@/components/trends/ForecastAccuracyChart';
import { useIsMobile } from '@/hooks/use-mobile';

// FOMC meetings with SEP releases (most recent first)
const fomcMeetings = [
  { 
    date: new Date('2024-03-20'),
    title: 'March 2024 FOMC Meeting',
    summary: 'Client projections closely anticipated the Fed\'s long-run path but overestimated the pace of rate cuts in 2024.'
  },
  { 
    date: new Date('2023-12-13'),
    title: 'December 2023 FOMC Meeting',
    summary: 'Client projections underestimated the Fed\'s pivot to a more dovish tone for 2024-2025.'
  },
  {
    date: new Date('2023-09-20'),
    title: 'September 2023 FOMC Meeting',
    summary: 'Client projections aligned with the Fed\'s expectation for rate stability through year-end, but projected a faster easing cycle in 2024.'
  },
  {
    date: new Date('2023-06-14'),
    title: 'June 2023 FOMC Meeting',
    summary: 'Client projections expected a more hawkish stance than the Fed delivered, particularly for long-run neutral rates.'
  }
];

const HistoricalTrends: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const meetingsPerPage = 2; // Number of meetings to show per page
  const pageCount = Math.ceil(fomcMeetings.length / meetingsPerPage);
  
  // Get current meetings
  const currentMeetings = fomcMeetings.slice(
    currentPage * meetingsPerPage,
    (currentPage + 1) * meetingsPerPage
  );
  
  // Change page
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };
  
  // Format date
  const formatMeetingDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Format data collection date (7 days before meeting)
  const formatDataCollectionDate = (date: Date): string => {
    const collectionDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(collectionDate);
  };

  return (
    <div className="flex flex-col max-w-full py-2">
      {/* Fixed legend at the top */}
      <Card className="bg-slate-800/90 border border-slate-700 mb-6 p-4">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-indigo-300 mr-auto`}>Forecast Accuracy</h2>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-400"></div>
              <span className="text-sm text-slate-300">Client Projections</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-sm text-slate-300">Fed SEP Projections</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-400"></div>
              <span className="text-sm text-slate-300">Realized EFFR</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Meeting cards */}
      <div className="flex flex-col gap-6">
        {currentMeetings.map((meeting, index) => (
          <motion.div 
            key={meeting.date.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <Card className="bg-slate-800/90 border border-slate-700 shadow-sm">
              <div className="p-4">
                {/* Card header */}
                <div className="mb-3">
                  <h3 className="text-base font-bold text-white">{meeting.title}</h3>
                  <p className="text-sm text-slate-400">
                    Forecast submitted prior to: {formatMeetingDate(meeting.date)}
                  </p>
                </div>
                
                {/* Chart area with fixed height */}
                <div className="h-[300px]">
                  <MeetingDotPlotComparison 
                    meetingDate={meeting.date} 
                    showFullFedDots={true} 
                    showRealizedRates={true}
                  />
                </div>
                
                <Separator className="my-3 bg-slate-700/50" />
                
                {/* Card footer */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-300 italic">
                    {meeting.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                      <span className="font-medium mr-1 text-indigo-300">Accuracy:</span>
                      {Math.random() > 0.5 ? 
                        <span>Within 25bps (2025, 2026); Diverged &gt;50bps (2024)</span> :
                        <span>Diverged &gt;50bps across all projection years</span>
                      }
                    </div>
                    
                    <div className="text-xs text-slate-400">
                      Data: {formatDataCollectionDate(meeting.date)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination with feedback on current position */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center mt-6 mb-2 px-2">
          <span className="text-sm text-slate-400">
            Page {currentPage + 1} of {pageCount}
          </span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0 
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              } transition-colors`}
              aria-label="Previous page"
            >
              <ChevronUp size={18} />
            </button>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === pageCount - 1}
              className={`p-2 rounded-full ${
                currentPage === pageCount - 1 
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              } transition-colors`}
              aria-label="Next page"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalTrends;
