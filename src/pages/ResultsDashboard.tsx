
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AggregatedDotPlot } from '@/components/results/AggregatedDotPlot';
import { motion } from 'framer-motion';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';

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
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto px-4 py-6">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-indigo-300">Market Sentiment Results Over Time</h1>
        <p className="text-slate-400 mt-2">
          See how client expectations have evolved since recent FOMC meetings.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel: FOMC Policy Expectations History */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-5 overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl h-full">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-indigo-300 tracking-tight">FOMC Policy Expectations History</h2>
                <p className="text-sm text-slate-400">See how client sentiment has evolved over time</p>
              </div>
              
              <div className="flex-grow">
                <div className="h-[320px]">
                  <FomcOutlookChart />
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-slate-400">
                  Client sentiment shifted toward 'Hold' after the June CPI release.
                </p>
                
                <div className="flex items-center mt-4 pt-4 border-t border-slate-700/50">
                  <span className="text-xs text-slate-400 mr-2">Your prediction:</span>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 
                        userVote.direction === 'cut' ? 'rgba(16, 185, 129, 0.2)' : 
                        userVote.direction === 'hold' ? 'rgba(148, 163, 184, 0.2)' : 
                        'rgba(244, 63, 94, 0.2)',
                      color: 
                        userVote.direction === 'cut' ? 'rgb(16, 185, 129)' : 
                        userVote.direction === 'hold' ? 'rgb(148, 163, 184)' : 
                        'rgb(244, 63, 94)'
                    }}
                  >
                    {userVote.direction.charAt(0).toUpperCase() + userVote.direction.slice(1)}
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Panel: Aggregated Dot Plot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-5 overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl h-full">
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
