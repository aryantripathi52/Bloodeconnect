import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle, XCircle, 
  FileText, Calendar, User, ArrowRight, Info,
  Search, Filter, ChevronDown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const VerificationCard = ({ applicant, onSelect, isActive }) => (
  <div 
    onClick={() => onSelect(applicant)}
    className={cn(
      "p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden",
      isActive 
        ? "bg-jade-accent/5 border-jade-accent shadow-md" 
        : "bg-white border-jade-sidebar/10 hover:border-jade-accent/30"
    )}
  >
    <div className="flex items-start gap-4 relative z-10">
      <div className="relative">
        <img 
          src={applicant.avatar} 
          alt={applicant.name} 
          className="w-14 h-14 rounded-xl object-cover border-2 border-jade-bg"
        />
        <div className={cn(
          "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center",
          applicant.priority === 'High' ? "bg-primary" : "bg-jade-accent"
        )}>
          <ShieldCheck size={10} className="text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-jade-sidebar truncate group-hover:text-jade-accent transition-colors">
            {applicant.name}
          </h4>
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold tracking-tight",
            applicant.priority === 'High' ? "bg-primary/10 text-primary" : "bg-jade-accent/10 text-jade-accent"
          )}>
            {applicant.priority}
          </span>
        </div>
        <p className="text-xs text-muted mb-3 font-medium">{applicant.role}</p>
        <div className="flex items-center gap-3 text-[10px] text-muted font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <FileText size={12} /> {applicant.docs} Docs
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {applicant.date}
          </span>
        </div>
      </div>
    </div>
    {isActive && (
      <div className="absolute top-0 right-0 w-1.5 h-full bg-jade-accent" />
    )}
  </div>
);

const RejectionDialog = ({ isOpen, onClose, onConfirm, applicantName }) => {
  const [reason, setReason] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-jade-sidebar/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-jade-sidebar text-center mb-2">Finalize Rejection?</h3>
        <p className="text-sm text-muted text-center mb-8">
          You are about to reject the verification for <span className="font-bold text-jade-sidebar">{applicantName}</span>. This action cannot be undone.
        </p>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 block">Reason for Rejection</label>
            <select 
              className="w-full bg-jade-bg border border-jade-sidebar/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select formal reason...</option>
              <option value="invalid_docs">Invalid Documents</option>
              <option value="expired_id">Expired ID Card</option>
              <option value="background_check_failed">Background Check Failed</option>
              <option value="unclear_images">Images Not Clear</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onClose}
            className="py-3 rounded-xl border border-jade-sidebar/10 text-sm font-bold text-muted hover:bg-jade-bg transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={() => onConfirm(reason)}
            disabled={!reason}
            className={cn(
              "py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all",
              reason ? "bg-primary hover:bg-primary/90 shadow-primary/20" : "bg-muted cursor-not-allowed"
            )}
          >
            CONFIRM REJECTION
          </button>
        </div>
      </div>
    </div>
  );
};

const DonorVerificationQueue = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  const applicants = [
    { id: 1, name: 'Amit Sharma', role: 'Individual Donor', avatar: 'https://i.pravatar.cc/150?u=a1', priority: 'High', docs: 3, date: '24 Mar 2026', email: 'amit@example.com', phone: '+91 98765 43210', location: 'Mumbai, MH' },
    { id: 2, name: 'Priya Patel', role: 'Nurse Practitioner', avatar: 'https://i.pravatar.cc/150?u=a2', priority: 'Standard', docs: 5, date: '23 Mar 2026', email: 'priya@example.com', phone: '+91 87654 32109', location: 'Delhi, DL' },
    { id: 3, name: 'Rahul Varma', role: 'Blood Bank Agent', avatar: 'https://i.pravatar.cc/150?u=a3', priority: 'High', docs: 4, date: '23 Mar 2026', email: 'rahul@example.com', phone: '+91 76543 21098', location: 'Bangalore, KA' },
    { id: 4, name: 'Sneha Reddy', role: 'Individual Donor', avatar: 'https://i.pravatar.cc/150?u=a4', priority: 'Standard', docs: 2, date: '22 Mar 2026', email: 'sneha@example.com', phone: '+91 65432 10987', location: 'Hyderabad, TS' },
  ];

  // Set initial selection
  if (!selectedApplicant) setSelectedApplicant(applicants[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* List Panel */}
      <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-jade-sidebar">Applications</h4>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-jade-sidebar/10 rounded-lg text-muted hover:text-jade-accent transition-colors shadow-sm">
              <Filter size={16} />
            </button>
            <button className="p-2 bg-white border border-jade-sidebar/10 rounded-lg text-muted hover:text-jade-accent transition-colors shadow-sm">
              <Search size={16} />
            </button>
          </div>
        </div>
        {applicants.map((app) => (
          <VerificationCard 
            key={app.id} 
            applicant={app} 
            onSelect={setSelectedApplicant}
            isActive={selectedApplicant?.id === app.id}
          />
        ))}
      </div>

      {/* Details Panel */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-jade-sidebar/10 shadow-sm relative overflow-hidden flex flex-col">
        {/* JADE Watermark */}
        <div className="absolute -top-12 -right-12 text-[120px] font-black text-jade-bg select-none pointer-events-none opacity-50 italic">
          JADE
        </div>

        {selectedApplicant ? (
          <>
            <div className="p-8 border-b border-jade-bg flex justify-between items-start relative z-10">
              <div className="flex gap-6">
                <img 
                  src={selectedApplicant.avatar} 
                  alt={selectedApplicant.name} 
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-jade-bg shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-jade-sidebar mb-1">{selectedApplicant.name}</h3>
                  <p className="text-jade-accent font-semibold mb-4">{selectedApplicant.role}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-jade-bg rounded-lg text-xs font-bold text-jade-sidebar flex items-center gap-1">
                      <ShieldCheck size={14} className="text-jade-accent" /> Verified Email
                    </span>
                    <span className="px-3 py-1 bg-jade-bg rounded-lg text-xs font-bold text-jade-sidebar flex items-center gap-1">
                      <ShieldCheck size={14} className="text-jade-accent" /> Mobile Linked
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-jade-accent hover:text-jade-sidebar transition-colors group">
                VIEW FULL PROFILE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="p-8 flex-1 grid grid-cols-2 gap-8 relative z-10 overflow-y-auto scrollbar-hide">
              <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> Personal Information
                </h5>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-muted font-bold uppercase mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-jade-sidebar">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted font-bold uppercase mb-1">Phone Number</p>
                    <p className="text-sm font-semibold text-jade-sidebar">{selectedApplicant.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted font-bold uppercase mb-1">Current Location</p>
                    <p className="text-sm font-semibold text-jade-sidebar">{selectedApplicant.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <FileText size={14} /> Submitted Documents
                </h5>
                <div className="space-y-3">
                  {['Government ID Card', 'Medical License', 'Hospital NOC'].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-jade-bg rounded-xl group hover:bg-jade-accent/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-jade-accent shadow-sm">
                          <FileText size={16} />
                        </div>
                        <span className="text-xs font-bold text-jade-sidebar">{doc}</span>
                      </div>
                      <ChevronDown size={16} className="text-muted group-hover:text-jade-accent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-jade-bg/30 border-t border-jade-bg grid grid-cols-2 gap-6 relative z-10">
              <div className="p-4 bg-white/50 rounded-2xl border border-white/40 flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <Info size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Protocol Note</p>
                  <p className="text-[11px] text-amber-600 leading-relaxed mt-1">
                    Approval grants access to priority matching and official donor badges. Ensure documents match UIDAI records.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsRejectionOpen(true)}
                  className="flex-1 py-4 bg-white border border-primary/20 text-primary font-bold text-xs rounded-2xl hover:bg-primary-light transition-all shadow-sm"
                >
                  REJECT APPLICATION
                </button>
                <button className="flex-1 py-4 bg-jade-accent text-white font-bold text-xs rounded-2xl hover:bg-jade-accent/90 transition-all shadow-lg shadow-jade-accent/20">
                  APPROVE VERIFICATION
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-jade-bg rounded-full flex items-center justify-center text-muted mb-6">
              <ShieldCheck size={40} />
            </div>
            <h4 className="text-xl font-bold text-jade-sidebar mb-2">No Selection</h4>
            <p className="text-sm text-muted max-w-xs">
              Select an applicant from the left panel to review their documents and finalize verification.
            </p>
          </div>
        )}

        <RejectionDialog 
          isOpen={isRejectionOpen}
          onClose={() => setIsRejectionOpen(false)}
          applicantName={selectedApplicant?.name}
          onConfirm={(reason) => {
            console.log('Rejected with reason:', reason);
            setIsRejectionOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default DonorVerificationQueue;
