
import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { useLocation } from 'react-router-dom';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Interest Rate Sentiment');

  // Update page title based on the current route
  React.useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPageTitle('Weekly Sentiment Poll');
        break;
      case '/results':
        setPageTitle('Live Results Dashboard');
        break;
      case '/trends':
        setPageTitle('Historical Sentiment Trends');
        break;
      case '/game':
        setPageTitle('Rate Reaction Game');
        break;
      case '/leaderboard':
        setPageTitle('Leaderboard');
        break;
      case '/profile':
        setPageTitle('Your Profile');
        break;
      default:
        setPageTitle('Interest Rate Sentiment');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-gray-200">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-finance-navy">{pageTitle}</h1>
        </div>
      </header>
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
      
      <NavBar />
    </div>
  );
};
