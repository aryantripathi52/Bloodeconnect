import React from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, 
  Heart, Activity, Download, Filter, 
  Calendar, PieChart as PieChartIcon, Map as MapIcon,
  Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  Legend
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const demographicsData = [
  { name: '18-25', value: 400, color: '#2d7a4f' },
  { name: '26-35', value: 300, color: '#3dba6e' },
  { name: '36-45', value: 200, color: '#1a2e1f' },
  { name: '46+', value: 100, color: '#8a9a94' },
];

const contributionData = [
  { name: 'Week 1', value: 2400 },
  { name: 'Week 2', value: 1398 },
  { name: 'Week 3', value: 9800 },
  { name: 'Week 4', value: 3908 },
  { name: 'Week 5', value: 4800 },
  { name: 'Week 6', value: 3800 },
];

const StatCard = ({ title, value, delta, icon: Icon, isNegative = false }) => (
  <div className="bg-white p-6 rounded-2xl border border-jade-sidebar/10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-jade-bg text-jade-accent rounded-xl group-hover:bg-jade-accent group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        isNegative ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
      )}>
        {isNegative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        {delta}
      </div>
    </div>
    <h3 className="text-3xl font-bold text-jade-sidebar mb-1">{value}</h3>
    <p className="text-sm text-muted font-medium">{title}</p>
  </div>
);

const AnalyticsReports = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="24,892" delta="+8.2%" icon={Users} />
        <StatCard title="Total Donations" value="$1.2M" delta="+12.4%" icon={TrendingUp} />
        <StatCard title="Verified Donors" value="1,402" delta="+4.1%" icon={Heart} />
        <StatCard title="System Health" value="98.2%" delta="-0.5%" icon={Activity} isNegative={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-jade-sidebar/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-bold text-jade-sidebar">Contribution Trends</h4>
              <p className="text-sm text-muted">Weekly donation metrics overview</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-jade-bg text-jade-sidebar rounded-xl text-xs font-bold hover:bg-jade-sidebar hover:text-white transition-all border border-jade-sidebar/10">
                <Calendar size={14} className="inline mr-2" /> Last 30 Days
              </button>
              <button className="p-2 bg-jade-bg text-jade-sidebar rounded-xl hover:bg-jade-sidebar hover:text-white transition-all border border-jade-sidebar/10 shadow-sm">
                <Download size={18} />
              </button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a9a94', fontSize: 13, fontWeight: 600 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a9a94', fontSize: 13, fontWeight: 600 }}
                  dx={-10}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f4f7f5' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    padding: '12px 16px'
                  }} 
                  itemStyle={{ fontWeight: 700, color: '#1a2e1f' }}
                  labelStyle={{ fontWeight: 800, color: '#8a9a94', marginBottom: '4px', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#2d7a4f" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* AI Insight Fixed */}
          <div className="mt-8 p-6 bg-jade-accent/5 border border-jade-accent/10 rounded-2xl flex items-start gap-4 shadow-sm">
            <div className="p-2.5 bg-jade-accent text-white rounded-xl">
              <Activity size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-sm font-bold text-jade-sidebar uppercase tracking-wider">AI INSIGHT ENGINE</h5>
                <span className="text-[10px] font-bold text-jade-accent bg-white px-2 py-0.5 rounded-full border border-jade-accent/10">PREDICTIVE</span>
              </div>
              <p className="text-sm text-jade-sidebar leading-relaxed">
                <span className="font-bold text-jade-accent">Observation:</span> Contribution trends indicate a <span className="font-bold">14% surge</span> in O- group demand next week in Mumbai. We recommend shifting reserve allocations from stable sectors to central hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white p-8 rounded-3xl border border-jade-sidebar/10 shadow-sm flex flex-col">
          <h4 className="text-xl font-bold text-jade-sidebar mb-2">Demographics</h4>
          <p className="text-sm text-muted mb-8">User age distribution breakdown</p>
          
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-black text-jade-sidebar">1,402</p>
              <p className="text-xs font-bold text-muted uppercase tracking-widest">Donors</p>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {demographicsData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-bold text-jade-sidebar">{item.name} Years</span>
                </div>
                <span className="text-sm font-bold text-muted">{item.value} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regional Impact Map */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-jade-sidebar/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-jade-sidebar flex items-center gap-2">
              <MapIcon size={20} className="text-jade-accent" /> Regional Impact
            </h4>
            <div className="flex gap-2">
              <button className="p-2 bg-jade-bg rounded-lg text-muted hover:text-jade-sidebar transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="aspect-square bg-jade-sidebar rounded-2xl relative overflow-hidden mb-6 group">
             {/* Map Legend Fixed */}
             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-3 rounded-xl border border-jade-sidebar/10 shadow-xl space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[10px] font-bold text-jade-sidebar uppercase tracking-widest mb-1">Impact Legend</p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-jade-accent" />
                <span className="text-[10px] font-bold text-jade-sidebar">High Density</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-jade-sidebar border border-white/20" />
                <span className="text-[10px] font-bold text-jade-sidebar">Low Coverage</span>
              </div>
            </div>
            
            <div className="w-full h-full flex items-center justify-center text-white/20">
              <MapIcon size={120} strokeWidth={0.5} />
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-jade-accent rounded-full animate-pulse shadow-lg shadow-jade-accent/50" />
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-jade-accent-light rounded-full animate-pulse shadow-lg shadow-jade-accent-light/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-jade-bg rounded-xl border border-jade-sidebar/5">
              <p className="text-[10px] font-bold text-muted uppercase mb-1">Top Region</p>
              <p className="text-sm font-bold text-jade-sidebar">Mumbai Metro</p>
            </div>
            <div className="p-4 bg-jade-bg rounded-xl border border-jade-sidebar/5">
              <p className="text-[10px] font-bold text-muted uppercase mb-1">Avg Response</p>
              <p className="text-sm font-bold text-jade-sidebar">12.4 mins</p>
            </div>
          </div>
        </div>

        {/* SOS Response Logs */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-jade-sidebar/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-jade-sidebar flex items-center gap-2">
              <PieChartIcon size={20} className="text-jade-accent" /> SOS Response Logs
            </h4>
            <button className="text-xs font-bold text-jade-accent flex items-center gap-2 group hover:text-jade-sidebar transition-colors">
              VIEW DETAILED HISTORY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-jade-bg text-[11px] uppercase tracking-widest text-muted font-bold">
                  <th className="pb-4 px-2">Request ID</th>
                  <th className="pb-4 px-2">Entity</th>
                  <th className="pb-4 px-2">Duration</th>
                  <th className="pb-4 px-2">Volunteers</th>
                  <th className="pb-4 px-2">Final Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: 'SOS-842', entity: 'Max Hospital', duration: '8m 24s', volunteers: 4, status: 'RESOLVED', color: 'success' },
                  { id: 'SOS-839', entity: 'Private Res.', duration: '14m 12s', volunteers: 2, status: 'RESOLVED', color: 'success' },
                  { id: 'SOS-835', entity: 'City Clinic', duration: '22m 05s', volunteers: 3, status: 'OPTIMIZED', color: 'info' },
                  { id: 'SOS-832', entity: 'Red Cross B.', duration: '5m 18s', volunteers: 6, status: 'RESOLVED', color: 'success' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-jade-bg last:border-0 hover:bg-jade-bg/30 transition-colors group">
                    <td className="py-4 px-2 font-black text-jade-sidebar tracking-tight">{row.id}</td>
                    <td className="py-4 px-2 font-bold text-muted">{row.entity}</td>
                    <td className="py-4 px-2 font-medium text-muted">{row.duration}</td>
                    <td className="py-4 px-2">
                      <div className="flex -space-x-2">
                        {[...Array(row.volunteers)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-jade-bg flex items-center justify-center text-[10px] font-bold text-jade-accent">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black tracking-widest",
                        row.color === 'success' ? "bg-success text-white shadow-lg shadow-success/20" : "bg-info text-white shadow-lg shadow-info/20"
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
      </div>
    </div>
  );
};

export default AnalyticsReports;
