import React from 'react';
import { Bell, Search, ChevronDown, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TopBar = () => {
  const { currentUser } = useAppContext();
  const location = useLocation();
  const isAdmin = currentUser.panel === 'admin';

  // Extract page title from URL
  const pathParts = location.pathname.split('/');
  const rawTitle = pathParts[pathParts.length - 1];
  const pageTitle = rawTitle ? rawTitle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Dashboard';

  return (
    <header className={cn(
      "fixed top-0 left-[240px] right-0 h-16 border-b z-40 px-6 flex items-center justify-between shadow-sm transition-colors duration-300",
      isAdmin ? "bg-white border-jade-sidebar/10" : "bg-white border-border"
    )}>
      <div className="flex items-center gap-4">
        <h2 className={cn(
          "text-lg font-bold transition-colors",
          isAdmin ? "text-jade-sidebar" : "text-dark"
        )}>{pageTitle}</h2>
        <div className="relative ml-8 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search donors, requests, or camps..."
            className={cn(
              "pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 w-[300px] transition-all",
              isAdmin 
                ? "bg-jade-bg border-jade-sidebar/10 focus:ring-jade-accent/20" 
                : "bg-bg border-border focus:ring-primary/20"
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted hover:text-dark hover:bg-bg rounded-full transition-colors">
          <Bell size={20} />
          <span className={cn(
            "absolute top-1 right-1 w-4 h-4 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white",
            isAdmin ? "bg-jade-accent" : "bg-primary"
          )}>
            3
          </span>
        </button>

        <div className="h-8 w-px bg-border mx-2" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={cn(
              "w-9 h-9 rounded-full border transition-colors shadow-sm",
              isAdmin ? "border-jade-sidebar/10 group-hover:border-jade-accent" : "border-border group-hover:border-primary"
            )}
          />
          <div className="hidden lg:block">
            <p className={cn(
              "text-sm font-semibold leading-tight transition-colors",
              isAdmin ? "text-jade-sidebar group-hover:text-jade-accent" : "text-dark group-hover:text-primary"
            )}>
              {currentUser.name}
            </p>
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider">
              {currentUser.role}
            </p>
          </div>
          <ChevronDown size={16} className={cn(
            "text-muted transition-colors",
            isAdmin ? "group-hover:text-jade-accent" : "group-hover:text-primary"
          )} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
