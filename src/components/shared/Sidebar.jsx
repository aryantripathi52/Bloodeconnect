import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { panelConfig } from '../../data/mockData';
import { 
  LogOut, LayoutDashboard, User, ShieldCheck, Activity, 
  BarChart3, Settings, PlusCircle, History, Droplet, 
  Users, Heart, MapPin, ClipboardList, Info, Award, 
  BookOpen, ShieldAlert, Package, Truck, AlertTriangle, 
  Timer, Map as MapIcon, TrendingUp, Download, Building2 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const iconMap = {
  'Dashboard overview': LayoutDashboard,
  'User management': Users,
  'Donor verification queue': ShieldCheck,
  'Active SOS requests': Activity,
  'Analytics & reports': BarChart3,
  'System settings': Settings,
  'Raise SOS request': PlusCircle,
  'Active requests tracker': Activity,
  'Blood inventory': Droplet,
  'Donor pool nearby': Users,
  'Request history': History,
  'My profile & availability': User,
  'Incoming SOS alerts': ShieldAlert,
  'Donation history': History,
  'Trust score & badges': Award,
  'Nearby blood camps': MapPin,
  'SOS request form': PlusCircle,
  'Live donor tracker': MapPin,
  'Matched donors list': Users,
  'Nearby blood banks': Building2,
  'My profile': User,
  'FAQ': Info,
  'Award gallery': Award,
  'How to use': BookOpen,
  'Privacy policy': ShieldCheck,
  'Create blood camp': PlusCircle,
  'Manage registrations': ClipboardList,
  'AI location suggestions': MapPin,
  'Camp analytics': BarChart3,
  'Donor reach report': BarChart3,
  'Stock levels by group': Droplet,
  'Incoming requests': Activity,
  'Hospital connections': Building2,
  'Shortage alerts': AlertTriangle,
  'Expiry tracker': Timer,
  'National demand map': MapIcon,
  'City-wise shortage report': AlertTriangle,
  'Donor growth trends': TrendingUp,
  'Emergency response stats': Activity,
  'Export & policy reports': Download
};

const Sidebar = () => {
  const { currentUser } = useAppContext();
  const config = panelConfig[currentUser.panel];
  const isAdmin = currentUser.panel === 'admin';

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen w-[240px] border-r flex flex-col z-50 transition-colors duration-300",
      isAdmin ? "bg-jade-sidebar border-white/10" : "bg-white border-border"
    )}>
      <div className={cn(
        "p-6 border-b",
        isAdmin ? "border-white/10" : "border-border"
      )}>
        <h1 className={cn(
          "text-xl font-bold flex items-center gap-2",
          isAdmin ? "text-jade-accent-light" : "text-primary"
        )}>
          🩸 BloodConnect AI
        </h1>
        <div className="mt-2">
          <p className={cn(
            "text-sm font-semibold",
            isAdmin ? "text-white/90" : "text-dark"
          )}>{config.name}</p>
          <p className={cn(
            "text-xs italic leading-tight",
            isAdmin ? "text-white/50" : "text-muted"
          )}>{config.role}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {config.tabs.map((tab) => {
          const Icon = iconMap[tab] || LayoutDashboard;
          const tabSlug = tab.toLowerCase().replace(/ /g, '-');
          return (
            <NavLink
              key={tab}
              to={`/${currentUser.panel}/${tabSlug}`}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-4",
                isAdmin 
                  ? isActive 
                    ? "bg-white/10 text-white font-semibold border-jade-accent" 
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  : isActive
                    ? "bg-gray-50 text-dark font-semibold border-primary"
                    : "border-transparent text-muted hover:text-dark hover:bg-gray-50"
              )}
            >
              <Icon 
                size={18} 
                className={cn(
                  "opacity-80 transition-colors",
                  isAdmin 
                    ? "text-jade-accent-light" 
                    : "text-primary"
                )} 
              />
              {tab}
            </NavLink>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t mt-auto",
        isAdmin ? "bg-white/5 border-white/10" : "bg-gray-50 border-border"
      )}>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={cn(
              "w-10 h-10 rounded-full border-2 shadow-sm",
              isAdmin ? "border-jade-accent" : "border-white"
            )}
          />
          <div className="overflow-hidden">
            <p className={cn(
              "text-sm font-bold truncate",
              isAdmin ? "text-white" : "text-dark"
            )}>{currentUser.name}</p>
            <span 
              className={cn(
                "text-[10px] px-2 py-0.5 rounded-full text-white font-medium",
                isAdmin ? "bg-jade-accent" : "bg-primary"
              )}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
        <button className={cn(
          "w-full flex items-center justify-center gap-2 py-2 text-sm rounded-lg transition-all border font-medium",
          isAdmin
            ? "text-white/80 hover:text-white hover:bg-white/10 border-white/20"
            : "text-primary hover:bg-primary-light border-primary/20"
        )}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
