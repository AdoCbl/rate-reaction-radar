
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Direction, YearProjection } from '@/components/sentiment/types';
import { FomcOutlookSection } from '@/components/sentiment/FomcOutlookSection';
import { CommentSection } from '@/components/sentiment/CommentSection';
import { SubmitButton } from '@/components/sentiment/SubmitButton';
import { ProjectionChart } from '@/components/sentiment/ProjectionChart';

const Dashboard: React.FC = () => {
  // Current Fed Funds rate
  const currentRate = 5.33;
  const nextMeetingDate = "June 12, 2024";
  
  // State for the form
  const [direction, setDirection] = useState<Direction | null>(null);
  const [confidence, setConfidence] = useState<number>(50);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // State for dot plot projections
  const [projections, setProjections] = useState<YearProjection[]>([
    { year: '2025', value: null },
    { year: '2026', value: null },
    { year: '2027', value: null },
    { year: 'Long Run', value: null }
  ]);

  // Handle direction button click
  const handleDirectionClick = (newDirection: Direction) => {
    setDirection(newDirection);
    toast.success(`FOMC outlook set to: ${newDirection.charAt(0).toUpperCase() + newDirection.slice(1)}`, {
      duration: 2000,
    });
  };

  // Update a specific projection
  const updateProjection = (year: string, value: number) => {
    setProjections(prev => prev.map(item => 
      item.year === year ? { ...item, value } : item
    ));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction) {
      toast.error("Please select an FOMC direction (Cut, Hold, or Hike).");
      return;
    }
    
    // Check if at least one projection value is set
    const hasProjection = projections.some(item => item.value !== null);
    if (!hasProjection) {
      toast.error("Please set at least one year's rate projection.");
      return;
    }
    
    // In a real app, this would send the data to your API
    console.log({
      forecast: {
        direction,
        confidence,
        comment: comment.trim(),
      },
      projections,
      timestamp: new Date()
    });
    
    // Show success message and reset form
    toast.success("Thanks! Your forecast has been recorded.");
    setSubmitted(true);
    
    // In a real app, you might redirect to results page here
    // For demo purposes, reset the form after a delay
    setTimeout(() => {
      setDirection(null);
      setConfidence(50);
      setComment('');
      setProjections(projections.map(item => ({ ...item, value: null })));
      setSubmitted(false);
    }, 3000);
  };

  // Format projection values as percentage
  const formatValue = (value: number | null): string => {
    return value !== null ? `${(value * 100).toFixed(2)}%` : "—";
  };

  return (
    <div className="h-full w-full p-4 overflow-auto">
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-5 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Page Header with Clear Context */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">Federal Reserve Policy Forecast</h1>
            <p className="text-slate-300">Share your outlook on future rate decisions and projections</p>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Section 1: Short-term FOMC Outlook */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  Your FOMC Outlook
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={16} className="text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
                        <p className="text-sm">Forecast for next FOMC meeting on {nextMeetingDate}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-sm text-slate-400">Next meeting: {nextMeetingDate}</p>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <FomcOutlookSection 
                  direction={direction}
                  confidence={confidence}
                  currentRate={currentRate}
                  onDirectionClick={handleDirectionClick}
                  onConfidenceChange={setConfidence}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 2: Medium/Long-Term Rate Path Projections - LARGER! */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  Rate Path Projections
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={16} className="text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
                        <div className="text-sm space-y-2">
                          <p>Set your Fed Funds rate projections for future years</p>
                          <p>Click directly on the chart to set your projections</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-sm text-slate-400">Select points on the chart to set your projections</p>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <ProjectionChart
                  userProjections={projections}
                  onUpdateProjection={updateProjection}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 3: Comments & Submission */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                  {/* Comments Section - Wider */}
                  <div className="lg:col-span-3">
                    <CommentSection 
                      comment={comment}
                      setComment={setComment}
                      direction={direction}
                    />
                  </div>
                  
                  {/* Submission Preview and Button */}
                  <div className="lg:col-span-1">
                    <div className="flex flex-col h-full justify-between gap-3">
                      {/* Projection values summary */}
                      <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 grid grid-cols-4 gap-2">
                        {projections.map((item, index) => (
                          <div key={index} className="text-center">
                            <span className="text-sm font-medium text-slate-300 block">{item.year}</span>
                            <span 
                              className={`text-sm font-semibold block mt-1 ${
                                item.value !== null ? "text-indigo-300" : "text-slate-500"
                              }`}
                            >
                              {formatValue(item.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Submit button */}
                      <SubmitButton 
                        submitted={submitted}
                        disabled={!direction || !projections.some(p => p.value !== null)}
                        text="Submit My View"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
