
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full overflow-auto pb-2">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        {/* User Identity Card */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{userData.fullName}</h2>
                <p className="text-muted-foreground">{userData.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{userData.email}</p>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="shadow-md flex-grow">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Performance Overview</h3>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <TrendingUp size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Forecast Accuracy</p>
                  <p className="text-xl font-bold">{userData.accuracy}%</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Avg. Confidence</p>
                  <p className="text-xl font-bold">{userData.confidence}%</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Submissions</p>
                  <p className="text-xl font-bold">{userData.submissions}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Trophy size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Game Score</p>
                  <p className="text-xl font-bold">{userData.gameScore}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">Account</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-xs text-muted-foreground">{userData.email}</p>
                </div>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <LogOut size={14} />
                  Log Out
                </Button>
              </div>

              <Separator className="my-1" />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates about new polls</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Appear on Leaderboard</p>
                  <p className="text-xs text-muted-foreground">Show your rankings publicly</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right Column */}
      <div className="flex flex-col gap-4">
        {/* Badges & Achievements */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Award size={16} className="mr-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">Badges & Achievements</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="flex flex-wrap gap-2">
              {userData.badges.map((badge) => (
                <Badge key={badge.id} className="px-2 py-1 text-xs bg-slate-800 text-white hover:bg-slate-700" title={badge.description}>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Predictions */}
        <Card className="shadow-md flex-grow">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <FileText size={16} className="mr-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">Recent Predictions</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="space-y-3">
              {userData.gameResults.slice(0, 3).map((result) => (
                <div key={result.id} className="p-2 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-accent/10 transition-colors">
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
                  <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                View All Predictions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
