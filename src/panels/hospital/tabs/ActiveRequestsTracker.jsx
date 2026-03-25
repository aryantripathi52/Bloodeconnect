import React from 'react';
import { 
  Timer, Activity, Users, AlertCircle, 
  ChevronLeft, ChevronRight, Search, Filter,
  ShieldAlert, Clock, User
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ETATimer = ({ label, value, color }) => (
  <div className="flex-1 bg-white p-6 rounded-3xl border border-border shadow-sm group hover:shadow-md transition-all text-center relative overflow-hidden">
    <div className={cn(
      "absolute top-0 left-0 w-full h-1",
      color === 'primary' ? "bg-primary" : "bg-info"
    )} />
    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">{label}</p>
    <h3 className={cn(
      "text-3xl font-black transition-colors",
      color === 'primary' ? "text-primary group-hover:text-dark" : "text-info group-hover:text-dark"
    )}>{value}</h3>
    <div className="mt-4 flex justify-center">
      <Timer size={16} className="text-muted group-hover:animate-spin-slow" />
    </div>
  </div>
);

const ActiveRequestsTracker = () => {
  const requests = [
    { id: 1, name: 'Jameson Robert', admitted: '12:45 PM', bloodType: 'O-', surgery: 'Trauma L1', status: 'Critical', doctor: 'Dr. Jameson', color: 'primary' },
    { id: 2, name: 'Chell Ria', admitted: '01:12 PM', bloodType: 'A+', surgery: 'Cardiac', status: 'In-Transit', doctor: 'Dr. Rossi', color: 'info' },
    { id: 3, name: 'Patterson Sarah', admitted: '01:30 PM', bloodType: 'B-', surgery: 'Neurology', status: 'Stable', doctor: 'Dr. Chen', color: 'success' },
    { id: 4, name: 'Vikram Singh', admitted: '01:45 PM', bloodType: 'O+', surgery: 'General', status: 'Waiting', doctor: 'Dr. Mehta', color: 'warning' },
    { id: 5, name: 'Ananya Iyer', admitted: '02:05 PM', bloodType: 'AB-', surgery: 'Burn Unit', status: 'Critical', doctor: 'Dr. Gupta', color: 'primary' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Active Requests Tracker</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex bg-white p-1 rounded-xl border border-border shadow-sm">
              {['All', 'High Priority', 'Standard'].map((tab) => (
                <button 
                  key={tab}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest",
                    tab === 'High Priority' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted hover:text-dark"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary/20 animate-pulse">
              <AlertCircle size={14} /> High Demand - Section X
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Countdown Timers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ETATimer label="Avg Response ETA" value="04:12" color="primary" />
        <ETATimer label="Surgical Wait" value="12:45" color="info" />
        <ETATimer label="Donors Responding" value="03" color="primary" />
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg/50 text-[10px] font-black text-muted uppercase tracking-widest border-b border-border">
                <th className="py-5 px-8">Patient Identity</th>
                <th className="py-5 px-8">Admitted Time</th>
                <th className="py-5 px-8">Blood Group</th>
                <th className="py-5 px-8">Emergency Class</th>
                <th className="py-5 px-8">Live Status</th>
                <th className="py-5 px-8">Assigned Doctor</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((req) => (
                <tr 
                  key={req.id} 
                  className={cn(
                    "border-b border-bg last:border-0 hover:bg-bg/30 transition-all group relative",
                    req.status === 'Critical' ? "bg-primary/5" : ""
                  )}
                >
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-1 h-10 rounded-full transition-all group-hover:scale-y-110",
                        req.color === 'primary' ? "bg-primary" : 
                        req.color === 'info' ? "bg-info" : "bg-success"
                      )} />
                      <div>
                        <p className="font-black text-dark group-hover:text-primary transition-colors">{req.name}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">ID: P-00{req.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2 text-muted font-bold">
                      <Clock size={14} /> {req.admitted}
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2",
                      req.color === 'primary' ? "border-primary/20 bg-primary/5 text-primary" : "border-bg bg-bg text-dark"
                    )}>
                      {req.bloodType}
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="px-3 py-1 bg-dark text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm">
                      {req.surgery}
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md",
                      req.status === 'Critical' ? "bg-primary text-white animate-pulse" :
                      req.status === 'In-Transit' ? "bg-info text-white" :
                      req.status === 'Stable' ? "bg-success text-white" : "bg-warning text-white"
                    )}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-muted">
                        <User size={16} />
                      </div>
                      <span className="font-bold text-dark">{req.doctor}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-bg/50 border-t border-border flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Showing 5 of 12 active requests</p>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRequestsTracker;
