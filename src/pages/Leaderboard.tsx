
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Calendar, Medal, Trophy, UserRound, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock leaderboard data
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
    lastActive: '2025-05-12',
    avatarSrc: ''
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
    lastActive: '2025-05-14',
    avatarSrc: ''
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
    lastActive: '2025-05-13',
    avatarSrc: ''
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
    lastActive: '2025-05-11',
    avatarSrc: ''
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
    lastActive: '2025-05-10',
    avatarSrc: ''
  },
  { 
    id: 6, 
    username: 'EmmaWilson', 
    rank: 6, 
    score: 79, 
    accuracy: 76, 
    confidenceRating: 82,
    gamesPlayed: 22,
    badges: ['New Player'],
    lastActive: '2025-05-09',
    avatarSrc: ''
  },
  { 
    id: 7, 
    username: 'DavidMiller', 
    rank: 7, 
    score: 76, 
    accuracy: 74, 
    confidenceRating: 80,
    gamesPlayed: 20,
    badges: ['Analytical Mind'],
    lastActive: '2025-05-08',
    avatarSrc: ''
  },
  { 
    id: 8, 
    username: 'OliviaRogers', 
    rank: 8, 
    score: 73, 
    accuracy: 71, 
    confidenceRating: 76,
    gamesPlayed: 18,
    badges: ['Quick Learner'],
    lastActive: '2025-05-07',
    avatarSrc: ''
  },
  { 
    id: 9, 
    username: 'JamesBrown', 
    rank: 9, 
    score: 70, 
    accuracy: 68, 
    confidenceRating: 72,
    gamesPlayed: 16,
    badges: ['Consistent'],
    lastActive: '2025-05-06',
    avatarSrc: ''
  },
  { 
    id: 10, 
    username: 'SophiaTaylor', 
    rank: 10, 
    score: 67, 
    accuracy: 65, 
    confidenceRating: 70,
    gamesPlayed: 14,
    badges: ['Newcomer'],
    lastActive: '2025-05-05',
    avatarSrc: ''
  },
];

// User data
const userData = {
  id: 5,
  username: 'JohnDoe',
  rank: 5,
  score: 82,
  accuracy: 78,
  confidenceRating: 84,
  gamesPlayed: 24,
  badges: ['Regular Contributor'],
  lastActive: '2025-05-10',
  avatarSrc: '',
  weeklyProgress: 5,
  joinedDate: 'Apr 2025'
};

const medalColors = {
  1: 'text-yellow-400', // Gold
  2: 'text-gray-400',   // Silver
  3: 'text-amber-600'   // Bronze
};

const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = React.useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  
  return (
    <div className="container mx-auto p-0 sm:p-0 md:p-1 lg:p-2">
      {/* Header: Title and Filters */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy size={24} className="text-primary" />
          Leaderboard
        </h1>
        
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

      {/* Main Content: Three Equal Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Card: Personal Rank */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-br from-slate-800/80 to-indigo-950/80 border border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2 text-indigo-300">
                <UserRound size={20} />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between h-[calc(100%-80px)]">
              <div className="w-full flex flex-col items-center">
                <div className="mb-4">
                  <Avatar className="h-20 w-20 border-2 border-primary">
                    {userData.avatarSrc ? (
                      <AvatarImage src={userData.avatarSrc} alt={userData.username} />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-lg">
                        {userData.username.substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
                    {userData.rank}
                  </div>
                  <h2 className="text-xl font-bold">{userData.username}</h2>
                  <Badge variant="outline" className="bg-primary/20 text-primary">You</Badge>
                </div>
                
                <div className="text-2xl font-bold text-primary mb-2">{userData.score}</div>
                
                <div className="grid grid-cols-2 gap-4 w-full px-2">
                  <div className="flex flex-col items-center p-2 bg-slate-800/50 rounded-md">
                    <span className="text-sm text-slate-400">Accuracy</span>
                    <span className="text-lg font-bold">{userData.accuracy}%</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-800/50 rounded-md">
                    <span className="text-sm text-slate-400">Games</span>
                    <span className="text-lg font-bold">{userData.gamesPlayed}</span>
                  </div>
                </div>
                
                <div className="mt-4 py-2 px-3 bg-emerald-500/10 text-emerald-400 rounded-md font-medium">
                  +{userData.weeklyProgress} this week
                </div>
              </div>
              
              <Button variant="outline" className="mt-4 w-full">
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Center Card: Podium (Top 3) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full bg-gradient-to-br from-slate-800/80 to-indigo-950/80 border border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2 text-indigo-300">
                <Award size={20} />
                Top Players
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center h-[calc(100%-80px)]">
              <div className="grid grid-cols-3 gap-2 w-full h-full">
                {leaderboardData.slice(0, 3).map((player, index) => {
                  // Calculate the podium height - 2nd place is tallest, then 1st, then 3rd
                  const podiumHeights = {
                    0: 'mt-8 h-[calc(100%-32px)]', // 1st place, slightly shorter
                    1: 'h-full', // 2nd place, tallest
                    2: 'mt-16 h-[calc(100%-64px)]', // 3rd place, shortest
                  };
                  
                  const rank = index + 1;
                  const medalColor = medalColors[rank as keyof typeof medalColors];
                  
                  return (
                    <div key={player.id} className={`flex flex-col items-center ${podiumHeights[index as keyof typeof podiumHeights]}`}>
                      <div className="flex flex-col items-center flex-grow justify-start bg-slate-800/60 rounded-t-lg px-2 pt-3 w-full">
                        <div className="relative">
                          <Avatar className={`h-16 w-16 border-2 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : 'border-amber-600'}`}>
                            {player.avatarSrc ? (
                              <AvatarImage src={player.avatarSrc} alt={player.username} />
                            ) : (
                              <AvatarFallback className="text-md">
                                {player.username.substring(0, 2)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className={`absolute -top-2 -right-2 bg-slate-800 rounded-full p-1 ${medalColor}`}>
                            <Medal size={14} />
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm font-medium text-center truncate w-full">
                          {player.username}
                        </div>
                        
                        <div className="mt-1 text-lg font-bold text-primary">
                          {player.score}
                        </div>
                        
                        {player.badges.length > 0 && (
                          <Badge variant="outline" className="mt-1 text-xs bg-slate-700/30">
                            {player.badges[0]}
                          </Badge>
                        )}
                      </div>
                      
                      <div className={`w-full flex items-center justify-center p-1 ${
                        rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                        rank === 2 ? 'bg-gray-500/20 text-gray-300' : 
                        'bg-amber-700/20 text-amber-500'
                      } rounded-b-lg`}>
                        #{rank}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Right Card: All Players List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-slate-800/80 to-indigo-950/80 border border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2 text-indigo-300">
                <Users size={20} />
                All Players
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1.5 overflow-auto max-h-[calc(100vh-180px)] pr-1">
                {leaderboardData.map((player) => (
                  <motion.div 
                    key={player.id} 
                    className={`p-2 rounded-lg border transition-colors ${
                      player.id === userData.id 
                        ? 'bg-primary/10 border-primary/30 shadow-sm shadow-primary/10' 
                        : 'bg-slate-800 hover:bg-slate-700/60 border-slate-700'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white
                          ${player.rank === 1 ? 'bg-yellow-500' : 
                            player.rank === 2 ? 'bg-gray-400' : 
                            player.rank === 3 ? 'bg-amber-600' : 
                            'bg-slate-600'}`}
                        >
                          {player.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium">{player.username}</p>
                            {player.id === userData.id && (
                              <Badge variant="outline" className="text-[0.65rem] px-1 py-0 h-4 bg-primary/10 text-primary border-primary/30">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-slate-400">
                            <span className="mr-2">Games: {player.gamesPlayed}</span>
                            <Badge variant="outline" className="text-[0.65rem] px-1 py-0 h-4">
                              {player.badges[0]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">{player.score}</div>
                        <div className="text-xs text-slate-400">
                          Accuracy: {player.accuracy}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
