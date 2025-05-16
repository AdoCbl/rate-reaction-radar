
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <div className="h-full flex flex-col">
      <motion.div 
        className="text-center mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-bold text-indigo-300">Market Sentiment Results Over Time</h1>
        <p className="text-slate-400 text-sm mt-1">
          See how client expectations have evolved since recent FOMC meetings.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {/* Left Panel: FOMC Policy Expectations History */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex"
        >
          <Card className="p-4 overflow-hidden bg-slate-800/90 border border-slate-700 shadow-md rounded-xl flex flex-col w-full">
            <CardHeader className="p-3 pb-0">
              <h2 className="text-lg font-medium text-indigo-300 tracking-tight">FOMC Policy Expectations History</h2>
              <p className="text-xs text-slate-400">See how client sentiment has evolved over time</p>
            </CardHeader>
            
            <CardContent className="p-4 flex-grow flex flex-col">
              <div className="flex justify-end">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="px-2 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/50"
                >
                  <span className="text-slate-300">Your prediction:</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 
                        userVote.direction === 'cut' ? 'rgba(16, 185, 129, 0.3)' : 
                        userVote.direction === 'hold' ? 'rgba(148, 163, 184, 0.3)' : 
                        'rgba(244, 63, 94, 0.3)',
                      color: 
                        userVote.direction === 'cut' ? 'rgb(16, 185, 129)' : 
                        userVote.direction === 'hold' ? 'rgb(148, 163, 184)' : 
                        'rgb(244, 63, 94)'
                    }}
                  >
                    {userVote.direction.charAt(0).toUpperCase() + userVote.direction.slice(1)}
                  </span>
                </motion.div>
              </div>
              
              <div className="flex-grow mt-2">
                <FomcOutlookChart />
              </div>
              
              <div>
                <p className="text-xs text-slate-400 pl-2 border-l-2 border-slate-600 ml-2 italic">
                  Client sentiment shifted toward 'Hold' after the June CPI release.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Panel: Aggregated Dot Plot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex"
        >
          <Card className="p-4 overflow-hidden bg-slate-800/90 border border-slate-700 shadow-md rounded-xl flex flex-col w-full">
            <CardHeader className="p-3 pb-0">
              <h2 className="text-lg font-medium text-indigo-300 tracking-tight">Aggregated Dot Plot</h2>
              <p className="text-xs text-slate-400">Client projections vs. FOMC median</p>
            </CardHeader>
            
            <CardContent className="p-4 flex-grow flex items-center">
              <AggregatedDotPlot 
                projections={aggregatedData.projections}
                userProjections={aggregatedData.userProjections}
                medians={aggregatedData.medians}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
