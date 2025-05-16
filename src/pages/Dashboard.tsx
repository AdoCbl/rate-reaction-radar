
import React, { useState } from 'react';
import { FomcOutlookSection } from '@/components/sentiment/FomcOutlookSection';
import { DotPlotProjection } from '@/components/sentiment/DotPlotProjection';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';
import { CommentSection } from '@/components/sentiment/CommentSection';
import { SubmitButton } from '@/components/sentiment/SubmitButton';
import { Direction, YearProjection } from '@/components/sentiment/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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

  // Mock data for the user's vote
  const userVote = {
    direction: direction || 'hold',
    confidence: confidence
  };

  return (
    <div className="h-full w-full">
      <div className="fixed inset-0 bg-slate-950 -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_70%)] -z-10 pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="h-screen flex flex-col px-4">
        {/* Top Row - Three Cards with consistent styling */}
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-130px)]">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md flex flex-col"
          >
            <h2 className="text-lg font-bold mb-2 text-white">
              Your FOMC Outlook
            </h2>
            <div className="flex-grow">
              <FomcOutlookSection 
                direction={direction}
                confidence={confidence}
                currentRate={currentRate}
                onDirectionClick={handleDirectionClick}
                onConfidenceChange={setConfidence}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md flex flex-col"
          >
            <h2 className="text-lg font-bold mb-2 text-white">
              Rate Projections
            </h2>
            <div className="flex-grow">
              <DotPlotProjection 
                values={dotPlotValues}
                onChange={setDotPlotValues}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md flex flex-col"
          >
            <h2 className="text-lg font-bold mb-2 text-white">
              FOMC Policy Expectations History
            </h2>
            
            <div className="flex justify-end mb-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="px-2 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/50"
              >
                <span className="text-slate-300">Your prediction:</span>
                <span
                  className="px-1.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 
                      userVote.direction === 'cut' ? 'rgba(16, 185, 129, 0.3)' : 
                      userVote.direction === 'hold' ? 'rgba(148, 163, 184, 0.3)' : 
                      'rgba(244, 63, 94, 0.3)',
                    color: 
                      userVote.direction === 'cut' ? 'rgb(16, 185, 129)' : 
                      userVote.direction === 'hold' ? 'rgb(148, 163, 184)' : 
                      'rgb(244, 63, 94)'
                  }}
                >
                  {userVote.direction.charAt(0).toUpperCase() + userVote.direction.slice(1)}
                </span>
              </motion.div>
            </div>
            
            <div className="flex-grow">
              <FomcOutlookChart />
            </div>
            
            <div>
              <p className="text-xs text-slate-400 pl-2 border-l-2 border-slate-600 ml-2 italic">
                Client sentiment shifted toward 'Hold' after the June CPI release.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row - Unified container with 3 sections */}
        <div className="grid grid-cols-12 gap-4 h-[100px] mb-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="col-span-7 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md"
          >
            <CommentSection 
              comment={comment}
              setComment={setComment}
              direction={direction}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="col-span-3 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md"
          >
            <div className="grid grid-cols-4 gap-2 bg-slate-800/60 rounded-md p-2 border border-slate-700/50 h-full">
              <div className="text-center">
                <span className="text-sm font-medium text-slate-300 block">2025</span>
                <span className="text-sm text-indigo-300 font-semibold block mt-1">
                  {dotPlotValues[0].value !== null ? `${(dotPlotValues[0].value! * 100).toFixed(2)}%` : "—"}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-slate-300 block">2026</span>
                <span className="text-sm text-indigo-300 font-semibold block mt-1">
                  {dotPlotValues[1].value !== null ? `${(dotPlotValues[1].value! * 100).toFixed(2)}%` : "—"}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-slate-300 block">2027</span>
                <span className="text-sm text-indigo-300 font-semibold block mt-1">
                  {dotPlotValues[2].value !== null ? `${(dotPlotValues[2].value! * 100).toFixed(2)}%` : "—"}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-slate-300 block">Long Run</span>
                <span className="text-sm text-indigo-300 font-semibold block mt-1">
                  {dotPlotValues[3].value !== null ? `${(dotPlotValues[3].value! * 100).toFixed(2)}%` : "—"}
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="col-span-2 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-md flex items-center justify-center"
          >
            <div className="w-full">
              <SubmitButton 
                submitted={submitted}
                disabled={!direction}
              />
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
