
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  TrendingUp,
  BarChart2,
  Check, 
  UserCircle
} from 'lucide-react';

// Mock user data - in a real app this would come from an API
const userData = {
  username: 'JohnDoe',
  accuracy: 78,
  confidence: 84,
  submissions: 24,
  gameScore: 72,
  badges: [
    { id: 1, name: 'Top Forecaster', description: 'Consistently accurate predictions' },
    { id: 2, name: 'Regular Contributor', description: 'Submitted views for 5 consecutive weeks' }
  ],
  recentSubmissions: [
    { id: 1, date: '2025-05-01', direction: 'hold', rate: 5.25, confidence: 75 },
    { id: 2, date: '2025-04-24', direction: 'hike', rate: 5.50, confidence: 60 },
    { id: 3, date: '2025-04-17', direction: 'hold', rate: 5.25, confidence: 85 }
  ],
  gameResults: [
    { id: 1, date: '2025-05-06', score: 85, scenario: 'Post-Employment Report' },
    { id: 2, date: '2025-04-29', score: 65, scenario: 'Q1 GDP Release' },
    { id: 3, date: '2025-04-22', score: 75, scenario: 'FOMC Meeting' }
  ]
};

const UserProfile: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* User Profile Header */}
      <Card className="p-6">
        <div className="flex items-center">
          <div className="bg-primary bg-opacity-10 p-4 rounded-full">
            <UserCircle className="text-primary" size={48} />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{userData.username}</h2>
            <p className="text-gray-500">Financial Professional</p>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-direction-up mr-2" />
              <p className="text-sm font-medium text-gray-700">Forecast Accuracy</p>
            </div>
            <p className="text-2xl font-bold mt-2">{userData.accuracy}%</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <BarChart2 size={16} className="text-primary mr-2" />
              <p className="text-sm font-medium text-gray-700">Avg. Confidence</p>
            </div>
            <p className="text-2xl font-bold mt-2">{userData.confidence}%</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <Check size={16} className="text-direction-neutral mr-2" />
              <p className="text-sm font-medium text-gray-700">Submissions</p>
            </div>
            <p className="text-2xl font-bold mt-2">{userData.submissions}</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <Award size={16} className="text-direction-up mr-2" />
              <p className="text-sm font-medium text-gray-700">Game Score</p>
            </div>
            <p className="text-2xl font-bold mt-2">{userData.gameScore}</p>
          </div>
        </div>
      </Card>
      
      {/* Badges */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Badges & Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {userData.badges.map((badge) => (
            <Badge key={badge.id} variant="secondary" className="px-3 py-1 text-sm">
              {badge.name}
            </Badge>
          ))}
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Poll Submissions</h3>
        <div className="space-y-4">
          {userData.recentSubmissions.map((submission) => (
            <div key={submission.id} className="p-3 border border-gray-100 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  {new Date(submission.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
                <Badge 
                  variant="outline" 
                  className={
                    submission.direction === 'hike' ? 'text-direction-up border-direction-up' :
                    submission.direction === 'cut' ? 'text-direction-down border-direction-down' :
                    'text-direction-neutral border-direction-neutral'
                  }
                >
                  {submission.direction.charAt(0).toUpperCase() + submission.direction.slice(1)} • {submission.rate}%
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Confidence: {submission.confidence}%</p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Game Results */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Game Results</h3>
        <div className="space-y-4">
          {userData.gameResults.map((result) => (
            <div key={result.id} className="p-3 border border-gray-100 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  {new Date(result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  <span className="text-xs text-gray-500 ml-2">• {result.scenario}</span>
                </p>
                <Badge 
                  variant="outline" 
                  className={
                    result.score >= 80 ? 'text-direction-up border-direction-up' :
                    result.score >= 50 ? 'text-direction-neutral border-direction-neutral' :
                    'text-direction-down border-direction-down'
                  }
                >
                  {result.score}/100
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
