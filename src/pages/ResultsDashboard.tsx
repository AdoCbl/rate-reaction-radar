
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AggregatedDotPlot } from '@/components/results/AggregatedDotPlot';
import { motion } from 'framer-motion';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const ResultsDashboard: React.FC = () => {
  const isMobile = useIsMobile();
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
      '2025': [0.0425, 0.0450, 0.0475, 0.0425, 0.0450, 0.0425, 0.0400, 0.0475],
      '2026': [0.0350, 0.0375, 0.0375, 0.0400, 0.0350, 0.0325, 0.0425],
      '2027': [0.0300, 0.0325, 0.0275, 0.0325, 0.0300, 0.0250],
      'Long Run': [0.0250, 0.0225, 0.0275, 0.0250, 0.0225, 0.0275]
    },
    userProjections: {
      '2025': 0.0450,
      '2026': 0.0375,
      '2027': 0.0300,
      'Long Run': 0.0250
    },
    medians: {
      '2025': 0.0450,
      '2026': 0.0375,
      '2027': 0.0300,
      'Long Run': 0.0250
    }
  });

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 flex-grow">
        {/* Left Panel: FOMC Policy Expectations History */}
        <Card className="flex flex-col overflow-hidden bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md">
          <CardHeader className={`${isMobile ? 'p-3' : 'p-3'} pb-2`}>
            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-indigo-300`}>
              FOMC Policy Expectations History
            </CardTitle>
            <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-snug text-gray-200`}>
              See how client sentiment has evolved over time
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow flex flex-col p-3">
            <div className="flex justify-end mb-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="px-2 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/50"
              >
                <span className="text-slate-300">Your prediction:</span>
                <Badge
                  variant={
                    userVote.direction === 'cut' ? 'success' : 
                    userVote.direction === 'hold' ? 'muted' : 
                    'destructive'
                  }
                  className="capitalize"
                >
                  {userVote.direction}
                </Badge>
              </motion.div>
            </div>
            
            <Separator className="mb-3" />
            
            <div className="flex-grow">
              <FomcOutlookChart />
            </div>
            
            <div>
              <p className="text-xs text-slate-400 pl-2 border-l-2 border-slate-600 ml-2 italic">
                Client sentiment shifted toward 'Hold' after the June CPI release.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Aggregated Dot Plot with Client Median Projections */}
        <Card className="flex flex-col overflow-hidden bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-md">
          <CardHeader className={`${isMobile ? 'p-3' : 'p-3'} pb-2`}>
            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-indigo-300`}>
              Aggregated Dot Plot
            </CardTitle>
            <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-snug text-gray-200`}>
              Client projections vs. FOMC median
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow p-3">
            <AggregatedDotPlot 
              projections={aggregatedData.projections}
              userProjections={aggregatedData.userProjections}
              medians={aggregatedData.medians}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDashboard;
