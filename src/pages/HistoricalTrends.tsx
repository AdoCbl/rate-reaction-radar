
import React from 'react';
import { Card } from '@/components/ui/card';

const HistoricalTrends: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Historical Sentiment Trends</h2>
        <p className="text-gray-500">Coming soon - this screen will show how sentiment has evolved over time.</p>
      </Card>
    </div>
  );
};

export default HistoricalTrends;
