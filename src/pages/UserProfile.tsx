
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Award, 
  TrendingUp,
  Check, 
  Calendar,
  Shield,
  LogOut,
  Mail,
  Trophy,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

// Mock user data - in a real app this would come from an API
const userData = {
  username: 'JohnDoe',
  fullName: 'John Doe',
  title: 'Financial Professional',
  email: 'john.doe@example.com',
  accuracy: 78,
  confidence: 84,
  submissions: 24,
  gameScore: 72,
  badges: [
    { id: 1, name: 'Top Forecaster', description: 'Consistently accurate predictions' },
    { id: 2, name: 'Regular Contributor', description: 'Submitted views for 5 consecutive weeks' },
    { id: 3, name: 'Market Guru', description: '90%+ accuracy on three consecutive weeks' },
    { id: 4, name: 'Rising Star', description: 'Improved accuracy by 15% over previous month' }
  ],
  recentSubmissions: [
    { id: 1, date: '2025-05-01', direction: 'hold', rate: 5.25, confidence: 75 },
    { id: 2, date: '2025-04-24', direction: 'hike', rate: 5.50, confidence: 60 },
    { id: 3, date: '2025-04-17', direction: 'hold', rate: 5.25, confidence: 85 }
  ],
  gameResults: [
    { id: 1, date: '2025-05-06', score: 85, scenario: 'Post-Employment Report', predicted: '25bp cut', actual: '25bp cut', accuracy: 'Perfect', description: 'Correctly predicted Fed response to employment data' },
    { id: 2, date: '2025-04-29', score: 65, scenario: 'Q1 GDP Release', predicted: 'No change', actual: '25bp hike', accuracy: 'Close', description: 'Unexpected inflation data led to surprise hike' },
    { id: 3, date: '2025-04-22', score: 75, scenario: 'FOMC Meeting', predicted: '50bp cut', actual: '25bp cut', accuracy: 'Good', description: 'Direction correct but magnitude off' },
    { id: 4, date: '2025-04-15', score: 90, scenario: 'CPI Report', predicted: 'No change', actual: 'No change', accuracy: 'Perfect', description: 'Correctly anticipated steady rates following inflation report' }
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
      {/* User Identity Card */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 w-full text-center relative">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                {getInitials(userData.fullName)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mt-4">{userData.fullName}</h2>
            <p className="text-muted-foreground">{userData.title}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-4 right-4 text-xs"
          >
            Edit Profile
          </Button>
        </Card>
      </motion.div>

      {/* Performance Overview */}
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
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Game Score</p>
                <p className="text-2xl font-bold">{userData.gameScore}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Badges & Achievements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Award size={18} className="mr-2 text-muted-foreground" />
            <h3 className="text-lg font-medium">Badges & Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {userData.badges.map((badge) => (
              <Badge key={badge.id} className="px-3 py-1.5 text-sm bg-slate-800 text-white hover:bg-slate-700" title={badge.description}>
                {badge.name}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Mail size={18} className="mr-2 text-muted-foreground" />
            <h3 className="text-lg font-medium">Account</h3>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <LogOut size={14} />
                Log Out
              </Button>
            </div>

            <Separator className="my-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates about new polls and results</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Appear on Leaderboard</p>
                <p className="text-xs text-muted-foreground">Show your rankings publicly</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Predictions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <FileText size={18} className="mr-2 text-muted-foreground" />
            <h3 className="text-lg font-medium">Recent Predictions</h3>
          </div>
          <div className="space-y-3">
            {userData.gameResults.slice(0, 4).map((result) => (
              <div key={result.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{result.scenario}</p>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {new Date(result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
                        Predicted: {result.predicted}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
                        Actual: {result.actual}
                      </span>
                    </div>
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
                <p className="text-xs text-muted-foreground mt-2">{result.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Button variant="link" size="sm" className="text-primary">
              View All Predictions
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
