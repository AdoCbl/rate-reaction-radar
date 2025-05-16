
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MeetingDotPlotComparison } from '@/components/trends/MeetingDotPlotComparison';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  }
];

const HistoricalTrends: React.FC = () => {
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

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-auto pb-1">
        {currentMeetings.map((meeting, index) => (
          <motion.div 
            key={meeting.date.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <Card className="bg-slate-800/90 border border-slate-700 shadow-md h-full">
              <CardHeader className="p-3 pb-1">
                <h2 className="text-lg font-medium text-indigo-200">{meeting.title}</h2>
                <p className="text-xs text-slate-400">
                  Forecast submitted prior to: {formatMeetingDate(meeting.date)}
                </p>
              </CardHeader>
              <CardContent className="p-3">
                <div className="h-56">
                  <MeetingDotPlotComparison 
                    meetingDate={meeting.date} 
                    showFullFedDots={true} 
                    showRealizedRates={true}
                  />
                </div>
                
                <Separator className="my-2 bg-slate-700/50" />
                
                <div className="space-y-2">
                  <p className="text-xs text-slate-300 italic">
                    {meeting.summary}
                  </p>
                  
                  {/* Accuracy tag */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      <span className="font-medium mr-1 text-indigo-300">Accuracy:</span>
                      {Math.random() > 0.5 ? 
                        <span>Within 25bps (2025, 2026); Diverged &gt;50bps (2024)</span> :
                        <span>Diverged &gt;50bps across all projection years</span>
                      }
                    </div>
                    
                    <div className="text-xs text-slate-400">
                      Data: {new Date(meeting.date.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {month:'short',day:'numeric'})}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-4 mt-2 mb-1">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className={`p-1 rounded-full ${
              currentPage === 0 
                ? 'bg-slate-800/50 text-slate-600' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } transition-colors`}
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="text-xs text-slate-400">
            Page {currentPage + 1} of {pageCount}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === pageCount - 1}
            className={`p-1 rounded-full ${
              currentPage === pageCount - 1 
                ? 'bg-slate-800/50 text-slate-600' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } transition-colors`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoricalTrends;
