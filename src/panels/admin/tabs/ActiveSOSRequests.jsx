import React, { useState } from 'react';
import { 
  Activity, MapPin, AlertCircle, Clock, 
  ChevronRight, ArrowRight, ShieldAlert,
  Search, Filter, Map as MapIcon, Layers
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MapView from '../../../components/shared/MapView';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SOSCard = ({ request, onSelect, isActive }) => (
  <div 
    onClick={() => onSelect(request)}
    className={cn(
      "p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden",
      isActive 
        ? "bg-jade-accent/5 border-jade-accent shadow-md" 
        : "bg-white border-jade-sidebar/10 hover:border-jade-accent/30"
    )}
  >
    <div className="flex items-start gap-4 relative z-10">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center relative",
        request.priority === 'CRITICAL' ? "bg-primary/10 text-primary animate-pulse-red" :
        request.priority === 'URGENT' ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
      )}>
        <Activity size={24} className={cn(
          request.priority === 'CRITICAL' && "animate-flash-urgent"
        )} />
        {request.priority === 'CRITICAL' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white animate-pulse" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-jade-sidebar truncate group-hover:text-jade-accent transition-colors">
            {request.hospital}
          </h4>
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold tracking-tight",
            request.priority === 'CRITICAL' ? "bg-primary text-white" :
            request.priority === 'URGENT' ? "bg-warning text-white" : "bg-info text-white"
          )}>
            {request.priority}
          </span>
        </div>
        <p className="text-xs text-muted mb-3 font-medium flex items-center gap-1">
          <MapPin size={12} /> {request.location} • Sector {request.sector}
        </p>
        <div className="flex items-center gap-3 text-[10px] text-muted font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {request.time}
          </span>
          <span className="flex items-center gap-1">
            <ShieldAlert size={12} /> {request.type} Req
          </span>
        </div>
      </div>
    </div>
    {isActive && (
      <div className="absolute top-0 right-0 w-1.5 h-full bg-jade-accent" />
    )}
  </div>
);

const ActiveSOSRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mapMode, setMapMode] = useState('tactical');

  const requests = [
    { id: 1, hospital: 'City General Hospital', priority: 'CRITICAL', location: 'Mumbai South', sector: '7A', time: '2m ago', type: 'O-', donorsMatched: 4, coordinates: [18.9229, 72.8343] },
    { id: 2, hospital: 'Fortis Memorial', priority: 'URGENT', location: 'Gurgaon', sector: '12C', time: '15m ago', type: 'AB+', donorsMatched: 2, coordinates: [28.4595, 77.0266] },
    { id: 3, hospital: 'Apollo Health City', priority: 'PENDING', location: 'Hyderabad', sector: '4B', time: '45m ago', type: 'B-', donorsMatched: 0, coordinates: [17.3850, 78.4867] },
    { id: 4, hospital: 'St. Mary’s Clinic', priority: 'URGENT', location: 'Kolkata', sector: '9D', time: '1h ago', type: 'A+', donorsMatched: 3, coordinates: [22.5726, 88.3639] },
  ];

  // Set initial selection
  if (!selectedRequest) setSelectedRequest(requests[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full overflow-hidden">
      {/* List Panel */}
      <div className="lg:col-span-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-jade-sidebar">Active Queue</h4>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-jade-sidebar/10 rounded-lg text-muted hover:text-jade-accent transition-colors shadow-sm">
              <Filter size={16} />
            </button>
            <button className="p-2 bg-white border border-jade-sidebar/10 rounded-lg text-muted hover:text-jade-accent transition-colors shadow-sm">
              <Search size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide pb-6">
          {requests.map((req) => (
            <SOSCard 
              key={req.id} 
              request={req} 
              onSelect={setSelectedRequest}
              isActive={selectedRequest?.id === req.id}
            />
          ))}
        </div>
      </div>

      {/* Map & Response Panel */}
      <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-hidden">
        {/* Real-time Map */}
        <div className="flex-1 bg-white rounded-3xl border border-jade-sidebar/10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-jade-sidebar/10 shadow-xl flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-jade-sidebar uppercase tracking-wider">Live Monitoring</span>
              </div>
              <div className="h-4 w-px bg-jade-sidebar/10" />
              <div className="flex gap-2">
                <button 
                  onClick={() => setMapMode('tactical')}
                  className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold transition-all",
                    mapMode === 'tactical' ? "bg-jade-sidebar text-white" : "bg-jade-bg text-muted hover:text-jade-sidebar"
                  )}
                >
                  TACTICAL
                </button>
                <button 
                  onClick={() => setMapMode('satellite')}
                  className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold transition-all",
                    mapMode === 'satellite' ? "bg-jade-sidebar text-white" : "bg-jade-bg text-muted hover:text-jade-sidebar"
                  )}
                >
                  SATELLITE
                </button>
              </div>
            </div>
            
            {/* Sector Labels Legend */}
            <div className="bg-jade-sidebar/90 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-2xl space-y-2">
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Sector Analysis</p>
              {[
                { sector: '7A', status: 'CRITICAL', color: 'bg-primary' },
                { sector: '12C', status: 'URGENT', color: 'bg-warning' },
                { sector: '4B', status: 'STABLE', color: 'bg-success' },
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", s.color)} />
                    <span className="text-[10px] font-bold text-white">{s.sector}</span>
                  </div>
                  <span className="text-[9px] font-medium text-white/40">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <button className="p-3 bg-white/90 backdrop-blur rounded-xl border border-jade-sidebar/10 shadow-xl text-jade-sidebar hover:text-jade-accent transition-colors">
              <Layers size={20} />
            </button>
          </div>

          <div className="w-full h-full grayscale-[0.5] contrast-[1.1]">
            <MapView 
              center={selectedRequest?.coordinates || [20.5937, 78.9629]} 
              zoom={13}
              markers={requests.map(req => ({
                position: req.coordinates,
                title: req.hospital,
                subtitle: `Priority: ${req.priority} | Sector ${req.sector}`
              }))}
            />
          </div>
        </div>

        {/* Response Controls */}
        <div className="bg-white p-6 rounded-3xl border border-jade-sidebar/10 shadow-sm flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center relative",
              selectedRequest?.priority === 'CRITICAL' ? "bg-primary/10 text-primary" :
              selectedRequest?.priority === 'URGENT' ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
            )}>
              <ShieldAlert size={32} />
              {selectedRequest?.priority === 'CRITICAL' && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center">
                  !
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xl font-bold text-jade-sidebar">{selectedRequest?.hospital}</h4>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase",
                  selectedRequest?.priority === 'CRITICAL' ? "bg-primary text-white" :
                  selectedRequest?.priority === 'URGENT' ? "bg-warning text-white" : "bg-info text-white"
                )}>
                  {selectedRequest?.priority}
                </span>
              </div>
              <p className="text-xs text-muted font-medium">
                Matched Donors: <span className="text-jade-accent font-bold">{selectedRequest?.donorsMatched} available nearby</span>
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 min-w-[300px]">
            <button className="flex-1 py-4 bg-jade-bg text-jade-sidebar font-bold text-xs rounded-2xl hover:bg-jade-sidebar hover:text-white transition-all border border-jade-sidebar/10 uppercase tracking-widest">
              Assign Donors
            </button>
            <button className={cn(
              "flex-1 py-4 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest",
              selectedRequest?.priority === 'CRITICAL' ? "bg-primary hover:bg-primary/90 shadow-primary/20 animate-pulse-red" :
              selectedRequest?.priority === 'URGENT' ? "bg-warning hover:bg-warning/90 shadow-warning/20" : "bg-info hover:bg-info/90 shadow-info/20"
            )}>
              RESPOND <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSOSRequests;
