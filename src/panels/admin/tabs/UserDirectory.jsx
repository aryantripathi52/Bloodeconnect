import React, { useState } from 'react';
import { 
  Users, UserPlus, ShieldAlert, ShieldCheck, 
  Search, Filter, ChevronDown, MoreVertical,
  Calendar, Activity, ArrowUpRight, History
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SummaryStat = ({ label, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-jade-sidebar/10 shadow-sm group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className={cn(
        "p-2.5 rounded-xl transition-colors",
        color === 'primary' ? "bg-primary/10 text-primary" :
        color === 'success' ? "bg-success/10 text-success" :
        color === 'jade' ? "bg-jade-accent/10 text-jade-accent" : "bg-jade-bg text-jade-sidebar"
      )}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{subtext}</span>
    </div>
    <h3 className="text-2xl font-bold text-jade-sidebar mb-1 group-hover:text-jade-accent transition-colors">{value}</h3>
    <p className="text-xs text-muted font-medium">{label}</p>
  </div>
);

const UserDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Rajesh Kumar', role: 'Super Admin', status: 'Active', lastActive: '2m ago', avatar: 'https://i.pravatar.cc/150?u=u1', email: 'rajesh@bloodconnect.ai' },
    { id: 2, name: 'Sarah Chen', role: 'Verified Donor', status: 'Suspended', lastActive: '3d ago', avatar: 'https://i.pravatar.cc/150?u=u2', email: 'sarah.c@gmail.com' },
    { id: 3, name: 'Dr. Anjali Sharma', role: 'Hospital Head', status: 'Active', lastActive: '15m ago', avatar: 'https://i.pravatar.cc/150?u=u3', email: 'dr.anjali@hospital.com' },
    { id: 4, name: 'Amit Singh', role: 'Verified Donor', status: 'Active', lastActive: '1h ago', avatar: 'https://i.pravatar.cc/150?u=u4', email: 'amit.singh@outlook.com' },
    { id: 5, name: 'Vikram Mehta', role: 'Bank Manager', status: 'Active', lastActive: '4h ago', avatar: 'https://i.pravatar.cc/150?u=u5', email: 'vikram@bloodbank.in' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryStat label="Total Registered" value="1,284" subtext="ALL USERS" icon={Users} color="jade" />
        <SummaryStat label="System Admins" value="24" subtext="INTERNAL" icon={ShieldCheck} color="info" />
        <SummaryStat label="Active Donors" value="412" subtext="VERIFIED" icon={Activity} color="success" />
        <SummaryStat label="Suspended Accounts" value="09" subtext="CRITICAL" icon={ShieldAlert} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main User Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-jade-sidebar/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-jade-bg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name, email or role..."
                    className="w-full pl-10 pr-4 py-2.5 bg-jade-bg border border-jade-sidebar/10 rounded-xl text-sm focus:ring-2 focus:ring-jade-accent/20 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2.5 border border-jade-sidebar/10 rounded-xl text-sm font-bold text-jade-sidebar flex items-center gap-2 hover:bg-jade-bg transition-colors">
                  <Filter size={18} /> Filter
                </button>
              </div>
              <button className="px-6 py-2.5 bg-jade-accent text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-jade-accent/90 transition-all shadow-lg shadow-jade-accent/20">
                <UserPlus size={18} /> NEW ENTRY
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-jade-bg text-[10px] uppercase tracking-wider text-muted font-bold">
                    <th className="py-4 px-6">User Identity</th>
                    <th className="py-4 px-6">Role / Level</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Activity</th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((user) => (
                    <tr 
                      key={user.id} 
                      className={cn(
                        "border-b border-jade-bg last:border-0 hover:bg-jade-bg/30 transition-colors group",
                        user.status === 'Suspended' ? "bg-primary/5" : ""
                      )}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} className="w-10 h-10 rounded-xl border border-jade-bg shadow-sm" alt="" />
                          <div>
                            <p className="font-bold text-jade-sidebar leading-tight">{user.name}</p>
                            <p className="text-[11px] text-muted font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[10px] font-bold tracking-tight",
                          user.role === 'Super Admin' ? "bg-jade-sidebar text-white" : "bg-jade-bg text-jade-sidebar"
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            user.status === 'Active' ? "bg-success" : "bg-primary"
                          )} />
                          <span className={cn(
                            "text-xs font-bold",
                            user.status === 'Active' ? "text-success" : "text-primary"
                          )}>{user.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted font-medium text-xs">
                        {user.lastActive}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-muted hover:text-jade-accent transition-colors hover:bg-jade-bg rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Audit Log & Matrix */}
        <div className="lg:col-span-1 space-y-6">
          {/* Access Matrix */}
          <div className="bg-white p-6 rounded-3xl border border-jade-sidebar/10 shadow-sm">
            <h4 className="text-sm font-bold text-jade-sidebar mb-6 flex items-center gap-2">
              <Activity size={18} className="text-jade-accent" /> Access Matrix
            </h4>
            <div className="space-y-6">
              <div className="h-6 bg-jade-bg rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-jade-accent w-[65%] shadow-lg" />
                <div className="h-full bg-jade-sidebar w-[35%]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-jade-accent" />
                    <span className="text-[11px] font-bold text-jade-sidebar">External Users</span>
                  </div>
                  <p className="text-xl font-bold pl-4.5">834</p>
                  <p className="text-[10px] text-muted pl-4.5">65.2% of Total</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-jade-sidebar" />
                    <span className="text-[11px] font-bold text-jade-sidebar">Internal Admins</span>
                  </div>
                  <p className="text-xl font-bold pl-4.5">450</p>
                  <p className="text-[10px] text-muted pl-4.5">34.8% of Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Audit Log */}
          <div className="bg-white p-6 rounded-3xl border border-jade-sidebar/10 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-jade-sidebar flex items-center gap-2">
                <History size={18} className="text-jade-accent" /> Security Audit
              </h4>
              <ArrowUpRight size={16} className="text-muted" />
            </div>
            <div className="space-y-5">
              {[
                { id: 1, user: 'Admin-04', action: 'Modified Permissions', time: '12m ago', type: 'perm' },
                { id: 2, user: 'Sys-Bot', action: 'Failed Login Attempt', time: '45m ago', type: 'warn' },
                { id: 3, user: 'Admin-01', action: 'Suspended Sarah Chen', time: '2h ago', type: 'suspend' },
              ].map((log) => (
                <div key={log.id} className="flex gap-4 items-start group">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    log.type === 'perm' ? "bg-info/10 text-info" :
                    log.type === 'warn' ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                  )}>
                    <ShieldAlert size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-jade-sidebar">{log.user}</p>
                      <span className="text-[10px] text-muted font-medium">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-muted mt-0.5">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-jade-sidebar hover:bg-jade-bg transition-colors border border-jade-sidebar/10 rounded-xl">
              DOWNLOAD FULL AUDIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
