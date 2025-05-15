
import React from 'react';
import { Card } from '@/components/ui/card';

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
        <p className="text-gray-500">Coming soon - this screen will display users ranked by their game performance.</p>
      </Card>
    </div>
  );
};

export default Leaderboard;
