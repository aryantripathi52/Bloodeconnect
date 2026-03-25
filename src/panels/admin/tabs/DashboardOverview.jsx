import React from 'react';
import { Users, ShieldCheck, Activity, Heart, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const donorGrowthData = [
  { name: 'Jan', donors: 400, requests: 240 },
  { name: 'Feb', donors: 300, requests: 139 },
  { name: 'Mar', donors: 200, requests: 980 },
  { name: 'Apr', donors: 278, requests: 390 },
  { name: 'May', donors: 189, requests: 480 },
  { name: 'Jun', donors: 239, requests: 380 },
];

const KPICard = ({ title, value, subtext, icon: Icon, color, isUrgent = false }) => (
  <div className={cn(
    "p-6 rounded-2xl border bg-white transition-all duration-300 relative overflow-hidden group hover:shadow-lg",
    isUrgent ? "animate-pulse-red border-primary bg-primary/5" : "border-jade-sidebar/10"
  )}>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm font-medium text-muted mb-1">{title}</p>
        <h3 className={cn(
          "text-3xl font-bold",
          isUrgent ? "text-primary" : "text-jade-sidebar"
        )}>{value}</h3>
        <p className={cn(
          "text-xs mt-2 flex items-center gap-1 font-medium",
          isUrgent ? "text-primary" : "text-jade-accent"
        )}>
          {isUrgent && <AlertCircle size={12} className="animate-flash-urgent" />}
          {subtext}
        </p>
      </div>
      <div className={cn(
        "p-3 rounded-xl",
        isUrgent ? "bg-primary text-white" : "bg-jade-bg text-jade-accent"
      )}>
        <Icon size={24} />
      </div>
    </div>
    <div className={cn(
      "absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500",
      isUrgent ? "bg-primary" : "bg-jade-accent"
    )} />
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Users" 
          value="1,284" 
          subtext="+12% from last month" 
          icon={Users} 
          color="jade"
        />
        <KPICard 
          title="Active Donors" 
          value="412" 
          subtext="Verified & Ready" 
          icon={Heart} 
          color="jade"
        />
        <KPICard 
          title="Pending Verifications" 
          value="24" 
          subtext="6 high priority" 
          icon={ShieldCheck} 
          color="jade"
        />
        <KPICard 
          title="Active SOS" 
          value="14" 
          subtext="Critical attention needed" 
          icon={Activity} 
          color="primary"
          isUrgent={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-jade-sidebar/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-bold text-jade-sidebar">Donor Growth Dynamics</h4>
              <p className="text-sm text-muted">Weekly trends of new registrations</p>
            </div>
            <div className="flex gap-2 bg-jade-bg p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-semibold bg-white text-jade-accent rounded shadow-sm">Weekly</button>
              <button className="px-3 py-1 text-xs font-semibold text-muted hover:text-jade-sidebar transition-colors">Monthly</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donorGrowthData}>
                <defs>
                  <linearGradient id="colorDonors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d7a4f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2d7a4f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a9a94', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a9a94', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="donors" 
                  stroke="#2d7a4f" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorDonors)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white p-6 rounded-2xl border border-jade-sidebar/10 shadow-sm">
          <h4 className="text-lg font-bold text-jade-sidebar mb-6">System Activity</h4>
          <div className="space-y-6">
            {[
              { id: 1, type: 'sos', user: 'Hospital City-X', action: 'Raised SOS Request', time: '2m ago', color: 'primary' },
              { id: 2, type: 'verify', user: 'Marcus Chen', action: 'Verification Approved', time: '15m ago', color: 'success' },
              { id: 3, type: 'donor', user: 'Sarah Lee', action: 'New Donor Registered', time: '1h ago', color: 'jade-accent' },
              { id: 4, type: 'alert', user: 'System', action: 'Infrastructure Healthy', time: '2h ago', color: 'info' },
            ].map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 ring-4 ring-opacity-10",
                  activity.color === 'primary' ? "bg-primary ring-primary" :
                  activity.color === 'success' ? "bg-success ring-success" :
                  activity.color === 'info' ? "bg-info ring-info" : "bg-jade-accent ring-jade-accent"
                )} />
                <div className="flex-1 border-b border-jade-bg pb-4 group-last:border-0">
                  <p className="text-sm font-bold text-jade-sidebar">{activity.user}</p>
                  <p className="text-xs text-muted">{activity.action}</p>
                  <p className="text-[10px] text-muted mt-1 italic">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-jade-accent hover:text-jade-sidebar transition-colors border border-jade-accent/20 rounded-lg bg-jade-bg/50">
            View All Logs
          </button>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="bg-white p-6 rounded-2xl border border-jade-sidebar/10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-jade-sidebar">Regional Distribution</h4>
          <button className="text-xs font-bold text-jade-accent flex items-center gap-1">
            <TrendingUp size={14} /> Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-jade-bg text-[10px] uppercase tracking-wider text-muted font-bold">
                <th className="pb-4 px-2">Region</th>
                <th className="pb-4 px-2">Active Donors</th>
                <th className="pb-4 px-2">Open SOS</th>
                <th className="pb-4 px-2">Supply Level</th>
                <th className="pb-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { region: 'Mumbai Metro', donors: 124, sos: 3, supply: '78%', status: 'OPTIMIZED', color: 'success' },
                { region: 'Delhi NCR', donors: 98, sos: 5, supply: '62%', status: 'STABLE', color: 'info' },
                { region: 'Bangalore', donors: 86, sos: 4, supply: '45%', status: 'WARNING', color: 'warning' },
                { region: 'Hyderabad', donors: 54, sos: 2, supply: '89%', status: 'OPTIMIZED', color: 'success' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-jade-bg last:border-0 hover:bg-jade-bg/30 transition-colors group">
                  <td className="py-4 px-2 font-bold text-jade-sidebar flex items-center gap-2">
                    <MapPin size={14} className="text-muted group-hover:text-jade-accent transition-colors" />
                    {row.region}
                  </td>
                  <td className="py-4 px-2 text-muted font-medium">{row.donors}</td>
                  <td className="py-4 px-2 text-muted font-medium">{row.sos}</td>
                  <td className="py-4 px-2">
                    <div className="w-24 bg-jade-bg h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          row.color === 'success' ? "bg-success" :
                          row.color === 'info' ? "bg-info" : "bg-warning"
                        )} 
                        style={{ width: row.supply }} 
                      />
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold tracking-tight",
                      row.color === 'success' ? "bg-success/10 text-success" :
                      row.color === 'info' ? "bg-info/10 text-info" : "bg-warning/10 text-warning"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Infrastructure Health Fixed */}
        <div className="mt-8 p-4 bg-jade-bg rounded-xl border border-jade-sidebar/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-jade-accent shadow-sm">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Infrastructure Health</p>
              <p className="text-sm font-bold text-jade-sidebar">All Systems Operational</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-jade-accent">99.98%</p>
            <p className="text-[10px] text-muted italic">Uptime last 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
