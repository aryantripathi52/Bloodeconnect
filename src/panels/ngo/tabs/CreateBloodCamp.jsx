import React, { useState } from 'react';
import { 
  Plus, Calendar, MapPin, Target, 
  CheckCircle, ShieldAlert, Save, X, 
  Send, HelpCircle, Map as MapIcon, Zap
} from 'lucide-react';
import MapView from '../../../components/shared/MapView';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CreateBloodCamp = () => {
  const [target, setTarget] = useState(250);
  const [isEmergency, setIsEmergency] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 relative">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-dark uppercase tracking-tight">Initialize Blood Donation Camp</h1>
        <p className="text-sm text-muted font-medium mt-1">Launch a new outreach hub. Define logistics, equipment requirements, and target capacity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Camp Identity */}
          <section className="bg-white p-8 rounded-[32px] border border-border shadow-sm space-y-6">
            <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3">
              <Calendar size={20} className="text-warning" /> Camp Identity
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Camp Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Central Plaza Emergency Drive" 
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-warning/20 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Run Start Time</label>
                  <input type="datetime-local" className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-warning/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Run End Time</label>
                  <input type="datetime-local" className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-warning/20 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Camp Category</label>
                <select className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-bold text-dark focus:ring-2 focus:ring-warning/20 outline-none appearance-none">
                  <option>Emergency Outreach</option>
                  <option>Corporate Drive</option>
                  <option>Community Awareness</option>
                  <option>National Campaign</option>
                </select>
              </div>
            </div>
          </section>

          {/* Deployment Location */}
          <section className="bg-white p-8 rounded-[32px] border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3">
                <MapIcon size={20} className="text-warning" /> Deployment Location
              </h3>
              <button className="px-4 py-2 bg-warning/10 text-warning text-[10px] font-black rounded-lg hover:bg-warning hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> AI CURRENT COORDINATES
              </button>
            </div>
            
            <div className="h-[300px] rounded-2xl overflow-hidden border border-border relative group">
              <MapView center={[20.5937, 78.9629]} zoom={5} />
              <div className="absolute inset-0 bg-dark/20 pointer-events-none group-hover:opacity-0 transition-opacity" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Enter address or enter via satellite</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search location..." 
                    className="w-full pl-12 pr-4 py-3 bg-bg border border-border rounded-xl font-bold text-dark focus:ring-2 focus:ring-warning/20 outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isEmergency}
                    onChange={() => setIsEmergency(!isEmergency)}
                  />
                  <div className="w-10 h-5 bg-bg rounded-full border border-border peer-checked:bg-primary transition-all shadow-inner" />
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                </div>
                <span className="text-xs font-bold text-muted group-hover:text-dark transition-colors uppercase tracking-widest">Emergency Famine Deployment</span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Inventory Targets */}
        <div className="space-y-8">
          <section className="bg-dark p-8 rounded-[32px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <div className="text-center">
                <input 
                  type="number" 
                  value={target}
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                  className="bg-transparent text-6xl font-black text-center w-full focus:outline-none text-warning drop-shadow-lg"
                />
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">Inventory Targets</p>
              </div>

              <div className="space-y-4">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest border-b border-white/10 pb-2">Resource Allocation Checklist</p>
                <div className="space-y-3">
                  {[
                    { label: 'AB section (any): Needed', checked: true },
                    { label: 'Automated Formation Kits', checked: true },
                    { label: 'Disposable Syringes (Box)', checked: false },
                    { label: 'Refrigeration Units', checked: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between group/item cursor-pointer">
                      <span className={cn(
                        "text-xs font-bold transition-colors",
                        item.checked ? "text-white" : "text-white/40 group-hover/item:text-white/60"
                      )}>{item.label}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center transition-all",
                        item.checked ? "bg-warning text-dark" : "border border-white/20"
                      )}>
                        {item.checked && <CheckCircle size={14} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                <ShieldAlert size={18} className="text-warning shrink-0" />
                <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                  Targets are calculated based on regional demand analytics for O- and A+ blood groups.
                </p>
              </div>
            </div>
          </section>

          {/* Need Assistance? */}
          <div className="bg-white p-6 rounded-[24px] border border-border shadow-sm flex items-center gap-4 group cursor-pointer hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-bg flex items-center justify-center text-muted group-hover:text-warning transition-colors">
              <HelpCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-dark uppercase tracking-widest">Need Assistance?</p>
              <button className="text-[10px] font-bold text-warning hover:text-dark transition-colors uppercase mt-0.5 underline decoration-warning/30 underline-offset-4">Contact Support</button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-8 left-[240px] right-0 px-8 z-40">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-border shadow-2xl flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-bg text-muted font-black text-[10px] rounded-xl hover:bg-bg/80 hover:text-dark transition-all uppercase tracking-widest flex items-center gap-2">
              <X size={16} /> Discard
            </button>
            <button className="px-6 py-3 border border-border text-dark font-black text-[10px] rounded-xl hover:bg-bg transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <Save size={16} /> Save Draft
            </button>
          </div>
          <button className="px-12 py-3 bg-warning text-white font-black text-xs rounded-xl hover:bg-amber-600 transition-all shadow-xl shadow-warning/20 uppercase tracking-[0.2em] flex items-center gap-3">
            Publish Camp <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBloodCamp;
