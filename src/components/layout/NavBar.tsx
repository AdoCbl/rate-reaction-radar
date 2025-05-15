
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  LineChart, 
  Activity, 
  Award, 
  UserCircle 
} from 'lucide-react';

export const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-blue-200 bg-white/80 backdrop-blur-md py-2 px-4 z-10 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <ul className="flex justify-between items-center">
          <NavItem to="/" icon={<BarChart3 size={20} />} label="Poll" />
          <NavItem to="/results" icon={<Activity size={20} />} label="Results" />
          <NavItem to="/trends" icon={<LineChart size={20} />} label="Trends" />
          <NavItem to="/game" icon={<Award size={20} />} label="Game" />
          <NavItem to="/leaderboard" icon={<BarChart3 size={20} />} label="Leaderboard" />
          <NavItem to="/profile" icon={<UserCircle size={20} />} label="Profile" />
        </ul>
      </div>
    </nav>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <li>
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center px-2 py-1 rounded-md transition-all duration-200 ${
            isActive 
              ? 'text-blue-600 font-medium scale-105 bg-blue-100/70 shadow-sm' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
          }`
        }
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </NavLink>
    </li>
  );
};
