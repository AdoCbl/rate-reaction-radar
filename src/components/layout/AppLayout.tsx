
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
      <main className="flex-grow overflow-auto px-4">
        <div className="container max-w-5xl mx-auto h-[calc(100vh-48px)] flex flex-col">
          {/* Theme Toggle positioned in the top right with minimal spacing */}
          <div className="flex justify-end h-8 items-center">
            <ThemeToggle />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={location.pathname}
            className="flex-grow"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};
