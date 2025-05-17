
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
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <main className="flex-grow overflow-auto pt-2 px-2 sm:px-4">
        <div className="container max-w-7xl mx-auto h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] flex flex-col">
          {/* Theme Toggle positioned in the top right with minimal spacing */}
          <div className="flex justify-end h-6 items-center">
            <ThemeToggle />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={location.pathname}
            className="flex-grow overflow-x-hidden"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};
