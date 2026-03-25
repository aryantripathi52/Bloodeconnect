import React from 'react';
import { 
  Activity, Users, MapPin, Calendar, 
  ChevronRight, AlertCircle, FileText, 
  Monitor, Plus, CheckCircle, Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NGOKPICard = ({ title, value, subtext, icon: Icon, chip }) => (
  <div className="bg-white p-6 rounded-[24px] border border-border shadow-sm group hover:shadow-xl transition-all relative overflow-hidden">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-3 bg-amber-50 text-warning rounded-xl group-hover:bg-warning group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      {chip && (
        <span className={cn(
          "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
          chip.type === 'success' ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
        )}>
          {chip.label}
        </span>
      )}
    </div>
    <h3 className="text-3xl font-black text-dark mb-1">{value}</h3>
    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{title}</p>
    <p className="text-[11px] text-muted mt-2 font-medium">{subtext}</p>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-warning/5 rounded-full group-hover:scale-110 transition-transform duration-500" />
  </div>
);

const CampDashboard = () => {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Camp Dashboard</h1>
          <p className="text-sm text-muted font-medium mt-1">Welcome back, Dr. Priya. You have 3 active campaigns today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white border border-border rounded-xl text-xs font-bold text-dark hover:bg-bg transition-all flex items-center gap-2 shadow-sm">
            <FileText size={16} /> Report PDF
          </button>
          <button className="px-6 py-2.5 bg-warning text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all flex items-center gap-2 shadow-lg shadow-warning/20">
            <Monitor size={16} /> Live Monitor
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NGOKPICard title="Active Camps" value="14" subtext="+2 this week" icon={MapPin} chip={{ label: '+2 THIS WEEK', type: 'success' }} />
        <NGOKPICard title="Total Registrations" value="2,842" subtext="Units registered" icon={Users} />
        <NGOKPICard title="Resources to Distribute" value="19" subtext="4 Approvals needed" icon={Activity} chip={{ label: '4 APPROVALS', type: 'warning' }} />
        <NGOKPICard title="Pending Approvals" value="08" subtext="Action required" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Expeditions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-dark flex items-center gap-2">
              <Calendar size={18} className="text-warning" /> Upcoming Expeditions
            </h3>
            <button className="text-[10px] font-black text-warning uppercase hover:text-dark transition-colors">View All</button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { name: 'Northern Ridge Health Drive', date: 'Oct 13–18', loc: 'Kanpur Valley', progress: 75, status: 'Active' },
              { name: 'Sector 9 Pediatrics Clinic', date: 'Oct 28–30', loc: 'Mumbai South', progress: 40, status: 'Scheduled' },
              { name: 'City Plaza Mega Camp', date: 'Nov 05–10', loc: 'Delhi Central', progress: 15, status: 'Scheduled' },
            ].map((camp, idx) => (
              <div key={idx} className="min-w-[320px] bg-white p-6 rounded-[24px] border border-border shadow-sm group hover:shadow-xl transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                    camp.status === 'Active' ? "bg-success text-white" : "bg-warning text-white"
                  )}>
                    {camp.status}
                  </span>
                  <div className="w-10 h-10 bg-bg rounded-xl flex items-center justify-center text-muted group-hover:text-warning transition-colors">
                    <MapPin size={20} />
                  </div>
                </div>
                <h4 className="text-lg font-black text-dark mb-1 leading-tight group-hover:text-warning transition-colors">{camp.name}</h4>
                <p className="text-xs text-muted font-bold mb-6">{camp.date} • {camp.loc}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-muted uppercase">
                    <span>Target Capacity</span>
                    <span>{camp.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-warning rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(243,156,18,0.5)]" 
                      style={{ width: `${camp.progress}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stream */}
        <div className="bg-white p-6 rounded-[32px] border border-border shadow-sm flex flex-col h-full overflow-hidden">
          <h3 className="font-bold text-dark mb-6 flex items-center gap-2">
            <Activity size={18} className="text-warning" /> Activity Stream
          </h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
            {[
              { user: 'Ahmed S.', action: 'approved 3 blood admins', time: '2m ago', type: 'Approval' },
              { user: 'System', action: 'Camp Scheduled for Sector 7', time: '15m ago', type: 'Scheduled' },
              { user: 'Dr. Priya', action: 'requested Emergency Admission', time: '1h ago', type: 'Emergency' },
              { user: 'Vikram M.', action: 'updated Inventory Targets', time: '2h ago', type: 'Approval' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="relative">
                  <img src={`https://i.pravatar.cc/150?u=u${idx}`} className="w-10 h-10 rounded-xl border-2 border-bg shadow-sm" alt="" />
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                    item.type === 'Emergency' ? "bg-primary" : 
                    item.type === 'Scheduled' ? "bg-info" : "bg-success"
                  )} />
                </div>
                <div className="flex-1 border-b border-bg pb-4 group-last:border-0">
                  <p className="text-xs font-bold text-dark leading-tight">
                    <span className="text-warning">{item.user}</span> {item.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted">{item.type}</span>
                    <span className="text-[9px] text-muted font-medium">• {item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-[10px] font-black text-muted uppercase tracking-widest hover:text-warning transition-colors">
            View All Notifications
          </button>
        </div>
      </div>

      {/* Critical Resource Allocation */}
      <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-bg">
          <h3 className="font-bold text-dark flex items-center gap-2 uppercase tracking-widest text-sm">
            Critical Resource Allocation
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg/50 text-[10px] font-bold text-muted uppercase tracking-widest">
                <th className="py-4 px-8">Resource Type</th>
                <th className="py-4 px-8">Site Location</th>
                <th className="py-4 px-8">Stock Qty</th>
                <th className="py-4 px-8">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { type: 'Blood Type B', site: 'Kanpur Valley Hub', qty: '12 Units', status: 'OK', color: 'success' },
                { type: 'B Negative Blood', site: 'Sector 9 Hub', qty: '02 Units', status: 'CRITICAL', color: 'primary' },
                { type: 'Disposable Syringes', site: 'Main Supply Ctr', qty: '450 Pcs', status: 'WARNING', color: 'warning' },
                { type: 'Testing Kits', site: 'Mega Camp Alpha', qty: '84 Units', status: 'OK', color: 'success' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-bg last:border-0 hover:bg-bg/30 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        row.color === 'primary' ? "bg-primary/10 text-primary" :
                        row.color === 'warning' ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                      )}>
                        <Activity size={16} />
                      </div>
                      <span className="font-black text-dark">{row.type}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8 text-muted font-bold uppercase tracking-tight text-xs">{row.site}</td>
                  <td className="py-5 px-8 font-black text-dark">{row.qty}</td>
                  <td className="py-5 px-8">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm",
                      row.color === 'primary' ? "bg-primary text-white animate-pulse" :
                      row.color === 'warning' ? "bg-warning text-white" : "bg-success text-white"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAB */}
      <button 
        className="fixed bottom-8 left-8 w-16 h-16 bg-warning text-white rounded-full shadow-2xl shadow-warning/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Plus size={32} />
        <span className="absolute left-full ml-4 bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          NEW DRIVE PRIMARY CAMP
        </span>
      </button>
    </div>
  );
};

export default CampDashboard;
