import React from 'react';
import { 
  History, Download, FileText, Filter, Search, 
  TrendingUp, Activity, CheckCircle, AlertTriangle, 
  ArrowUpRight, BarChart3
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const HistoryStat = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-xl transition-colors",
        color === 'primary' ? "bg-primary/10 text-primary" :
        color === 'success' ? "bg-success/10 text-success" :
        color === 'info' ? "bg-info/10 text-info" : "bg-bg text-dark"
      )}>
        <Icon size={24} />
      </div>
      <ArrowUpRight size={16} className="text-muted group-hover:text-dark transition-colors" />
    </div>
    <h3 className="text-3xl font-black text-dark mb-1">{value}</h3>
    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{label}</p>
  </div>
);

const RequestHistory = () => {
  const requests = [
    { id: 'REQ-4829', hospital: 'City General', type: 'Trauma L1', units: '4 Units O-', status: 'Completed', time: '2h ago' },
    { id: 'REQ-4828', hospital: 'Apollo Health', type: 'Cardiac', units: '2 Units A+', status: 'Critical', time: '4h ago' },
    { id: 'REQ-4827', hospital: 'Fortis Mem.', type: 'Neuro', units: '3 Units B-', status: 'Pending', time: '6h ago' },
    { id: 'REQ-4826', hospital: 'City General', type: 'Trauma L2', units: '2 Units O+', status: 'Completed', time: '1d ago' },
    { id: 'REQ-4825', hospital: 'St. Mary’s', type: 'Cardiac', units: '1 Unit AB-', status: 'Completed', time: '2d ago' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Request History</h1>
          <p className="text-sm text-muted font-medium mt-1 italic">Transaction ledger for all emergency blood requests.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white border border-border rounded-xl text-xs font-bold text-dark hover:bg-bg transition-all flex items-center gap-2 shadow-sm">
            <FileText size={16} /> Import PDF
          </button>
          <button className="px-6 py-2.5 bg-dark text-white rounded-xl text-xs font-bold hover:bg-dark/90 transition-all flex items-center gap-2 shadow-lg">
            <Filter size={16} /> Filter Results
          </button>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HistoryStat label="Total Actions" value="4.2m" icon={TrendingUp} color="info" />
        <HistoryStat label="Blood Requests" value="128" icon={Activity} color="primary" />
        <HistoryStat label="Response Rate" value="98.6%" icon={CheckCircle} color="success" />
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-bg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search by Request ID, Hospital or Type..."
              className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Sort by:</span>
            <select className="bg-bg border border-border rounded-lg px-3 py-1.5 text-xs font-bold text-dark outline-none">
              <option>Newest First</option>
              <option>Priority Level</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg/50 text-[10px] font-bold text-muted uppercase tracking-widest">
                <th className="py-4 px-6">Request ID</th>
                <th className="py-4 px-6">Hospital</th>
                <th className="py-4 px-6">Emergency Type</th>
                <th className="py-4 px-6">Blood Units</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((req, idx) => (
                <tr 
                  key={idx} 
                  className={cn(
                    "border-b border-bg last:border-0 hover:bg-bg/30 transition-colors group",
                    req.status === 'Critical' ? "bg-primary/5" : ""
                  )}
                >
                  <td className="py-4 px-6">
                    <span className="font-black text-dark group-hover:text-primary transition-colors">{req.id}</span>
                  </td>
                  <td className="py-4 px-6 text-muted font-bold">{req.hospital}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-2.5 py-1 rounded text-[10px] font-bold tracking-tight uppercase",
                      req.type.includes('L1') ? "bg-primary/10 text-primary" : "bg-bg text-dark"
                    )}>
                      {req.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-dark">{req.units}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      req.status === 'Completed' ? "bg-success text-white shadow-lg shadow-success/20" :
                      req.status === 'Critical' ? "bg-primary text-white animate-pulse" : "bg-warning text-white"
                    )}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted font-medium text-xs italic">{req.time}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 text-muted hover:text-primary transition-colors hover:bg-primary-light rounded-lg shadow-sm">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auditor's Visual Index */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark p-6 rounded-3xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h4 className="text-sm font-bold flex items-center gap-2 mb-8 uppercase tracking-widest">
            <BarChart3 size={18} className="text-primary" /> Response Analytics
          </h4>
          <div className="h-24 w-full flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-t-sm relative group/bar">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-primary/60 transition-all duration-500 group-hover/bar:bg-primary" 
                  style={{ height: `${h}%` }} 
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Avg Response Time</p>
              <p className="text-2xl font-black">4m 12s</p>
            </div>
            <span className="text-[10px] font-bold text-success flex items-center gap-1">
              <TrendingUp size={12} /> +12.4%
            </span>
          </div>
        </div>

        <div className="bg-dark p-6 rounded-3xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-info/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h4 className="text-sm font-bold flex items-center gap-2 mb-8 uppercase tracking-widest">
            <Activity size={18} className="text-info" /> Criticality Index
          </h4>
          <div className="flex justify-center py-4">
             <div className="w-24 h-24 rounded-full border-8 border-white/5 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-8 border-info border-t-transparent animate-spin-slow" />
                <p className="text-xl font-black">74%</p>
             </div>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Emergency Success</p>
              <p className="text-2xl font-black">128/132</p>
            </div>
            <span className="text-[10px] font-bold text-info flex items-center gap-1">
              <CheckCircle size={12} /> Optimized
            </span>
          </div>
        </div>

        <div className="bg-primary p-6 rounded-3xl text-white relative overflow-hidden flex flex-col justify-center text-center animate-pulse-red">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          <h4 className="text-xl font-black uppercase tracking-widest mb-2">Request Blackout</h4>
          <p className="text-xs font-bold text-white/80 leading-relaxed">
            Infrastructure load at peak capacity. Prioritize Level 1 trauma requests only. Automated verification disabled.
          </p>
          <button className="mt-6 py-3 bg-white text-primary font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl hover:bg-primary-light transition-all">
            Review Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;
