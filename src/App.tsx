
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Import pages
import SentimentPoll from "./pages/SentimentPoll";
import ResultsDashboard from "./pages/ResultsDashboard";
import HistoricalTrends from "./pages/HistoricalTrends";
import RateReactionGame from "./pages/RateReactionGame";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><SentimentPoll /></AppLayout>} />
          <Route path="/results" element={<AppLayout><ResultsDashboard /></AppLayout>} />
          <Route path="/trends" element={<AppLayout><HistoricalTrends /></AppLayout>} />
          <Route path="/game" element={<AppLayout><RateReactionGame /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><UserProfile /></AppLayout>} />
          <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
