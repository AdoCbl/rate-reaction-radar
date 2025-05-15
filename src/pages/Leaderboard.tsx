
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Calendar, TrendingUp, UserCircle } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

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
  // For now, we'll just use the same data for demo purposes
  
  const handleTimeFrameChange = (frame: 'weekly' | 'monthly' | 'all-time') => {
    setTimeFrame(frame);
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Award className="text-primary mr-3" size={24} />
            <h2 className="text-xl font-semibold">Rate Reaction Game Leaderboard</h2>
          </div>
        </div>
        
        {/* Time frame selector */}
        <div className="flex space-x-2 mt-4">
          <Badge 
            variant={timeFrame === 'weekly' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleTimeFrameChange('weekly')}
          >
            Weekly
          </Badge>
          <Badge 
            variant={timeFrame === 'monthly' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleTimeFrameChange('monthly')}
          >
            Monthly
          </Badge>
          <Badge 
            variant={timeFrame === 'all-time' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleTimeFrameChange('all-time')}
          >
            All-time
          </Badge>
        </div>
      </Card>

      {/* Leaderboard Table */}
      <Card className="p-6">
        {/* Top 3 podium on larger screens */}
        <div className="hidden md:flex justify-center space-x-8 mb-8">
          {/* 2nd place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-gray-300">
              <UserCircle size={60} className="text-gray-500" />
            </div>
            <div className="bg-gray-200 w-24 h-24 flex flex-col items-center justify-center rounded-t-lg">
              <Badge className="bg-gray-500">2nd Place</Badge>
              <p className="font-semibold mt-1">{leaderboardData[1].username}</p>
              <p className="text-xl font-bold">{leaderboardData[1].score}</p>
            </div>
          </div>
          
          {/* 1st place */}
          <div className="flex flex-col items-center -mt-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-primary">
              <UserCircle size={72} className="text-primary" />
            </div>
            <div className="bg-primary bg-opacity-10 w-32 h-32 flex flex-col items-center justify-center rounded-t-lg">
              <Badge className="bg-primary">1st Place</Badge>
              <p className="font-semibold mt-1">{leaderboardData[0].username}</p>
              <p className="text-2xl font-bold">{leaderboardData[0].score}</p>
            </div>
          </div>
          
          {/* 3rd place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-direction-neutral">
              <UserCircle size={48} className="text-gray-500" />
            </div>
            <div className="bg-gray-100 w-20 h-20 flex flex-col items-center justify-center rounded-t-lg">
              <Badge className="bg-direction-neutral">3rd Place</Badge>
              <p className="font-semibold mt-1">{leaderboardData[2].username}</p>
              <p className="text-lg font-bold">{leaderboardData[2].score}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-4">Top Performers</h3>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div 
                key={user.id} 
                className="p-4 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${user.rank === 1 ? 'bg-primary text-white' : 
                        user.rank === 2 ? 'bg-gray-500 text-white' : 
                        user.rank === 3 ? 'bg-direction-neutral text-white' : 
                        'bg-gray-100 text-gray-700'}`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{user.username}</p>
                        {user.badges.length > 0 && (
                          <div className="flex ml-2 gap-1">
                            {user.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-1">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex text-xs text-gray-500 mt-1">
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
                    <div className="flex justify-end text-xs text-gray-500 mt-1">
                      <div className="flex items-center mr-2">
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
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Your Position */}
        <div>
          <h3 className="text-lg font-medium mb-4">Your Position</h3>
          <div className="p-4 border border-primary border-opacity-30 bg-primary bg-opacity-5 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-700">
                  5
                </div>
                <div>
                  <p className="font-medium">JohnDoe (You)</p>
                  <div className="flex text-xs text-gray-500 mt-1">
                    <span className="mr-3">Games: 24</span>
                    <span>Since: Apr 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold">82</div>
                <div className="flex justify-end text-xs text-gray-500 mt-1">
                  <div className="flex items-center mr-2">
                    <TrendingUp className="h-3 w-3 text-direction-up mr-1" />
                    <span>+5 this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="mt-6">
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
      </Card>
    </div>
  );
};

export default Leaderboard;
