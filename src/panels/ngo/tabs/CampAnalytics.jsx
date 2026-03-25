import React from 'react';
import { 
  BarChart3, TrendingUp, Users, Heart, 
  Map as MapIcon, Download, Calendar, 
  ChevronRight, Activity, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';
import MapView from '../../../components/shared/MapView';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ageData = [
  { name: '18–25', value: 34 },
  { name: '26–35', value: 41 },
  { name: '36–50', value: 19 },
  { name: '51+', value: 6 },
];

const trajectoryData = [
  { month: 'Jan', actual: 400, projected: 450 },
  { month: 'Feb', actual: 600, projected: 580 },
  { month: 'Mar', actual: 800, projected: 750 },
  { month: 'Apr', actual: 1100, projected: 1000 },
  { month: 'May', actual: 950, projected: 1200 },
  { month: 'Jun', actual: 1400, projected: 1350 },
];

const BloodTypeMiniChart = ({ type, percent, color }) => (
  <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
    <div className="w-16 h-16 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ value: percent }, { value: 100 - percent }]}
            innerRadius={20}
            outerRadius={30}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill={color} />
            <Cell fill="#f4f6f5" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-dark">{percent}%</span>
      </div>
    </div>
    <div>
      <p className="text-xs font-black text-dark uppercase tracking-widest">{type}</p>
      <p className="text-[9px] text-muted font-bold">Inventory Share</p>
    </div>
  </div>
);

const CampAnalytics = () => {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Camp Analytics</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Global Success Rate</span>
              <span className="text-lg font-black text-success flex items-center gap-1">
                94.2% <TrendingUp size={16} />
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Total Donors</span>
              <span className="text-lg font-black text-dark">12,480</span>
            </div>
          </div>
        </div>
        <button className="px-8 py-3 bg-warning text-white rounded-xl text-xs font-black hover:bg-amber-600 transition-all shadow-lg shadow-warning/20 uppercase tracking-widest flex items-center gap-2">
          <Download size={18} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Demographics & Blood Types */}
        <div className="lg:col-span-2 space-y-8">
          {/* Age Demographics */}
          <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
            <h3 className="text-sm font-black text-dark uppercase tracking-widest mb-8 flex items-center gap-3">
              <Users size={20} className="text-warning" /> Age Demographics
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={ageData} margin={{ left: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#8a9a94', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#27AE60" 
                    radius={[0, 4, 4, 0]} 
                    barSize={24}
                    label={{ position: 'right', formatter: (v) => `${v}%`, fill: '#1c2e26', fontWeight: 800, fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Blood Type Inventory */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3 px-2">
              <PieChartIcon size={20} className="text-warning" /> Blood Type Inventory
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <BloodTypeMiniChart type="O+" percent={32} color="#27AE60" />
              <BloodTypeMiniChart type="A+" percent={28} color="#2980B9" />
              <BloodTypeMiniChart type="B+" percent={19} color="#F39C12" />
              <BloodTypeMiniChart type="AB+" percent={20} color="#8E44AD" />
            </div>
          </div>
        </div>

        {/* Right Column: Geographic Reach */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-bg">
              <h3 className="font-bold text-dark flex items-center gap-2 uppercase tracking-widest text-sm">
                <MapIcon size={18} className="text-warning" /> Geographic Donor Reach
              </h3>
            </div>
            
            <div className="flex-1 h-[400px] grayscale-[0.2] contrast-[1.1]">
              <MapView center={[20.5937, 78.9629]} zoom={5} />
            </div>

            <div className="p-6 bg-dark text-white space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Map Legend</span>
                <span className="text-warning">Live Sync</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Active Donors', color: 'bg-success' },
                  { label: 'Inactive / Pending', color: 'bg-white/20' },
                  { label: 'Track Boundaries', color: 'bg-warning' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", item.color)} />
                    <span className="text-[11px] font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Trajectory */}
      <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3">
            <Activity size={20} className="text-warning" /> Outcome Trajectory
          </h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-success" />
              <span className="text-[10px] font-black text-muted uppercase">Actual Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-muted border-t border-dashed border-muted" />
              <span className="text-[10px] font-black text-muted uppercase">Projected Use</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectoryData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#27AE60" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#27AE60" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8a9a94', fontSize: 12, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8a9a94', fontSize: 12, fontWeight: 700 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#27AE60" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#8a9a94" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CampAnalytics;
