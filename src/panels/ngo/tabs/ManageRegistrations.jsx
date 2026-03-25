import React from 'react';
import { 
  Users, Activity, ShieldAlert, CheckCircle, 
  Map as MapIcon, Search, Filter, MoreVertical,
  ChevronLeft, ChevronRight, Zap, AlertTriangle,
  Plus, ExternalLink
} from 'lucide-react';
import MapView from '../../../components/shared/MapView';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const RegistrationStat = ({ label, value, icon: Icon, color, spark }) => (
  <div className="flex-1 bg-white p-5 rounded-2xl border border-border shadow-sm group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className={cn(
        "p-2 rounded-xl transition-colors",
        color === 'primary' ? "bg-primary/10 text-primary" :
        color === 'success' ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
      )}>
        <Icon size={18} />
      </div>
      <span className="text-[9px] font-black text-muted uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-black text-dark">{value}</h3>
      {spark && (
        <div className="w-16 h-1 bg-bg rounded-full overflow-hidden mb-2">
          <div className="h-full bg-success rounded-full" style={{ width: spark }} />
        </div>
      )}
    </div>
  </div>
);

const ManageRegistrations = () => {
  const registrations = [
    { id: 1, name: 'Priya Sharma', bloodType: 'A+', urgency: 'Normal', status: 'Verified' },
    { id: 2, name: 'Malik', bloodType: 'AB+', urgency: 'Emergency', status: 'Pending' },
    { id: 3, name: 'Girly Brook', bloodType: 'A-', urgency: 'Normal', status: 'Verified' },
    { id: 4, name: 'Rahul Kumar', bloodType: 'O+', urgency: 'Emergency', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Manage Registrations</h1>
          <p className="text-sm text-muted font-medium mt-1 italic">Review and validate donor profiles for upcoming drives.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-black text-dark hover:bg-bg transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <Plus size={14} /> New
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-black text-dark hover:bg-bg transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <Activity size={14} /> Report
          </button>
          <button className="px-4 py-2 bg-dark text-white rounded-xl text-[10px] font-black hover:bg-dark/90 transition-all uppercase tracking-widest flex items-center gap-2 shadow-lg">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* KPI Chips */}
      <div className="flex flex-col md:flex-row gap-6">
        <RegistrationStat label="Total Registrations" value="1,284" icon={Users} color="warning" />
        <RegistrationStat label="Completion Rate" value="86%" icon={CheckCircle} color="success" spark="86%" />
        <RegistrationStat label="Pending Validation" value="42" icon={ShieldAlert} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg/50 text-[10px] font-black text-muted uppercase tracking-widest">
                    <th className="py-4 px-8">Donor Identity</th>
                    <th className="py-4 px-8">Type</th>
                    <th className="py-4 px-8">Urgency</th>
                    <th className="py-4 px-8">Status</th>
                    <th className="py-4 px-8">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {registrations.map((reg) => (
                    <tr 
                      key={reg.id} 
                      className={cn(
                        "border-b border-bg last:border-0 hover:bg-bg/30 transition-colors group relative",
                        reg.urgency === 'Emergency' ? "bg-primary/5" : ""
                      )}
                    >
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-1 h-8 rounded-full transition-all group-hover:scale-y-110",
                            reg.urgency === 'Emergency' ? "bg-primary" : "bg-success"
                          )} />
                          <p className="font-black text-dark group-hover:text-warning transition-colors">{reg.name}</p>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <span className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center font-black text-xs">
                          {reg.bloodType}
                        </span>
                      </td>
                      <td className="py-5 px-8">
                        <span className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                          reg.urgency === 'Emergency' ? "bg-primary text-white" : "bg-bg text-dark"
                        )}>
                          {reg.urgency}
                        </span>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            reg.status === 'Verified' ? "bg-success" : "bg-warning animate-pulse"
                          )} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            reg.status === 'Verified' ? "text-success" : "text-warning"
                          )}>{reg.status}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <button className="p-2 text-muted hover:text-warning transition-colors hover:bg-bg rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-bg/50 border-t border-border flex items-center justify-between">
              <button className="px-6 py-2.5 bg-white border border-border rounded-xl text-[10px] font-black text-dark hover:bg-bg transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
                Generate New Token Set <Zap size={14} fill="currentColor" className="text-warning" />
              </button>
              <div className="flex gap-2">
                <button className="p-2 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Warning Card */}
          <div className="bg-primary/5 border-2 border-primary/10 rounded-3xl p-6 flex items-start gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <AlertTriangle size={80} />
            </div>
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <Clock size={32} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-black text-primary uppercase tracking-tight mb-1">More than 40mins?</h4>
              <p className="text-xs font-bold text-primary/70 leading-relaxed mb-4">
                Registration anomaly detected in Sector 12. Multiple profiles pending validation exceeding the 40-minute threshold. High risk of donor churn.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">Review Anomaly</button>
                <button className="px-6 py-2 bg-white border border-primary/20 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-primary-light transition-all">Dismiss</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Map */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden flex flex-col h-full relative group">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-success/10 backdrop-blur px-3 py-1.5 rounded-xl border border-success/20 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-[10px] font-black text-success uppercase tracking-widest">AI LOCATION ACTIVE</span>
            </div>
            
            <div className="absolute top-4 right-4 z-20">
              <button className="p-2.5 bg-white/90 backdrop-blur rounded-xl border border-border shadow-xl text-dark hover:text-warning transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>

            <div className="h-[400px] w-full border-b border-bg grayscale-[0.2] contrast-[1.1] relative">
              <MapView center={[19.0760, 72.8777]} zoom={13} />
              <div className="absolute inset-0 bg-success/5 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #27AE60 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="p-6 bg-dark text-white space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Zap size={18} className="text-warning" fill="currentColor" /> AI Recommendation
              </h4>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                Analysis suggests shifting the drive 400m North-East to the "Sector 12 Corporate Hub" to capture 45% higher footfall from verified donors.
              </p>
              <button className="w-full py-3 bg-warning text-dark font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-warning/10">
                Apply AI Coordinates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button 
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Plus size={32} />
        <span className="absolute right-full mr-4 bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          NEW EMERGENCY CAMP
        </span>
      </button>
    </div>
  );
};

export default ManageRegistrations;
