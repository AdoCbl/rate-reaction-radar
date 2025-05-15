
import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Interest Rate Sentiment');

  // Update page title based on the current route
  useEffect(() => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100">
      <header className="border-b border-blue-200 dark:border-blue-900 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1 
            className="text-xl font-semibold text-blue-800 dark:text-blue-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={pageTitle}
            transition={{ duration: 0.3 }}
          >
            {pageTitle}
          </motion.h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          key={location.pathname}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      
      <NavBar />
    </div>
  );
};
