
import React, { useState } from 'react';
import { DirectionButton, Direction } from '@/components/sentiment/DirectionButton';
import { RateSelect } from '@/components/sentiment/RateSelect';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { DotPlotProjection } from '@/components/sentiment/DotPlotProjection';
import { FormHeader } from './FormHeader';
import { CommentSection } from './CommentSection';
import { SubmitButton } from './SubmitButton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type YearProjection = {
  year: string;
  value: number | null;
};

export const PollForm: React.FC = () => {
  // Current Fed Funds rate
  const currentRate = 5.33;
  
  // State for the form
  const [direction, setDirection] = useState<Direction | null>(null);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number>(50);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // State for dot plot projections
  const [dotPlotValues, setDotPlotValues] = useState<YearProjection[]>([
    { year: '2024', value: null },
    { year: '2025', value: null },
    { year: '2026', value: null },
    { year: 'Long Run', value: null }
  ]);

  // Handle direction button click
  const handleDirectionClick = (newDirection: Direction) => {
    setDirection(newDirection);
    
    // Set default rate based on direction
    if (newDirection === 'hold') {
      setSelectedRate(currentRate);
    } else if (newDirection === 'hike') {
      setSelectedRate(currentRate + 0.25);
    } else if (newDirection === 'cut') {
      setSelectedRate(currentRate - 0.25);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!direction || selectedRate === null) {
      toast.error("Please select a direction and rate.");
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
        rate: selectedRate,
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
      setSelectedRate(null);
      setConfidence(50);
      setComment('');
      setDotPlotValues(dotPlotValues.map(item => ({ ...item, value: null })));
      setSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="glass-card rounded-xl p-6 shadow-xl" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FormHeader />
      
      <form onSubmit={handleSubmit} className="space-y-6"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left column: FOMC Decision */}
          <div className="space-y-4">
            <motion.h2 
              className="text-xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Your FOMC Outlook
            </motion.h2>
            
            <motion.p 
              className="text-sm text-gray-400 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              What's your outlook for the next meeting?
            </motion.p>
            
            {/* Direction Buttons */}
            <motion.div 
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <DirectionButton 
                direction="cut" 
                selected={direction === 'cut'} 
                onClick={handleDirectionClick}
              />
              <DirectionButton 
                direction="hold" 
                selected={direction === 'hold'} 
                onClick={handleDirectionClick}
              />
              <DirectionButton 
                direction="hike" 
                selected={direction === 'hike'} 
                onClick={handleDirectionClick}
              />
            </motion.div>
            
            {/* Rate Select - Always visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Expected target rate:</label>
                <RateSelect 
                  currentRate={currentRate}
                  selectedRate={selectedRate || currentRate}
                  onChange={setSelectedRate}
                  direction={direction || 'hold'}
                />
                <p className="text-xs text-gray-500 mt-1">Current: {currentRate.toFixed(2)}%</p>
              </div>
            </motion.div>
            
            {/* Confidence Slider - Always visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ConfidenceSlider value={confidence} onChange={setConfidence} />
            </motion.div>
          </div>
          
          {/* Right column: Dot Plot */}
          <div className="space-y-4">
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
          disabled={!direction || selectedRate === null}
        />
      </form>
    </motion.div>
  );
};
