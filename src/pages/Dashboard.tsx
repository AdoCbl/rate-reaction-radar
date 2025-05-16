
import React, { useState } from 'react';
import { FomcOutlookSection } from '@/components/sentiment/FomcOutlookSection';
import { DotPlotProjection } from '@/components/sentiment/DotPlotProjection';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';
import { CommentSection } from '@/components/sentiment/CommentSection';
import { SubmitButton } from '@/components/sentiment/SubmitButton';
import { Direction, YearProjection } from '@/components/sentiment/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { RatePathChart } from '@/components/trends/RatePathChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard: React.FC = () => {
  // Current Fed Funds rate
  const currentRate = 5.33;
  
  // State for the form
  const [direction, setDirection] = useState<Direction | null>(null);
  const [confidence, setConfidence] = useState<number>(50);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // State for dot plot projections
  const [dotPlotValues, setDotPlotValues] = useState<YearProjection[]>([
    { year: '2025', value: null },
    { year: '2026', value: null },
    { year: '2027', value: null },
    { year: 'Long Run', value: null }
  ]);

  // Handle direction button click
  const handleDirectionClick = (newDirection: Direction) => {
    setDirection(newDirection);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction) {
      toast.error("Please select a direction.");
      return;
    }
    
    // Check if at least one dot plot value is set
    const hasDotPlotValue = dotPlotValues.some(item => item.value !== null);
    if (!hasDotPlotValue) {
      toast.error("Please place at least one projection on the dot plot.");
      return;
    }
    
    // In a real app, this would send the data to your API
    console.log({
      forecast: {
        direction,
        confidence,
        comment: comment.trim(),
      },
      dotPlotProjections: dotPlotValues,
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
      setDotPlotValues(dotPlotValues.map(item => ({ ...item, value: null })));
      setSubmitted(false);
    }, 3000);
  };

  // Format value as percentage
  const formatValue = (value: number | null): string => {
    return value !== null ? `${(value * 100).toFixed(2)}%` : "—";
  };

  return (
    <div className="h-full w-full p-4 overflow-auto">
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-5 max-w-[1800px] mx-auto">
        {/* Top Row - Main Client Rate Path Projections - Featured and prominent */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[38vh]"
        >
          <Card className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">
                FOMC Policy Expectations History
              </CardTitle>
              <div className="flex items-center justify-end">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/50"
                >
                  <span className="text-slate-300">Your prediction:</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 
                        direction === 'cut' ? 'rgba(16, 185, 129, 0.3)' : 
                        direction === 'hold' ? 'rgba(148, 163, 184, 0.3)' : 
                        direction === 'hike' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(148, 163, 184, 0.1)',
                      color: 
                        direction === 'cut' ? 'rgb(16, 185, 129)' : 
                        direction === 'hold' ? 'rgb(148, 163, 184)' : 
                        direction === 'hike' ? 'rgb(244, 63, 94)' : 'rgb(148, 163, 184)'
                    }}
                  >
                    {direction ? direction.charAt(0).toUpperCase() + direction.slice(1) : 'None'}
                  </span>
                </motion.div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 h-[calc(100%-60px)]">
              <div className="h-full">
                <FomcOutlookChart />
              </div>
              <p className="text-xs text-slate-400 pl-2 border-l-2 border-slate-600 ml-2 italic mt-2">
                Client sentiment shifted toward 'Hold' after the June CPI release.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-xl font-bold text-white">
                Client Rate Path Projections
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 h-[calc(100%-60px)]">
              <div className="h-full">
                <RatePathChart showFedMedians={true} />
              </div>
              <p className="text-xs text-slate-400 pl-2 border-l-2 border-slate-600 ml-2 italic mt-2">
                Average client projections show rate cuts accelerating through 2026.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Middle Row - Input Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[32vh]"
        >
          {/* Left Card - FOMC Outlook */}
          <Card className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                Your FOMC Outlook
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
                      <p className="text-sm">Select the future direction of Fed policy and your confidence level</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 h-[calc(100%-60px)]">
              <FomcOutlookSection 
                direction={direction}
                confidence={confidence}
                currentRate={currentRate}
                onDirectionClick={handleDirectionClick}
                onConfidenceChange={setConfidence}
              />
            </CardContent>
          </Card>

          {/* Right Card - Rate Projections */}
          <Card className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                Rate Projections
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 border-slate-700 text-white">
                      <p className="text-sm">Place dots to indicate your projected interest rates</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 h-[calc(100%-60px)]">
              <DotPlotProjection 
                values={dotPlotValues}
                onChange={setDotPlotValues}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Row - Comments and Submit */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[22vh]"
        >
          {/* Comments Section */}
          <Card className="col-span-1 lg:col-span-2 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardContent className="p-4 h-full flex flex-col justify-center">
              <CommentSection 
                comment={comment}
                setComment={setComment}
                direction={direction}
              />
            </CardContent>
          </Card>
          
          {/* Submission Preview and Button */}
          <Card className="col-span-1 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md overflow-hidden">
            <CardContent className="p-4 h-full">
              <div className="flex flex-col h-full justify-between gap-3">
                {/* Projection values summary */}
                <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 grid grid-cols-4 gap-2">
                  {dotPlotValues.map((item, index) => (
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
                  disabled={!direction}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
};

export default Dashboard;
