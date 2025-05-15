
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
  const [activeSection, setActiveSection] = useState<'forecast' | 'dotplot'>('forecast');
  
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

  // Handle advancing to the dot plot section
  const handleContinueToDotPlot = () => {
    if (!direction || selectedRate === null) {
      toast.error("Please select a direction and rate.");
      return;
    }
    
    setActiveSection('dotplot');
    // Smooth scroll to the dot plot section
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('dotplot-section')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
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
      setActiveSection('forecast');
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.div 
        className="glass-card rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Rate Forecast */}
          <div id="forecast-section">
            <motion.h2 
              className="text-2xl font-semibold mb-2 text-center md:text-left text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              What's your outlook for the next Fed meeting?
            </motion.h2>
            
            <motion.p 
              className="text-sm text-gray-400 mb-8 text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Submit your forecast for the upcoming FOMC decision. Your view contributes to the aggregated market sentiment.
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
            
            {/* Rate Select */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: direction ? 1 : 0,
                height: direction ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6"
            >
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300">What target rate do you expect the Fed to set?</label>
                <RateSelect 
                  currentRate={currentRate}
                  selectedRate={selectedRate}
                  onChange={setSelectedRate}
                  direction={direction}
                />
                <p className="text-xs text-gray-500 mt-1">Current rate: {currentRate.toFixed(2)}%</p>
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
              className="overflow-hidden mt-6"
            >
              <ConfidenceSlider value={confidence} onChange={setConfidence} />
            </motion.div>
            
            {/* Comment Box */}
            <motion.div 
              className="space-y-1 mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: direction ? 1 : 0,
                height: direction ? 'auto' : 0
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300">Briefly explain your view (optional):</label>
              <Textarea 
                placeholder="Type your thoughts here..."
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setComment(e.target.value);
                  }
                }}
                rows={2}
                className="resize-none bg-gray-800/50 border-gray-700 focus:border-sky-600 focus:ring-sky-600/20"
                maxLength={200}
              />
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">{comment.length}/200</span>
              </div>
            </motion.div>
            
            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: direction ? 1 : 0,
                y: direction ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-8"
            >
              <Button 
                type="button" 
                onClick={handleContinueToDotPlot}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-6 font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                disabled={!direction || selectedRate === null}
              >
                Continue to Dot Plot
              </Button>
            </motion.div>
          </div>
          
          {/* Section 2: Dot Plot Projection */}
          <div id="dotplot-section" className={activeSection === 'dotplot' ? '' : 'opacity-50'}>
            <div className="border-t border-gray-800 pt-8 mt-8">
              <DotPlotProjection 
                values={dotPlotValues}
                onChange={setDotPlotValues}
              />
            </div>
            
            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeSection === 'dotplot' ? 1 : 0,
                y: activeSection === 'dotplot' ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                disabled={submitted || !direction || selectedRate === null}
              >
                {submitted ? "Submitted!" : "Submit Your Forecast"}
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SentimentPoll;
