import React, { useState } from 'react';
import { 
  X, ShieldAlert, Hospital, User, 
  Activity, Heart, Brain, Zap,
  Clock, History, Check, Info, 
  Plus, Droplet
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const UrgencyTile = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 group",
      isActive 
        ? "bg-primary text-white border-transparent shadow-xl shadow-primary/20 scale-105" 
        : "bg-white border-border text-muted hover:border-primary/30 hover:text-primary"
    )}
  >
    <div className={cn(
      "p-4 rounded-2xl transition-colors",
      isActive ? "bg-white/20" : "bg-bg group-hover:bg-primary-light"
    )}>
      <Icon size={32} />
    </div>
    <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    {isActive && (
      <div className="absolute top-2 right-2">
        <Check size={16} />
      </div>
    )}
  </button>
);

const RaiseSOSRequest = ({ isOpen, onClose }) => {
  const [urgency, setUrgency] = useState('Trauma');
  const [patientId, setPatientId] = useState('P-8429');
  const [traumaLevel, setTraumaLevel] = useState('Level 1');
  const [requirements, setRequirements] = useState(['O-', 'Epinephrine']);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="bg-white rounded-[32px] w-full max-w-6xl h-[90vh] relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-bg flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldAlert size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-dark uppercase tracking-tight">New SOS Request</h2>
                <span className="px-3 py-1 bg-jade-sidebar text-white text-[10px] font-black rounded-lg uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert size={12} /> Needs Admin
                </span>
              </div>
              <p className="text-muted font-medium">Define emergency parameters and dispatch response teams.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-bg rounded-full transition-colors text-muted hover:text-dark"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 scrollbar-hide">
          {/* Left Panel: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                  <Hospital size={14} /> Hospital Selector
                </label>
                <select className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                  <option>City General Trauma Center</option>
                  <option>Fortis Memorial</option>
                  <option>Apollo Health City</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> Patient Identification
                </label>
                <input 
                  type="text" 
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Patient ID (e.g. P-8429)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} /> Trauma Level
                </label>
                <div className="flex gap-2">
                  {['Level 1', 'Level 2', 'Level 3'].map((l) => (
                    <button 
                      key={l}
                      onClick={() => setTraumaLevel(l)}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-bold text-xs transition-all",
                        traumaLevel === l ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-bg text-muted hover:bg-primary-light hover:text-primary"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                  <Users size={14} /> Response Teams
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Cardiac', 'Neurology', 'Trauma', 'Burn Unit'].map((team) => (
                    <button 
                      key={team}
                      className="px-4 py-2 bg-jade-bg text-jade-sidebar text-[10px] font-black rounded-lg border border-jade-sidebar/10 hover:bg-jade-sidebar hover:text-white transition-all uppercase"
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Urgency Tiles */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} /> Clinical Urgency Selector
              </label>
              <div className="grid grid-cols-3 gap-6">
                <UrgencyTile 
                  icon={Heart} 
                  label="Cardiac" 
                  isActive={urgency === 'Cardiac'} 
                  onClick={() => setUrgency('Cardiac')}
                />
                <UrgencyTile 
                  icon={Brain} 
                  label="Neurology" 
                  isActive={urgency === 'Neurology'} 
                  onClick={() => setUrgency('Neurology')}
                />
                <UrgencyTile 
                  icon={Activity} 
                  label="Trauma" 
                  isActive={urgency === 'Trauma'} 
                  onClick={() => setUrgency('Trauma')}
                />
              </div>
            </div>

            {/* Alert Configuration */}
            <div className="p-6 bg-jade-bg rounded-2xl border border-jade-sidebar/5 flex items-start gap-4 shadow-inner">
              <div className="p-2 bg-white rounded-xl text-jade-sidebar shadow-sm">
                <Info size={20} />
              </div>
              <div>
                <h5 className="text-[10px] font-black text-jade-sidebar uppercase tracking-widest mb-1">Alert Configuration</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Dispatch will automatically alert 12 verified donors in Sector 7A. Surgeon on-call (Dr. Jameson) will be paged immediately. ETA for response teams is 4.2 mins based on current grid traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Requirements & History */}
          <div className="space-y-8 bg-bg/30 p-6 rounded-[24px] border border-bg">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Droplet size={14} /> Immediate Requirements
              </label>
              <div className="flex flex-wrap gap-3">
                {['O-', 'A+', 'B-', 'AB+', 'Epinephrine', 'Ventilator'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => setRequirements(prev => 
                      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                    )}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black transition-all border",
                      requirements.includes(item) 
                        ? "bg-primary text-white border-transparent shadow-lg shadow-primary/20" 
                        : "bg-white text-muted border-border hover:border-primary/30"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> Surgeon Time Picker
              </label>
              <div className="relative group">
                <input 
                  type="time" 
                  defaultValue="13:45"
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none shadow-sm group-hover:shadow-md transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <History size={14} /> Recent Local SOS Activity
              </label>
              <div className="space-y-3">
                {[
                  { id: 'SOS-902', type: 'Trauma', status: 'Resolved', date: '2h ago' },
                  { id: 'SOS-894', type: 'Cardiac', status: 'Active', date: '4h ago' },
                ].map((log) => (
                  <div key={log.id} className="p-4 bg-white rounded-xl border border-border shadow-sm flex justify-between items-center group cursor-pointer hover:border-primary/20">
                    <div>
                      <p className="text-[11px] font-black text-dark">{log.id} • {log.type}</p>
                      <p className="text-[10px] text-muted font-bold">{log.date}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight",
                      log.status === 'Active' ? "bg-primary text-white" : "bg-jade-bg text-jade-sidebar"
                    )}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-8 border-t border-bg bg-white flex items-center justify-center gap-4 relative z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-bg text-muted font-black text-xs rounded-2xl hover:bg-jade-bg hover:text-dark transition-all uppercase tracking-widest"
          >
            Cancel Dispatch
          </button>
          <button 
            className="px-16 py-4 bg-primary text-white font-black text-sm rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest flex items-center gap-3 animate-pulse-red"
          >
            RAISE SOS REQUEST <Zap size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseSOSRequest;
