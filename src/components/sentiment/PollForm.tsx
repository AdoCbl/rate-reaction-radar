
import React, { useState } from 'react';
import { DotPlotProjection } from '@/components/sentiment/DotPlotProjection';
import { Direction, YearProjection } from './types';
import { FormHeader } from './FormHeader';
import { CommentSection } from './CommentSection';
import { SubmitButton } from './SubmitButton';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { FomcOutlookSection } from './FomcOutlookSection';

export const PollForm: React.FC = () => {
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

  return (
    <motion.div 
      className="glass-card rounded-xl p-4 md:p-6 shadow-xl w-full max-w-4xl mx-auto" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FormHeader />
      
      <form onSubmit={handleSubmit} className="space-y-3"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Left column: FOMC Decision */}
          <FomcOutlookSection 
            direction={direction}
            confidence={confidence}
            currentRate={currentRate}
            onDirectionClick={handleDirectionClick}
            onConfidenceChange={setConfidence}
          />
          
          {/* Right column: Dot Plot */}
          <div className="space-y-3">
            <div id="dotplot-section">
              <DotPlotProjection 
                values={dotPlotValues}
                onChange={setDotPlotValues}
              />
            </div>
          </div>
        </div>
        
        {/* Comments Box - Full width across both columns */}
        <div className="col-span-full">
          <CommentSection 
            comment={comment}
            setComment={setComment}
            direction={direction}
          />
        </div>
        
        {/* Submit Button */}
        <SubmitButton 
          submitted={submitted}
          disabled={!direction}
        />
      </form>
    </motion.div>
  );
};
