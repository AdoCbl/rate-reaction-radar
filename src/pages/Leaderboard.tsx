
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Calendar, Trophy, UserCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Mock leaderboard data - in a real app this would come from an API
const leaderboardData = [
  { 
    id: 1, 
    username: 'JaneDoe', 
    rank: 1, 
    score: 94, 
    accuracy: 89, 
    confidenceRating: 85,
    gamesPlayed: 32,
    badges: ['Top Forecaster', 'Consistent Player'],
    lastActive: '2025-05-12'
  },
  { 
    id: 2, 
    username: 'MikeSmith', 
    rank: 2, 
    score: 91, 
    accuracy: 87, 
    confidenceRating: 92,
    gamesPlayed: 28,
    badges: ['Rising Star'],
    lastActive: '2025-05-14'
  },
  { 
    id: 3, 
    username: 'AlexWong', 
    rank: 3, 
    score: 88, 
    accuracy: 85, 
    confidenceRating: 90,
    gamesPlayed: 35,
    badges: ['Yield Expert', 'Consistent Player'],
    lastActive: '2025-05-13'
  },
  { 
    id: 4, 
    username: 'SarahJohnson', 
    rank: 4, 
    score: 85, 
    accuracy: 82, 
    confidenceRating: 78,
    gamesPlayed: 25,
    badges: ['Most Improved'],
    lastActive: '2025-05-11'
  },
  { 
    id: 5, 
    username: 'JohnDoe', 
    rank: 5, 
    score: 82, 
    accuracy: 78, 
    confidenceRating: 84,
    gamesPlayed: 24,
    badges: ['Regular Contributor'],
    lastActive: '2025-05-10'
  },
  // Limiting to top 5 to fit on single screen
];

const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = React.useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Rate Reaction Game Leaderboard</h1>
            <p className="text-sm text-muted-foreground">See how you rank against other players</p>
          </div>
          
          {/* Time frame selector using consistent tab styling */}
          <Tabs 
            value={timeFrame} 
            onValueChange={(value) => setTimeFrame(value as 'weekly' | 'monthly' | 'all-time')}
            className="w-64"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All-time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full h-full shadow-md bg-slate-800/90 border border-slate-700">
            <CardHeader className="p-4 pb-2">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                <span>Top Player</span>
              </h2>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex flex-col items-center justify-center h-[calc(100%-60px)]">
              <div className="flex flex-col items-center mb-2">
                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-3 border-2 border-primary">
                  <Trophy size={28} className="text-primary" />
                </div>
                <Badge className="mb-1">1st Place</Badge>
                <p className="text-lg font-bold">{leaderboardData[0].username}</p>
                <p className="text-2xl font-bold text-primary mt-1">{leaderboardData[0].score}</p>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  <div>Accuracy: {leaderboardData[0].accuracy}%</div>
                  <div>Games: {leaderboardData[0].gamesPlayed}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Top Players List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="shadow-md h-full">
            <CardHeader className="p-4 pb-2">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Award size={18} />
                <span>Leaderboard</span>
              </h2>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2 overflow-auto max-h-[calc(100vh-250px)]">
                {leaderboardData.map((user) => (
                  <motion.div 
                    key={user.id} 
                    className="p-3 bg-card hover:bg-accent/10 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white
                          ${user.rank === 1 ? 'bg-primary' : 
                            user.rank === 2 ? 'bg-slate-500' : 
                            user.rank === 3 ? 'bg-amber-500' : 
                            'bg-slate-400'}`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{user.username}</p>
                            <div className="flex gap-1">
                              {user.badges.slice(0, 1).map((badge, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex text-xs text-muted-foreground mt-1">
                            <span className="flex items-center mr-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              Last: {new Date(user.lastActive).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="mr-3">Games: {user.gamesPlayed}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">{user.score}</div>
                        <div className="flex justify-end text-xs text-muted-foreground mt-1 space-x-2">
                          <div className="flex items-center">
                            <span className="mr-1">Accuracy:</span>
                            <span className="font-medium">{user.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Separator className="my-3" />
              
              {/* Your Position */}
              <motion.div 
                className="p-3 border border-primary/30 bg-primary/5 rounded-lg"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 text-primary font-medium">
                      5
                    </div>
                    <div>
                      <p className="font-medium">JohnDoe (You)</p>
                      <div className="flex text-xs text-muted-foreground mt-1">
                        <span className="mr-3">Games: 24</span>
                        <span>Since: Apr 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">82</div>
                    <div className="flex justify-end text-xs text-emerald-600 dark:text-emerald-500 font-medium mt-1">
                      <div className="flex items-center">
                        +5 this week
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
