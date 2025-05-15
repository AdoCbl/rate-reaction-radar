
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FomcRateOutlook } from '@/components/results/FomcRateOutlook';
import { AggregatedDotPlot } from '@/components/results/AggregatedDotPlot';
import { Button } from '@/components/ui/button';
import { GameController } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ResultsDashboard: React.FC = () => {
  const navigate = useNavigate();
  // Mock data for the current user's vote
  const [userVote] = useState({
    direction: 'hold',
    confidence: 75
  });

  // Mock data for the aggregated votes
  const [aggregatedData] = useState({
    directions: [
      { name: 'cut', count: 45, percentage: 45 },
      { name: 'hold', count: 40, percentage: 40 },
      { name: 'hike', count: 15, percentage: 15 }
    ],
    averageRate: 5.31,
    projections: {
      '2025': [0.04, 0.0375, 0.045, 0.04, 0.035, 0.0425, 0.04, 0.0375],
      '2026': [0.035, 0.03, 0.0325, 0.035, 0.03, 0.0325, 0.0375],
      '2027': [0.0275, 0.025, 0.03, 0.0275, 0.025, 0.03],
      'Long Run': [0.0225, 0.02, 0.025, 0.0225, 0.02, 0.025]
    },
    // User's own projections
    userProjections: {
      '2025': 0.04,
      '2026': 0.035,
      '2027': 0.0275,
      'Long Run': 0.0225
    },
    // Median projections
    medians: {
      '2025': 0.04,
      '2026': 0.0325,
      '2027': 0.0275,
      'Long Run': 0.0225
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

      {/* CTA Button */}
      <motion.div 
        className="flex justify-center mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Button 
          className="bg-blue-600 hover:bg-blue-700 px-6"
          onClick={() => navigate('/game')}
        >
          <GameController size={18} />
          Try the Rate Reaction Game
        </Button>
      </motion.div>
    </div>
  );
};

export default ResultsDashboard;
