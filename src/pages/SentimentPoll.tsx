
import React, { useState } from 'react';
import { DirectionButton, Direction } from '@/components/sentiment/DirectionButton';
import { RateSelect } from '@/components/sentiment/RateSelect';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { DotPlotProjection } from '@/components/sentiment/DotPlotProjection';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type YearProjection = {
  year: string;
  value: number | null;
};

const SentimentPoll: React.FC = () => {
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
    <div className="max-w-5xl mx-auto">
      <motion.div 
        className="glass-card rounded-xl p-4 shadow-xl" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-3 text-center">
          <motion.h1 
            className="text-xl md:text-2xl font-semibold mb-1 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Your Outlook for the Upcoming FOMC Meeting
          </motion.h1>
          
          <motion.p 
            className="text-xs md:text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Provide your short-term prediction and long-term rate projections.
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3"> 
          {/* Two column layout for better balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column: FOMC Decision */}
            <div className="space-y-2">
              <motion.h2 
                className="text-lg font-semibold mb-1 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                Your FOMC Outlook
              </motion.h2>
              
              <motion.p 
                className="text-xs text-gray-400 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                What's your outlook for the next meeting?
              </motion.p>
              
              {/* Direction Buttons */}
              <motion.div 
                className="grid grid-cols-3 gap-2"
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
              
              {/* Rate Select */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: direction ? 1 : 0,
                  height: direction ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-2"
              >
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-300">Expected target rate:</label>
                  <RateSelect 
                    currentRate={currentRate}
                    selectedRate={selectedRate}
                    onChange={setSelectedRate}
                    direction={direction}
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {currentRate.toFixed(2)}%</p>
                </div>
              </motion.div>
              
              {/* Confidence Slider */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: direction ? 1 : 0,
                  height: direction ? 'auto' : 0
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="overflow-hidden mt-2"
              >
                <ConfidenceSlider value={confidence} onChange={setConfidence} />
              </motion.div>
              
              {/* Comment Box */}
              <motion.div 
                className="space-y-1 mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: direction ? 1 : 0,
                  height: direction ? 'auto' : 0
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-xs font-medium text-gray-300">Comments (optional):</label>
                <Textarea 
                  placeholder="Your thoughts..."
                  value={comment}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setComment(e.target.value);
                    }
                  }}
                  rows={1}
                  className="resize-none bg-gray-800/50 border-gray-700 focus:border-sky-600 focus:ring-sky-600/20 text-xs py-1"
                  maxLength={200}
                />
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">{comment.length}/200</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right column: Dot Plot */}
            <div className="space-y-2">
              <div id="dotplot-section">
                <DotPlotProjection 
                  values={dotPlotValues}
                  onChange={setDotPlotValues}
                />
              </div>
            </div>
          </div>
          
          {/* Submit Button (full width below both columns) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
              disabled={submitted || !direction || selectedRate === null}
            >
              {submitted ? "Submitted!" : "Submit Your Forecast"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
