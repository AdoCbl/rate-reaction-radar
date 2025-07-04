
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, TrendingUp, Check, Trophy, Shield, Edit, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-6 py-4 max-w-7xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card - 1/3 width */}
        <Card className="col-span-12 md:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 border-2 border-primary/20 mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold mb-1">{userData.fullName}</h2>
                <p className="text-sm text-[#AAB4C5] mb-4">{userData.title}</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                  <Edit size={14} />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <Separator className="my-5 bg-slate-700/50" />
            
            <div>
              <h3 className="text-[20px] font-bold text-[#C2D1FF] mb-4 text-left">Performance Overview</h3>
              <div className="grid grid-cols-2 gap-5">
                <motion.div 
                  className="bg-slate-800/70 rounded-xl p-4 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <TrendingUp size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#AAB4C5]">Forecast Accuracy</p>
                      <p className="text-lg font-bold">{userData.accuracy}%</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/70 rounded-xl p-4 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Shield size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#AAB4C5]">Avg. Confidence</p>
                      <p className="text-lg font-bold">{userData.confidence}%</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/70 rounded-xl p-4 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#AAB4C5]">Submissions</p>
                      <p className="text-lg font-bold">{userData.submissions}</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/70 rounded-xl p-4 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Trophy size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#AAB4C5]">Game Score</p>
                      <p className="text-lg font-bold">{userData.gameScore}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Badges & Achievements Card - 2/3 width */}
        <Card className="col-span-12 md:col-span-8 bg-slate-800/90 border border-slate-700 rounded-2xl shadow-md">
          <CardContent className="p-5">
            <div>
              <div className="flex items-center mb-5">
                <Award size={20} className="mr-3 text-[#C2D1FF]" />
                <h3 className="text-[20px] font-bold text-[#C2D1FF]">Badges & Achievements</h3>
              </div>
              
              {/* Top row: badges */}
              <div className="bg-slate-800/60 rounded-xl p-4 mb-5">
                <h4 className="text-[16px] font-medium text-white mb-3">Your Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {userData.badges.map((badge) => (
                    <Badge 
                      key={badge.id} 
                      className="px-3 py-1.5 text-[14px] bg-slate-800 text-white hover:bg-slate-700 transition-colors" 
                      title={badge.description}
                    >
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Middle row: two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800/60 rounded-xl p-4">
                  <h4 className="text-[16px] font-medium text-white mb-3">Recent Stats</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Accuracy (last 5):</span>
                      <span className="font-medium">83%</span>
                    </li>
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Weekly rank:</span>
                      <span className="font-medium">#5</span>
                    </li>
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Best score:</span>
                      <span className="font-medium">92 (Apr 15)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/60 rounded-xl p-4">
                  <h4 className="text-[16px] font-medium text-white mb-3">Next Milestones</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Expert Forecaster:</span>
                      <span className="font-medium">2 more weeks</span>
                    </li>
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Perfect Streak:</span>
                      <span className="font-medium">1 more accurate</span>
                    </li>
                    <li className="flex justify-between text-[16px]">
                      <span className="text-[#AAB4C5]">Top 3 Position:</span>
                      <span className="font-medium">8 points needed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Bottom: challenge section */}
              <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5">
                <h4 className="text-[16px] font-medium text-white mb-3">This Week's Challenge</h4>
                <p className="text-[16px] text-slate-300 mb-5">
                  Predict the impact of next Tuesday's employment report on the Fed's rate decision.
                  Boost your accuracy score by 15 points with a correct prediction!
                </p>
                <div className="flex justify-end">
                  <Button size="default">
                    Participate
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
