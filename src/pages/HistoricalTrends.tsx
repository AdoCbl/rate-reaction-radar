
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FomcOutlookChart } from '@/components/trends/FomcOutlookChart';
import { RatePathChart } from '@/components/trends/RatePathChart';
import { ForecastAccuracyChart } from '@/components/trends/ForecastAccuracyChart';
import { motion } from 'framer-motion';

const HistoricalTrends: React.FC = () => {
  const [showFedMedians, setShowFedMedians] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-indigo-300">Historical Trends</h1>
        <p className="text-slate-400 mt-2">
          Explore how client expectations have shifted over time for Federal Reserve policy actions.
        </p>
      </motion.div>

      {/* Mobile Tabs View */}
      <div className="md:hidden">
        <Tabs defaultValue="outlook" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="outlook">Short-term Policy</TabsTrigger>
            <TabsTrigger value="projections">Long-term Outlook</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outlook" className="mt-0">
            <OutlookCard title="FOMC Policy Expectations History" 
                        description="See how client sentiment has evolved over time"
                        footer="Sentiment leaned heavily toward 'Hold' in the lead-up to the July FOMC." />
          </TabsContent>
          
          <TabsContent value="projections" className="mt-0">
            <OutlookCard title="Client Federal Reserve Expectations" 
                        description="Track historical sentiment for future Fed policy"
                        footer="Rate cut expectations increased significantly in recent months." 
                        chart="rate-path"
                        showFedMedians={showFedMedians}
                        setShowFedMedians={setShowFedMedians} />
          </TabsContent>
          
          <TabsContent value="accuracy" className="mt-0">
            <AccuracyCard title="Forecast Accuracy vs Historical Fed Projections" 
                         description="See how past client projections compare with the actual SEP medians released by the Federal Reserve." 
                         footer="This comparison helps track how closely client sentiment aligned with Fed guidance over time." />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Stacked View */}
      <div className="hidden md:flex md:flex-col md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <OutlookCard title="FOMC Policy Expectations History" 
                      description="See how client sentiment has evolved over time"
                      footer="Sentiment leaned heavily toward 'Hold' in the lead-up to the July FOMC." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          <OutlookCard title="Client Federal Reserve Expectations" 
                      description="Track historical sentiment for future Fed policy"
                      footer="Rate cut expectations increased significantly in recent months." 
                      chart="rate-path"
                      showFedMedians={showFedMedians}
                      setShowFedMedians={setShowFedMedians} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <AccuracyCard title="Forecast Accuracy vs Historical Fed Projections" 
                       description="See how past client projections compare with the actual SEP medians released by the Federal Reserve." 
                       footer="This comparison helps track how closely client sentiment aligned with Fed guidance over time." />
        </motion.div>
      </div>
    </div>
  );
};

// Card for FOMC Outlook Over Time
const OutlookCard: React.FC<{
  title: string;
  description: string;
  footer: string;
  chart?: string;
  showFedMedians?: boolean;
  setShowFedMedians?: (show: boolean) => void;
}> = ({ title, description, footer, chart = 'fomc-outlook', showFedMedians = false, setShowFedMedians }) => {
  return (
    <Card className="overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              {title}
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              {description}
            </CardDescription>
          </div>
          
          {chart === 'rate-path' && setShowFedMedians && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">SEP Medians</span>
              <Switch 
                checked={showFedMedians}
                onCheckedChange={setShowFedMedians}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="h-80 md:h-96"> 
          {chart === 'fomc-outlook' ? (
            <FomcOutlookChart />
          ) : (
            <RatePathChart showFedMedians={showFedMedians || false} />
          )}
        </div>
        <p className="text-sm text-slate-400 mt-4">
          {footer}
        </p>
      </CardContent>
    </Card>
  );
};

// Card for Forecast Accuracy
const AccuracyCard: React.FC<{
  title: string;
  description: string;
  footer: string;
}> = ({ title, description, footer }) => {
  return (
    <Card className="overflow-hidden bg-slate-800/90 border border-slate-700 shadow-lg rounded-xl">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ForecastAccuracyChart />
        <p className="text-sm text-slate-400 mt-4 text-center">
          {footer}
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrends;
