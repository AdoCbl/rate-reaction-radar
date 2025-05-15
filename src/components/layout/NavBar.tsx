
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
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white py-2 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        <ul className="flex justify-between items-center">
          <NavItem to="/" icon={<BarChart3 size={20} />} label="Poll" />
          <NavItem to="/results" icon={<Activity size={20} />} label="Results" />
          <NavItem to="/trends" icon={<LineChart size={20} />} label="Trends" />
          <NavItem to="/game" icon={<Award size={20} />} label="Game" />
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
          `flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors ${
            isActive 
              ? 'text-primary font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          }`
        }
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </NavLink>
    </li>
  );
};
