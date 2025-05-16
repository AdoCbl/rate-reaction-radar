
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Award, 
  TrendingUp,
  BarChart2,
  Check, 
  Calendar,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock user data - in a real app this would come from an API
const userData = {
  username: 'JohnDoe',
  fullName: 'John Doe',
  title: 'Financial Professional',
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
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Redesigned User Profile Header - Centered and prominent */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 w-full text-center">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                {getInitials(userData.fullName)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mt-4">{userData.fullName}</h2>
            <p className="text-muted-foreground">{userData.title}</p>
          </div>
        </Card>
      </motion.div>

      {/* Redesigned Stats Overview - Dark themed containers with icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-5">Performance Overview</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Forecast Accuracy</p>
                <p className="text-2xl font-bold">{userData.accuracy}%</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Confidence</p>
                <p className="text-2xl font-bold">{userData.confidence}%</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <Check size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Submissions</p>
                <p className="text-2xl font-bold">{userData.submissions}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Game Score</p>
                <p className="text-2xl font-bold">{userData.gameScore}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Redesigned Badges - Consistent with leaderboard style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Badges & Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {userData.badges.map((badge) => (
              <Badge key={badge.id} className="px-3 py-1.5 text-sm bg-slate-800 text-white hover:bg-slate-700">
                {badge.name}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Divider before history sections */}
      <Separator className="my-8" />
      
      {/* Recent Activity with consistent styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar size={18} className="mr-2 text-muted-foreground" />
            <h3 className="text-lg font-medium">Recent Poll Submissions</h3>
          </div>
          <div className="space-y-3">
            {userData.recentSubmissions.map((submission) => (
              <div key={submission.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    {new Date(submission.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={
                      submission.direction === 'hike' ? 'text-direction-hike border-direction-hike' :
                      submission.direction === 'cut' ? 'text-direction-cut border-direction-cut' :
                      'text-direction-hold border-direction-hold'
                    }
                  >
                    {submission.direction.charAt(0).toUpperCase() + submission.direction.slice(1)} • {submission.rate}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Confidence: {submission.confidence}%</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Game Results with consistent styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Award size={18} className="mr-2 text-muted-foreground" />
            <h3 className="text-lg font-medium">Recent Game Results</h3>
          </div>
          <div className="space-y-3">
            {userData.gameResults.map((result) => (
              <div key={result.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">{result.scenario}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      result.score >= 80 ? 'text-direction-cut border-direction-cut' :
                      result.score >= 50 ? 'text-direction-hold border-direction-hold' :
                      'text-direction-hike border-direction-hike'
                    }
                  >
                    {result.score}/100
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
