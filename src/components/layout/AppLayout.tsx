
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
      <header className="border-b border-blue-200 dark:border-blue-900 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 flex justify-end items-center h-12">
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-grow overflow-auto py-2 px-4">
        <div className="container max-w-5xl mx-auto h-[calc(100vh-100px)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={location.pathname}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};
