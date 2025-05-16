
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, TrendingUp, Check, Calendar, Shield, LogOut, Mail, Trophy, FileText } from 'lucide-react';
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
    <div className="h-full flex flex-col gap-2">
      {/* User Identity Card */}
      <Card className="shadow-md p-1 bg-slate-800/90 border border-slate-700">
        <CardContent className="p-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {getInitials(userData.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-bold">{userData.fullName}</h2>
              <p className="text-xs text-slate-400">{userData.title}</p>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="overview" className="mt-0 h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
              {/* Performance Overview */}
              <Card className="shadow-md col-span-1 p-2 bg-slate-800/90 border border-slate-700">
                <div className="p-1 pb-0">
                  <h3 className="text-sm font-medium text-indigo-300">Performance Overview</h3>
                </div>
                <CardContent className="p-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <TrendingUp size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Forecast Accuracy</p>
                        <p className="text-base font-bold">{userData.accuracy}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <Shield size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Avg. Confidence</p>
                        <p className="text-base font-bold">{userData.confidence}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <Check size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Submissions</p>
                        <p className="text-base font-bold">{userData.submissions}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <Trophy size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Game Score</p>
                        <p className="text-base font-bold">{userData.gameScore}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Badges & Achievements */}
              <Card className="shadow-md col-span-2 p-2 bg-slate-800/90 border border-slate-700">
                <div className="p-1 pb-0 flex items-center">
                  <Award size={14} className="mr-2 text-indigo-300" />
                  <h3 className="text-sm font-medium text-indigo-300">Badges & Achievements</h3>
                </div>
                <CardContent className="p-1">
                  <div className="flex flex-wrap gap-1">
                    {userData.badges.map((badge) => (
                      <Badge key={badge.id} className="px-2 py-0.5 text-xs bg-slate-800 text-white hover:bg-slate-700" title={badge.description}>
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <h4 className="text-xs font-medium text-indigo-300 mb-1">Recent Stats</h4>
                      <ul className="space-y-0.5 text-xs">
                        <li className="flex justify-between">
                          <span className="text-slate-400">Accuracy (last 5):</span>
                          <span className="font-medium">83%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-400">Weekly rank:</span>
                          <span className="font-medium">#5</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-400">Best score:</span>
                          <span className="font-medium">92 (Apr 15)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <h4 className="text-xs font-medium text-indigo-300 mb-1">Next Achievements</h4>
                      <ul className="space-y-0.5 text-xs">
                        <li className="flex justify-between">
                          <span className="text-slate-400">Expert Forecaster:</span>
                          <span className="font-medium">2 more weeks</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-400">Perfect Streak:</span>
                          <span className="font-medium">1 more accurate</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-400">Top 3 Position:</span>
                          <span className="font-medium">8 points needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="predictions" className="mt-0 h-full">
            <Card className="shadow-md h-full p-2 bg-slate-800/90 border border-slate-700">
              <div className="p-1 pb-0 flex items-center">
                <FileText size={14} className="mr-1 text-indigo-300" />
                <h3 className="text-sm font-medium text-indigo-300">Recent Predictions</h3>
              </div>
              <CardContent className="p-1">
                <div className="space-y-1 overflow-auto max-h-[calc(100vh-180px)]">
                  {userData.gameResults.map((result) => (
                    <div key={result.id} className="p-1 border border-slate-700 rounded-md hover:bg-slate-700/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-medium">{result.scenario}</p>
                          <div className="flex gap-1 items-center">
                            <span className="text-xs text-slate-400">
                              {new Date(result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-xs px-1 py-0.5 bg-slate-700 rounded-full">
                              Pred: {result.predicted}
                            </span>
                            <span className="text-xs px-1 py-0.5 bg-slate-700 rounded-full">
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
                      <p className="text-xs text-slate-400 mt-0.5">{result.description}</p>
                    </div>
                  ))}
                  
                  <div className="mt-1 text-right">
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto text-xs">
                      View All Predictions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-0 h-full">
            <Card className="shadow-md h-full p-2 bg-slate-800/90 border border-slate-700">
              <div className="p-1 pb-0 flex items-center">
                <Mail size={14} className="mr-1 text-indigo-300" />
                <h3 className="text-sm font-medium text-indigo-300">Account</h3>
              </div>
              <CardContent className="p-1">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium">Email Address</p>
                      <p className="text-xs text-slate-400">{userData.email}</p>
                    </div>
                    <Button variant="destructive" size="sm" className="flex items-center gap-1 text-xs py-1">
                      <LogOut size={12} />
                      Log Out
                    </Button>
                  </div>

                  <Separator className="my-1 bg-slate-700/50" />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium">Email Notifications</p>
                      <p className="text-xs text-slate-400">Receive updates about new polls</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium">Appear on Leaderboard</p>
                      <p className="text-xs text-slate-400">Show your rankings publicly</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
