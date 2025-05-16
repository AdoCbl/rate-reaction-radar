import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Calendar, Trophy, UserCircle } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  { 
    id: 6, 
    username: 'EmmaWilson', 
    rank: 6, 
    score: 79, 
    accuracy: 75, 
    confidenceRating: 80,
    gamesPlayed: 19,
    badges: ['New Player'],
    lastActive: '2025-05-11'
  },
  { 
    id: 7, 
    username: 'DavidClark', 
    rank: 7, 
    score: 76, 
    accuracy: 73, 
    confidenceRating: 81,
    gamesPlayed: 21,
    badges: [],
    lastActive: '2025-05-09'
  },
  { 
    id: 8, 
    username: 'OliviaBrown', 
    rank: 8, 
    score: 72, 
    accuracy: 68, 
    confidenceRating: 75,
    gamesPlayed: 15,
    badges: [],
    lastActive: '2025-05-07'
  },
  { 
    id: 9, 
    username: 'JamesMiller', 
    rank: 9, 
    score: 68, 
    accuracy: 65, 
    confidenceRating: 70,
    gamesPlayed: 17,
    badges: [],
    lastActive: '2025-05-08'
  },
  { 
    id: 10, 
    username: 'SophiaTaylor', 
    rank: 10, 
    score: 65, 
    accuracy: 62, 
    confidenceRating: 68,
    gamesPlayed: 12,
    badges: [],
    lastActive: '2025-05-05'
  }
];

const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = React.useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  
  // In a real app, we would filter the data based on the selected timeframe
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold leading-tight">Rate Reaction Game Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other players based on your forecasting accuracy</p>
        </div>
        
        {/* Time frame selector using consistent tab styling */}
        <Tabs 
          value={timeFrame} 
          onValueChange={(value) => setTimeFrame(value as 'weekly' | 'monthly' | 'all-time')}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="all-time">All-time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Leaderboard Content Card */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-0">
          {/* Top 3 podium - centered and proportional */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8">
            <motion.div 
              className="flex justify-center items-end space-x-6 md:space-x-12 mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* 2nd place */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2 border-2 border-slate-300 dark:border-slate-600">
                  <UserCircle size={48} className="text-slate-500" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 flex flex-col items-center justify-center rounded-lg shadow-sm">
                  <Badge variant="secondary" className="mb-1">2nd Place</Badge>
                  <p className="font-semibold text-center">{leaderboardData[1].username}</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{leaderboardData[1].score}</p>
                </div>
              </div>
              
              {/* 1st place */}
              <div className="flex flex-col items-center -mb-4">
                <div className="w-20 h-20 md:w-22 md:h-22 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2 border-2 border-primary">
                  <Trophy size={42} className="text-primary" />
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 w-28 h-32 flex flex-col items-center justify-center rounded-lg shadow-md">
                  <Badge className="mb-1">1st Place</Badge>
                  <p className="font-semibold text-center">{leaderboardData[0].username}</p>
                  <p className="text-2xl font-bold text-primary">{leaderboardData[0].score}</p>
                </div>
              </div>
              
              {/* 3rd place */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2 border-2 border-amber-400 dark:border-amber-600">
                  <UserCircle size={40} className="text-slate-500" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 w-24 h-20 flex flex-col items-center justify-center rounded-lg shadow-sm">
                  <Badge variant="outline" className="mb-1 border-amber-400 text-amber-600">3rd Place</Badge>
                  <p className="font-semibold text-center">{leaderboardData[2].username}</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{leaderboardData[2].score}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Top Performers Table */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
            <div className="space-y-3">
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
                            {user.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex text-xs text-muted-foreground mt-1">
                          <span className="flex items-center mr-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            Last played: {new Date(user.lastActive).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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
                        <div className="flex items-center">
                          <span className="mr-1">Confidence:</span>
                          <span className="font-medium">{user.confidenceRating}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <Separator className="my-2" />
          
          {/* Your Position */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Position</h3>
            <motion.div 
              className="p-4 border border-primary/30 bg-primary/5 rounded-lg"
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
          </div>
          
          {/* Pagination */}
          <div className="p-6 pt-2 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
