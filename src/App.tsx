
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ThemeProvider } from './context/ThemeContext';
import HistoricalTrends from './pages/HistoricalTrends';
import RateReactionGame from './pages/RateReactionGame';
import Leaderboard from './pages/Leaderboard';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/trends" element={<AppLayout><HistoricalTrends /></AppLayout>} />
            <Route path="/game" element={<AppLayout><RateReactionGame /></AppLayout>} />
            <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><UserProfile /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
