
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';
import { RatePathChart } from '@/components/trends/RatePathChart';
import { motion } from 'framer-motion';

const HistoricalTrends: React.FC = () => {
  const [showFedMedians, setShowFedMedians] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto px-4 py-6">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-indigo-300">Historical Trends</h1>
        <p className="text-slate-400 mt-2">
          Explore how client expectations have shifted over time for both FOMC actions and rate path projections.
        </p>
      </motion.div>

      {/* Mobile Tabs View */}
      <div className="md:hidden">
        <Tabs defaultValue="outlook" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="outlook">FOMC Outlook</TabsTrigger>
            <TabsTrigger value="projections">Rate Projections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outlook" className="mt-0">
            <OutlookCard />
          </TabsContent>
          
          <TabsContent value="projections" className="mt-0">
            <ProjectionsCard showFedMedians={showFedMedians} setShowFedMedians={setShowFedMedians} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Stacked View */}
      <div className="hidden md:block space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <OutlookCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProjectionsCard showFedMedians={showFedMedians} setShowFedMedians={setShowFedMedians} />
        </motion.div>
      </div>
    </div>
  );
};

// Card for FOMC Outlook Over Time
const OutlookCard: React.FC = () => {
  return (
    <Card className="overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Clients' Predictions for the Next Fed Move (History)
        </CardTitle>
        <CardDescription className="text-slate-400">
          See how client sentiment has evolved over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 md:h-80">
          <FomcOutlookChart />
        </div>
        <p className="text-sm text-slate-400 mt-3">
          Rate cut sentiment spiked following the June CPI report.
        </p>
      </CardContent>
    </Card>
  );
};

// Card for Rate Path Projection History
const ProjectionsCard: React.FC<{
  showFedMedians: boolean;
  setShowFedMedians: (value: boolean) => void;
}> = ({ showFedMedians, setShowFedMedians }) => {
  return (
    <Card className="overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-semibold">
              Client Rate Projections Over Time
            </CardTitle>
            <CardDescription className="text-slate-400">
              Track how rate expectations for future years have evolved
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Show Fed SEP Medians</span>
            <Switch
              checked={showFedMedians}
              onCheckedChange={setShowFedMedians}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 md:h-80">
          <RatePathChart showFedMedians={showFedMedians} />
        </div>
        <p className="text-sm text-slate-400 mt-3">
          Client long-run projections have remained anchored around 2.50% despite near-term volatility.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrends;
