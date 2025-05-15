
import React, { useState } from 'react';
import { DirectionButton, Direction } from '@/components/sentiment/DirectionButton';
import { RateSelect } from '@/components/sentiment/RateSelect';
import { ConfidenceSlider } from '@/components/sentiment/ConfidenceSlider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

const SentimentPoll: React.FC = () => {
  // Current Fed Funds rate (example value)
  const currentRate = 5.25;
  
  // State for the form
  const [direction, setDirection] = useState<Direction | null>(null);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number>(50);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

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
    
    // In a real app, this would send the data to your API
    console.log({
      direction,
      rate: selectedRate,
      confidence,
      comment: comment.trim(),
      timestamp: new Date()
    });
    
    // Show success message and reset form
    toast.success("Thanks! Your view has been recorded.");
    setSubmitted(true);
    
    // In a real app, you might redirect to results page here
    // For demo purposes, reset the form after a delay
    setTimeout(() => {
      setDirection(null);
      setSelectedRate(null);
      setConfidence(50);
      setComment('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <Card className="p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-center text-finance-navy">
          What is your interest rate outlook for the upcoming Federal Reserve meeting?
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Direction Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <DirectionButton 
              direction="hike" 
              selected={direction === 'hike'} 
              onClick={handleDirectionClick}
            />
            <DirectionButton 
              direction="hold" 
              selected={direction === 'hold'} 
              onClick={handleDirectionClick}
            />
            <DirectionButton 
              direction="cut" 
              selected={direction === 'cut'} 
              onClick={handleDirectionClick}
            />
          </div>
          
          {/* Rate Select */}
          <RateSelect 
            currentRate={currentRate}
            selectedRate={selectedRate}
            onChange={setSelectedRate}
            direction={direction}
          />
          
          {/* Confidence Slider */}
          <ConfidenceSlider value={confidence} onChange={setConfidence} />
          
          {/* Comment Box */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Add a quick note about your reasoning (optional):</label>
            <Textarea 
              placeholder="Your thoughts on the rates outlook..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!direction || selectedRate === null || submitted}
          >
            {submitted ? "Submitted!" : "Submit Your View"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SentimentPoll;
