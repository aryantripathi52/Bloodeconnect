import React from 'react';
import { AlertCircle, Activity, MapPin, Truck, User, Clock, Plus, ChevronRight } from 'lucide-react';
import MapView from '../../../components/shared/MapView';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BloodInventoryCard = ({ type, units, status }) => {
  const isCritical = status === 'critical';
  return (
    <div className={cn(
      "p-4 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md",
      isCritical ? "border-primary/30 bg-primary/5" : "border-border"
    )}>
      <div className="flex justify-between items-start mb-2">
        <span className={cn(
          "text-lg font-black",
          isCritical ? "text-primary" : "text-success"
        )}>{type}</span>
        <span className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
          isCritical ? "bg-primary text-white" : "bg-success/10 text-success"
        )}>
          {status}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-dark">{units}</span>
        <span className="text-xs text-muted font-medium">Units</span>
      </div>
    </div>
  );
};

const EmergencyDashboard = ({ onNewSOS }) => {
  return (
    <div className="space-y-6 relative pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Emergency Command</h1>
          <p className="text-sm text-muted flex items-center gap-1">
            <MapPin size={14} /> City General Trauma Center • Sector 7A
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-border shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold text-dark uppercase tracking-wider">System Online</span>
          </div>
        </div>
      </div>

      {/* Active SOS Banner */}
      <div className="bg-primary rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden group animate-pulse-red">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Activity size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center animate-flash-urgent">
              <AlertCircle size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest">ACTIVE SOS ALERT</h2>
              <p className="text-white/80 font-bold">Trauma Room 24 - Level 1 Priority</p>
            </div>
          </div>
          <button 
            className="bg-white text-primary px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary-light transition-all shadow-lg active:scale-95"
          >
            Respond to This Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Inventory & EMS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inventory */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <BloodInventoryCard type="O-" units="04" status="critical" />
            <BloodInventoryCard type="A+" units="28" status="ok" />
            <BloodInventoryCard type="B+" units="12" status="warning" />
            <BloodInventoryCard type="AB-" units="02" status="critical" />
          </div>

          {/* Inbound EMS */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-bg flex items-center justify-between">
              <h3 className="font-bold text-dark flex items-center gap-2">
                <Truck size={18} className="text-info" /> Inbound EMS
              </h3>
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Live Tracking</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg/50 text-[10px] font-bold text-muted uppercase tracking-widest">
                    <th className="py-3 px-6">Ambulance ID</th>
                    <th className="py-3 px-6">Unit Capacity</th>
                    <th className="py-3 px-6">ETA</th>
                    <th className="py-3 px-6">Progress</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: 'EMS-402', capacity: '2 Patients', eta: '4m', progress: 85, status: 'urgent' },
                    { id: 'EMS-118', capacity: '1 Patient', eta: '12m', progress: 40, status: 'stable' },
                    { id: 'EMS-904', capacity: 'Critical Care', eta: '2m', progress: 92, status: 'critical' },
                  ].map((ems, idx) => (
                    <tr key={idx} className="border-b border-bg last:border-0 hover:bg-bg/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-dark">{ems.id}</td>
                      <td className="py-4 px-6 text-muted font-medium">{ems.capacity}</td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          "font-black",
                          ems.status === 'critical' ? "text-primary" : "text-info"
                        )}>{ems.eta}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              ems.status === 'critical' ? "bg-primary" : "bg-info"
                            )} 
                            style={{ width: `${ems.progress}%` }} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Map & Surgeons */}
        <div className="space-y-6">
          {/* Map Widget */}
          <div className="h-[240px] rounded-2xl overflow-hidden border border-border shadow-sm group relative">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border shadow-lg">
              <p className="text-[10px] font-black text-dark uppercase tracking-widest">Hospital Zone</p>
            </div>
            <MapView center={[19.0760, 72.8777]} zoom={14} />
          </div>

          {/* On-Call Surgeons */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-bold text-dark mb-6 flex items-center justify-between">
              On-Call Trauma Team
              <span className="text-[10px] font-bold text-success uppercase">Active</span>
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Dr. Sarah Jameson', role: 'Lead Surgeon', status: 'In Surgery', color: 'primary' },
                { name: 'Dr. Robert Chen', role: 'Neuro Specialist', status: 'Ready', color: 'success' },
                { name: 'Dr. Elena Rossi', role: 'Cardiac Expert', status: 'Standby', color: 'info' },
              ].map((dr, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative">
                    <img 
                      src={`https://i.pravatar.cc/150?u=dr${idx}`} 
                      className="w-10 h-10 rounded-xl border border-border shadow-sm" 
                      alt="" 
                    />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                      dr.color === 'primary' ? "bg-primary" : 
                      dr.color === 'success' ? "bg-success" : "bg-info"
                    )} />
                  </div>
                  <div className="flex-1 border-b border-bg pb-4 group-last:border-0">
                    <p className="text-sm font-bold text-dark group-hover:text-info transition-colors">{dr.name}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{dr.role}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted group-hover:text-info group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone Log Feed */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <h3 className="font-bold text-dark mb-6 flex items-center gap-2">
          <Clock size={18} className="text-muted" /> Zone Log Activity
        </h3>
        <div className="space-y-4">
          {[
            { time: '12:45 PM', msg: 'Blood units O- dispatched to Trauma Room 24', type: 'system' },
            { time: '12:40 PM', msg: 'EMS-904 arrival at Emergency Gate B', type: 'ems' },
            { time: '12:35 PM', msg: 'SOS Request Raised: Trauma Level 1', type: 'sos' },
            { time: '12:30 PM', msg: 'Shift Change: Dr. Jameson on call', type: 'staff' },
          ].map((log, idx) => (
            <div key={idx} className="flex gap-4 items-start text-sm">
              <span className="text-[10px] font-black text-muted whitespace-nowrap pt-1 uppercase">{log.time}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-border mt-2" />
              <p className="text-muted font-medium">{log.msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={onNewSOS}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Plus size={32} />
        <span className="absolute right-full mr-4 bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          NEW SOS REQUEST
        </span>
      </button>
    </div>
  );
};

export default EmergencyDashboard;
