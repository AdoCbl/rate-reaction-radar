
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FomcRateOutlook } from '@/components/results/FomcRateOutlook';
import { AggregatedDotPlot } from '@/components/results/AggregatedDotPlot';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GameController } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResultsDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for the current user's vote
  const [userVote] = useState({
    direction: 'hold',
    confidence: 75
  });

  // Mock data for the aggregated votes with realistic values
  const [aggregatedData] = useState({
    directions: [
      { name: 'cut', count: 45, percentage: 45 },
      { name: 'hold', count: 40, percentage: 40 },
      { name: 'hike', count: 15, percentage: 15 }
    ],
    averageRate: 5.31,
    projections: {
      // Realistic projections within the visible range (0-6%)
      '2025': [0.0425, 0.0450, 0.0475, 0.0425, 0.0450, 0.0425, 0.0400, 0.0475],
      '2026': [0.0350, 0.0375, 0.0375, 0.0400, 0.0350, 0.0325, 0.0425],
      '2027': [0.0300, 0.0325, 0.0275, 0.0325, 0.0300, 0.0250],
      'Long Run': [0.0250, 0.0225, 0.0275, 0.0250, 0.0225, 0.0275]
    },
    // User's own projections within the visible range
    userProjections: {
      '2025': 0.0450,
      '2026': 0.0375,
      '2027': 0.0300,
      'Long Run': 0.0250
    },
    // Median projections
    medians: {
      '2025': 0.0450,
      '2026': 0.0375,
      '2027': 0.0300,
      'Long Run': 0.0250
    }
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold text-white">Market Sentiment Results</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Compare your forecast with aggregated client expectations and the SEP median projections.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel: FOMC Rate Outlook Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-4 glass-card h-full">
            <FomcRateOutlook 
              aggregatedData={aggregatedData.directions}
              userVote={userVote.direction}
              averageRate={aggregatedData.averageRate}
            />
          </Card>
        </motion.div>

        {/* Right Panel: Aggregated Dot Plot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-4 glass-card h-full">
            <AggregatedDotPlot 
              projections={aggregatedData.projections}
              userProjections={aggregatedData.userProjections}
              medians={aggregatedData.medians}
            />
          </Card>
        </motion.div>
      </div>
      
      {/* Floating CTA button */}
      <motion.div
        className="fixed bottom-24 right-4 md:right-8 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <Button 
          onClick={() => navigate('/game')}
          className="bg-sky-600 hover:bg-sky-500 text-white shadow-lg flex items-center gap-2 px-4 py-6 rounded-full"
          size="lg"
        >
          <GameController className="h-5 w-5" />
          <span>Try the Rate Reaction Game</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default ResultsDashboard;
