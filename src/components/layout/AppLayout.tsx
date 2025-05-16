
import React from 'react';
import { NavBar } from './NavBar';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 text-gray-800 dark:text-gray-100">
      <main className="flex-grow overflow-hidden">
        <div className="h-full flex flex-col relative">
          {/* Theme toggle in top-right corner */}
          <div className="absolute top-2 right-3 z-10">
            <ThemeToggle />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={location.pathname}
            className="flex-grow overflow-hidden"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};
