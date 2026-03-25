import React, { useState } from 'react';
import { 
  Settings, ShieldCheck, Globe, Database, 
  Bell, Mail, Phone, Cloud, AlertTriangle, 
  RotateCcw, Save, History, ChevronRight, User
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SettingSection = ({ title, subtitle, icon: Icon, children }) => (
  <div className="bg-white rounded-3xl border border-jade-sidebar/10 shadow-sm overflow-hidden mb-6 group hover:shadow-md transition-all">
    <div className="p-6 border-b border-jade-bg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-jade-bg text-jade-accent rounded-xl group-hover:bg-jade-accent group-hover:text-white transition-colors duration-300">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-jade-sidebar uppercase tracking-widest">{title}</h4>
          <p className="text-xs text-muted font-medium mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-muted group-hover:text-jade-accent transition-transform group-hover:translate-x-1" />
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

const ToggleSwitch = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b border-jade-bg last:border-0 group">
    <div className="max-w-md">
      <p className="text-sm font-bold text-jade-sidebar group-hover:text-jade-accent transition-colors">{label}</p>
      <p className="text-xs text-muted font-medium mt-1 leading-relaxed">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-12 h-6 bg-jade-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-jade-accent"></div>
    </label>
  </div>
);

const ResetConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-jade-sidebar/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-jade-sidebar text-center mb-2">Reset All Defaults?</h3>
        <p className="text-sm text-muted text-center mb-8">
          This action will restore all platform configurations to their initial states. This cannot be undone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={onClose} className="py-3 rounded-xl border border-jade-sidebar/10 text-sm font-bold text-muted hover:bg-jade-bg transition-colors uppercase tracking-widest">Cancel</button>
          <button onClick={onConfirm} className="py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest">Reset All</button>
        </div>
      </div>
    </div>
  );
};

const SystemSettings = () => {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [settings, setSettings] = useState({
    maintenance: false,
    publicAccess: true,
    emailDigests: true,
    pushAlerts: true,
    autoVerify: false
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-jade-sidebar">Global System Settings</h2>
          <p className="text-sm text-muted">Manage platform-wide configurations and security protocols</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsResetOpen(true)}
            className="px-6 py-2.5 bg-jade-bg text-muted rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all border border-jade-sidebar/10 shadow-sm flex items-center gap-2 group uppercase tracking-widest"
          >
            <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" /> RESET DEFAULTS
          </button>
          <button className="px-8 py-2.5 bg-jade-accent text-white rounded-xl text-xs font-bold hover:bg-jade-accent/90 transition-all shadow-lg shadow-jade-accent/20 flex items-center gap-2 uppercase tracking-widest">
            <Save size={16} /> SAVE CONFIGURATION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SettingSection title="Core Identity" subtitle="Basic platform branding and metadata" icon={Globe}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 block">Platform Name</label>
                  <input type="text" value="BloodConnect AI" className="w-full bg-jade-bg border border-jade-sidebar/10 rounded-xl px-4 py-2.5 text-sm font-bold text-jade-sidebar focus:ring-2 focus:ring-jade-accent/20 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 block">Region Mode</label>
                  <input type="text" value="Multi-Region (India)" className="w-full bg-jade-bg border border-jade-sidebar/10 rounded-xl px-4 py-2.5 text-sm font-bold text-jade-sidebar focus:ring-2 focus:ring-jade-accent/20 outline-none" />
                </div>
              </div>
              <ToggleSwitch 
                label="Maintenance Mode" 
                description="Disable public access for scheduled updates."
                checked={settings.maintenance}
                onChange={() => setSettings(s => ({ ...s, maintenance: !s.maintenance }))}
              />
              <ToggleSwitch 
                label="Public Directory" 
                description="Allow non-authenticated users to view verified donor stats."
                checked={settings.publicAccess}
                onChange={() => setSettings(s => ({ ...s, publicAccess: !s.publicAccess }))}
              />
            </div>
          </SettingSection>

          <SettingSection title="Access Compliance" subtitle="Role hierarchy and security protocols" icon={ShieldCheck}>
            <div className="space-y-6">
              {[
                { role: 'Super Admin', desc: 'Full system access and data modification.', count: 4 },
                { role: 'Data Analyst', desc: 'Read-only access to analytics and reports.', count: 12 },
                { role: 'System Viewer', desc: 'Monitor live SOS feeds without intervention.', count: 8 },
              ].map((role, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-jade-bg rounded-2xl border border-jade-sidebar/5 group hover:border-jade-accent/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-jade-accent shadow-sm">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-jade-sidebar">{role.role}</p>
                      <p className="text-[11px] text-muted font-medium">{role.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-jade-accent">{role.count} Active</span>
                </div>
              ))}
            </div>
          </SettingSection>
        </div>

        <div className="space-y-6">
          <SettingSection title="Communication" subtitle="External API and notification endpoints" icon={Bell}>
            <div className="space-y-2">
              <ToggleSwitch 
                label="Email Digests" 
                description="Send daily summary reports to administrators."
                checked={settings.emailDigests}
                onChange={() => setSettings(s => ({ ...s, emailDigests: !s.emailDigests }))}
              />
              <div className="ml-14 pl-4 border-l-2 border-jade-bg pb-4">
                 <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider mb-1 block">Frequency</label>
                      <select className="w-full bg-jade-bg border border-jade-sidebar/10 rounded-lg px-3 py-1.5 text-xs font-bold text-jade-sidebar outline-none">
                        <option>Once Daily (8:00 AM)</option>
                        <option>Real-time</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider mb-1 block">Recipient Group</label>
                      <select className="w-full bg-jade-bg border border-jade-sidebar/10 rounded-lg px-3 py-1.5 text-xs font-bold text-jade-sidebar outline-none">
                        <option>All Super Admins</option>
                        <option>Support Team</option>
                      </select>
                    </div>
                 </div>
              </div>
              <ToggleSwitch 
                label="Critical Push Alerts" 
                description="Enable SOS notifications for mobile applications."
                checked={settings.pushAlerts}
                onChange={() => setSettings(s => ({ ...s, pushAlerts: !s.pushAlerts }))}
              />
            </div>
          </SettingSection>

          <SettingSection title="External Synapse" subtitle="Third-party cloud and data integrations" icon={Cloud}>
            <div className="space-y-4">
              <div className="p-4 bg-jade-bg rounded-2xl border border-jade-sidebar/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-jade-accent shadow-md">
                    <Database size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-jade-sidebar">AWS S3 Infrastructure</p>
                    <p className="text-[10px] text-success font-black tracking-widest uppercase mt-0.5">SYNCED & STABLE</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-jade-sidebar">1.2 TB / 5 TB</p>
                  <div className="w-20 bg-white h-1.5 rounded-full mt-1 shadow-inner">
                    <div className="w-[24%] h-full bg-jade-accent rounded-full" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-jade-bg rounded-2xl border border-jade-sidebar/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-jade-accent shadow-md">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-jade-sidebar">SendGrid API</p>
                    <p className="text-[10px] text-muted font-black tracking-widest uppercase mt-0.5">99.9% UPTIME</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-jade-accent uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-jade-sidebar/10 shadow-sm hover:shadow-md transition-all">Manage</button>
              </div>
            </div>
          </SettingSection>

          {/* Audit Trail Section Fixed */}
          <div className="bg-jade-sidebar p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-jade-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <History size={20} className="text-jade-accent-light" /> System Audit Trail
              </h4>
              <ArrowUpRight size={18} className="text-white/40" />
            </div>
            <div className="space-y-4 relative z-10">
              {[
                { user: 'Admin-04', action: 'Changed AWS Credentials', time: '12:45 PM', status: 'SUCCESS' },
                { user: 'System', action: 'Auto-Backup Initialized', time: '08:00 AM', status: 'SUCCESS' },
              ].map((log, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-jade-accent-light" />
                    <div>
                      <p className="text-xs font-bold">{log.action}</p>
                      <p className="text-[10px] text-white/40 font-medium">By {log.user} • {log.time}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black bg-jade-accent text-white px-2 py-0.5 rounded-full tracking-widest">{log.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] tracking-widest uppercase rounded-xl border border-white/10 transition-all">
              DOWNLOAD SECURITY LOGS (CSV)
            </button>
          </div>
        </div>
      </div>

      <ResetConfirmDialog 
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={() => {
          console.log('Resetting all configurations...');
          setIsResetOpen(false);
        }}
      />
    </div>
  );
};

export default SystemSettings;
