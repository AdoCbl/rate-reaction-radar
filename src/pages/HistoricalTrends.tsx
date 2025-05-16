
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  },
  { 
    date: new Date('2023-09-20'),
    title: 'September 2023 FOMC Meeting',
    summary: 'Clients correctly forecasted the hold decision but underestimated the hawkish dot plot revisions.'
  },
  { 
    date: new Date('2023-06-14'),
    title: 'June 2023 FOMC Meeting',
    summary: 'Client projections were more dovish than the Fed\'s outlook, particularly for 2023-2024.'
  },
  {
    date: new Date('2023-03-22'),
    title: 'March 2023 FOMC Meeting',
    summary: 'Clients anticipated a more aggressive hiking path than the Fed projected, especially for 2023 and 2024.'
  },
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
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-indigo-300">Forecast Accuracy: Client Projections vs Fed Dot Plots</h1>
        <p className="text-slate-400 mt-2">
          Compare how client forecasts aligned with the actual FOMC SEP medians across previous meetings.
        </p>
      </motion.div>

      {/* Meeting Dot Plot Comparisons */}
      <div className="space-y-10">
        {currentMeetings.map((meeting, index) => (
          <motion.div 
            key={meeting.date.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-slate-800/90 border border-slate-700 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-indigo-200">{meeting.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  Forecast submitted prior to: {formatMeetingDate(meeting.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MeetingDotPlotComparison 
                  meetingDate={meeting.date} 
                  showFullFedDots={true} 
                  showRealizedRates={true}
                />
                
                <Separator className="my-4 bg-slate-700/50" />
                
                <p className="text-sm text-slate-300 italic">
                  {meeting.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${
              currentPage === 0 
                ? 'bg-slate-800/50 text-slate-600' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } transition-colors`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-slate-400">
            Page {currentPage + 1} of {pageCount}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === pageCount - 1}
            className={`p-2 rounded-full ${
              currentPage === pageCount - 1 
                ? 'bg-slate-800/50 text-slate-600' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } transition-colors`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoricalTrends;
