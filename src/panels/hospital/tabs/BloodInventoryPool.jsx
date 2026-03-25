import React from 'react';
import { 
  Droplet, MapPin, Users, Activity, 
  ShieldCheck, Phone, Star, Search, Filter, 
  Map as MapIcon, ChevronRight, AlertCircle, 
  Plus
} from 'lucide-react';
import MapView from '../../../components/shared/MapView';
import BloodGroupBadge from '../../../components/shared/BloodGroupBadge';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const StockCard = ({ type, units, location, donors, status }) => (
  <div className={cn(
    "p-6 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md group relative overflow-hidden",
    status === 'critical' ? "border-primary/30 bg-primary/5" : "border-border"
  )}>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm",
        status === 'critical' ? "bg-primary text-white" : 
        status === 'warning' ? "bg-warning text-white" : "bg-success text-white"
      )}>
        {type}
      </div>
      <div className="text-right">
        <p className="text-2xl font-black text-dark">{units}</p>
        <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Units in Stock</p>
      </div>
    </div>
    
    <div className="space-y-3 relative z-10">
      <div className="flex items-center justify-between text-[11px] font-bold text-muted">
        <span className="flex items-center gap-1"><MapPin size={12} /> {location}</span>
        <span className="flex items-center gap-1 text-jade-accent"><Users size={12} /> {donors} Donors</span>
      </div>
      <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 shadow-sm",
            status === 'critical' ? "bg-primary" : 
            status === 'warning' ? "bg-warning" : "bg-success"
          )} 
          style={{ width: `${(units/50)*100}%` }} 
        />
      </div>
    </div>
    
    <div className={cn(
      "absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500",
      status === 'critical' ? "bg-primary" : "bg-success"
    )} />
  </div>
);

const DonorListCard = ({ donor }) => (
  <div className="p-4 bg-white rounded-xl border border-border shadow-sm flex items-center gap-4 group hover:border-jade-accent/30 transition-all cursor-pointer">
    <div className="relative">
      <img 
        src={donor.avatar || `https://i.pravatar.cc/150?u=${donor.id}`} 
        className="w-12 h-12 rounded-xl border-2 border-bg shadow-sm" 
        alt="" 
      />
      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-border">
        <ShieldCheck size={14} className="text-success fill-success/10" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <h5 className="text-sm font-black text-dark group-hover:text-jade-accent transition-colors truncate">{donor.name}</h5>
        <span className="text-[9px] font-black text-jade-accent bg-jade-bg px-2 py-0.5 rounded-lg uppercase tracking-widest">
          {donor.bloodType}
        </span>
      </div>
      <p className="text-[10px] text-muted font-bold flex items-center gap-1 mt-0.5">
        <MapPin size={10} /> {donor.distance} • Attending
      </p>
    </div>
    <ChevronRight size={16} className="text-muted group-hover:text-jade-accent group-hover:translate-x-1 transition-all" />
  </div>
);

const BloodInventoryPool = ({ onNewSOS }) => {
  const stock = [
    { type: 'O-', units: 4, location: 'LOC-01', donors: 12, status: 'critical' },
    { type: 'A+', units: 28, location: 'LOC-04', donors: 45, status: 'ok' },
    { type: 'B+', units: 12, location: 'LOC-02', donors: 24, status: 'warning' },
    { type: 'AB+', units: 34, location: 'LOC-07', donors: 18, status: 'ok' },
    { type: 'AB-', units: 2, location: 'LOC-01', donors: 5, status: 'critical' },
    { type: 'B-', units: 15, location: 'LOC-02', donors: 20, status: 'warning' },
    { type: 'O+', units: 42, location: 'LOC-05', donors: 84, status: 'ok' },
    { type: 'A-', units: 8, location: 'LOC-03', donors: 14, status: 'critical' },
  ];

  const donors = [
    { id: 1, name: 'Jameson Robert', bloodType: 'O-', distance: '1.2 km', status: 'attending' },
    { id: 2, name: 'Chell Ria', bloodType: 'A+', distance: '2.4 km', status: 'attending' },
    { id: 3, name: 'Patterson Sarah', bloodType: 'B-', distance: '3.8 km', status: 'attending' },
    { id: 4, name: 'Vikram Singh', bloodType: 'O+', distance: '4.5 km', status: 'attending' },
  ];

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Blood Inventory Status</h1>
          <p className="text-sm text-muted font-medium mt-1">Real-time of 8 Building for City General Trauma Center, SOS Center</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-primary px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
            <AlertCircle size={16} /> 0 Flagged
          </div>
          <button className="p-2.5 bg-white border border-border rounded-xl text-muted hover:text-dark transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Inventory Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stock.map((item, idx) => (
              <StockCard key={idx} {...item} />
            ))}
          </div>

          {/* Automated Person Donors Section */}
          <div className="bg-jade-bg/30 rounded-[32px] p-8 border border-jade-bg shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <ShieldCheck size={160} />
            </div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xl font-black text-jade-sidebar uppercase tracking-tight flex items-center gap-3">
                <Activity size={24} className="text-jade-accent" /> Automated Person Donors
              </h3>
              <button className="text-[10px] font-black text-jade-accent uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-jade-sidebar/10 shadow-sm hover:shadow-md transition-all">
                View Compatibility Index
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {donors.slice(0, 3).map((donor, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-jade-sidebar/10 shadow-sm group/card hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <img 
                      src={`https://i.pravatar.cc/150?u=donor${idx}`} 
                      className="w-16 h-16 rounded-2xl border-4 border-jade-bg shadow-lg group-hover/card:scale-105 transition-transform" 
                      alt="" 
                    />
                    <div className="bg-jade-bg p-2 rounded-xl">
                      <Star size={16} className="text-warning fill-warning" />
                    </div>
                  </div>
                  <h4 className="font-black text-jade-sidebar mb-1">{donor.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-jade-accent bg-jade-bg px-2 py-0.5 rounded-lg uppercase tracking-widest">{donor.bloodType} Compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2.5 bg-jade-accent text-white font-black text-[10px] rounded-xl hover:bg-jade-sidebar transition-all shadow-lg shadow-jade-accent/20 uppercase tracking-widest">
                      Request
                    </button>
                    <button className="p-2.5 border border-jade-sidebar/10 rounded-xl hover:bg-jade-bg text-muted hover:text-jade-accent transition-all">
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Donor Pool Map & List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[32px] border border-border shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-bg flex items-center justify-between">
              <h3 className="font-bold text-dark flex items-center gap-2">
                <MapIcon size={18} className="text-jade-accent" /> Nearby Donor Pool
              </h3>
              <Search size={16} className="text-muted" />
            </div>
            
            {/* Map */}
            <div className="h-[300px] w-full border-b border-bg grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
              <MapView 
                center={[19.0760, 72.8777]} 
                zoom={14} 
                markers={donors.map(d => ({ 
                  position: [19.0760 + (Math.random()-0.5)*0.01, 72.8777 + (Math.random()-0.5)*0.01], 
                  title: d.name, 
                  subtitle: d.bloodType 
                }))}
              />
            </div>

            {/* Donor List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-bg/20 scrollbar-hide">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 px-2">Matched Candidates</p>
              {donors.map((donor, idx) => (
                <DonorListCard key={idx} donor={donor} />
              ))}
            </div>
            
            <button className="m-4 py-4 bg-dark text-white font-black text-xs rounded-2xl hover:bg-jade-sidebar transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2">
              Broadcast SOS <Activity size={16} />
            </button>
          </div>
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

export default BloodInventoryPool;
