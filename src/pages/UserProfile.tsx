import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, TrendingUp, Check, Calendar, Shield, LogOut, Mail, Trophy, FileText, Edit, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock user data
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
  ]
};

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-7xl">
      <div className="grid grid-cols-12 gap-4">
        {/* Column 1: User Profile & Performance - 25% width */}
        <Card className="col-span-3 bg-slate-800/90 border border-slate-700 h-full">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center mb-3">
              <Avatar className="h-16 w-16 border-2 border-primary/20 mb-2">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold mb-0">{userData.fullName}</h2>
                <p className="text-xs text-slate-400 mb-1">{userData.title}</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 mt-1">
                  <Edit size={12} />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <Separator className="my-3 bg-slate-700/50" />
            
            <div>
              <h3 className="text-xs font-medium text-indigo-300 mb-2">Performance Overview</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-2 flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mr-2">
                    <TrendingUp size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Forecast Accuracy</p>
                    <p className="text-base font-bold">{userData.accuracy}%</p>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-2 flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mr-2">
                    <Shield size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Avg. Confidence</p>
                    <p className="text-base font-bold">{userData.confidence}%</p>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-2 flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Submissions</p>
                    <p className="text-base font-bold">{userData.submissions}</p>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-2 flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mr-2">
                    <Trophy size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Game Score</p>
                    <p className="text-base font-bold">{userData.gameScore}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Column 2: Badges & Achievements - 50% width */}
        <Card className="col-span-6 bg-slate-800/90 border border-slate-700 h-full">
          <CardContent className="p-4">
            <div>
              <div className="flex items-center mb-3">
                <Award size={16} className="mr-2 text-indigo-300" />
                <h3 className="text-sm font-medium text-indigo-300">Badges & Achievements</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {userData.badges.map((badge) => (
                  <Badge 
                    key={badge.id} 
                    className="px-2 py-1 text-xs bg-slate-800 text-white hover:bg-slate-700" 
                    title={badge.description}
                  >
                    {badge.name}
                  </Badge>
                ))}
              </div>
              
              <Separator className="my-3 bg-slate-700/50" />
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-indigo-300 mb-2">Recent Stats</h4>
                  <ul className="space-y-1">
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Accuracy (last 5):</span>
                      <span className="font-medium">83%</span>
                    </li>
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Weekly rank:</span>
                      <span className="font-medium">#5</span>
                    </li>
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Best score:</span>
                      <span className="font-medium">92 (Apr 15)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-indigo-300 mb-2">Next Milestones</h4>
                  <ul className="space-y-1">
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Expert Forecaster:</span>
                      <span className="font-medium">2 more weeks</span>
                    </li>
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Perfect Streak:</span>
                      <span className="font-medium">1 more accurate</span>
                    </li>
                    <li className="flex justify-between text-xs">
                      <span className="text-slate-400">Top 3 Position:</span>
                      <span className="font-medium">8 points needed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3">
                <h4 className="text-xs font-medium text-indigo-300 mb-2">This Week's Challenge</h4>
                <p className="text-xs text-slate-300">
                  Predict the impact of next Tuesday's employment report on the Fed's rate decision.
                  Boost your accuracy score by 15 points with a correct prediction!
                </p>
                <div className="mt-2 text-right">
                  <Button variant="outline" size="sm">
                    Participate
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Column 3: Navigation - 25% width */}
        <Card className="col-span-3 bg-slate-800/90 border border-slate-700 h-full">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <User size={16} className="mr-2 text-indigo-300" />
              <h3 className="text-sm font-medium text-indigo-300">Navigation</h3>
            </div>
            
            <div className="flex flex-col space-y-1">
              <Button 
                variant={activeTab === "overview" ? "default" : "outline"} 
                size="sm"
                className="justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <Award size={14} className="mr-2" />
                Overview
              </Button>
              
              <Button 
                variant={activeTab === "predictions" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setActiveTab("predictions")}
              >
                <FileText size={14} className="mr-2" />
                Predictions
              </Button>
              
              <Button 
                variant={activeTab === "account" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setActiveTab("account")}
              >
                <Mail size={14} className="mr-2" />
                Account
              </Button>
            </div>
            
            <Separator className="my-3 bg-slate-700/50" />
            
            <div>
              <h4 className="text-xs font-medium text-indigo-300 mb-2">Quick Links</h4>
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" size="sm" className="justify-start text-xs">
                  <Calendar size={14} className="mr-2" />
                  Meeting Calendar
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-xs">
                  <TrendingUp size={14} className="mr-2" />
                  My Analysis
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-xs">
                  <Trophy size={14} className="mr-2" />
                  Leaderboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
