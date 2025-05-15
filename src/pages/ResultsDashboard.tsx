
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FomcRateOutlook } from '@/components/results/FomcRateOutlook';
import { AggregatedDotPlot } from '@/components/results/AggregatedDotPlot';
import { motion } from 'framer-motion';

const ResultsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-semibold text-blue-800 dark:text-blue-300">Market Sentiment Results</h1>
        <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm">
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
          <Card className="p-4 card-light h-full shadow-md">
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
          <Card className="p-4 card-accent h-full shadow-md">
            <AggregatedDotPlot 
              projections={aggregatedData.projections}
              userProjections={aggregatedData.userProjections}
              medians={aggregatedData.medians}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
