
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
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto px-4">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">Market Sentiment Results</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Compare your forecast with aggregated client expectations and the SEP median projections.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel: FOMC Rate Outlook Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 overflow-hidden bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md rounded-xl h-full">
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
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 overflow-hidden bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md rounded-xl h-full">
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
