import React, { useState } from 'react';
import { Mail, Bell, User, MapPin, Wind, AlertTriangle, Heart, Droplets, Shield, X } from 'lucide-react';

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
    <div className="p-3 bg-primary-light rounded-full mr-4">{icon}</div>
    <div>
      <p className="text-muted text-sm font-medium">{label}</p>
      <p className="text-dark text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const BloodGroupSelector = ({ selected, setSelected }) => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {bloodGroups.map(bg => (
        <button 
          key={bg} 
          onClick={() => setSelected(bg)}
          className={`p-2 rounded-md text-center font-bold border-2 ${selected === bg ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {bg}
        </button>
      ))}
    </div>
  );
};

const UrgencySelector = ({ selected, setSelected }) => {
  const urgencies = [
    { id: 'Critical', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
    { id: 'Urgent', icon: <Wind className="w-4 h-4 mr-2" /> },
    { id: 'Normal', icon: <Heart className="w-4 h-4 mr-2" /> },
  ];
  return (
    <div className="flex space-x-2">
      {urgencies.map(urg => (
        <button 
          key={urg.id} 
          onClick={() => setSelected(urg.id)}
          className={`flex-1 flex items-center justify-center p-3 rounded-md font-semibold border-2 ${selected === urg.id ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {urg.icon} {urg.id}
        </button>
      ))}
    </div>
  );
};

const PatientDashboard = () => {
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [urgency, setUrgency] = useState('Critical');
  const activeRequest = { bloodGroup: "B+", urgency: "Critical", status: "Pending", requestedAt: "2 min ago" };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">Hello, Priya. Every second counts.</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Droplets className="text-primary" />} label="Total Requests" value="12" />
        <StatCard icon={<Heart className="text-success" />} label="Lives Impacted" value="8" />
        <StatCard icon={<Shield className="text-info" />} label="Donations Received" value="15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">New Emergency Request</h2>
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-muted mb-2 block">Blood Group</label>
              <BloodGroupSelector selected={bloodGroup} setSelected={setBloodGroup} />
            </div>
            <div>
              <label className="font-semibold text-muted mb-2 block">Urgency</label>
              <UrgencySelector selected={urgency} setSelected={setUrgency} />
            </div>
            <div>
              <label className="font-semibold text-muted mb-2 block">Location</label>
              <div className="flex space-x-2">
                <button className="w-full flex items-center justify-center p-3 rounded-md bg-gray-100 text-gray-600 font-semibold border-2 border-gray-200">
                  <MapPin className="w-4 h-4 mr-2" /> Auto-detect Location
                </button>
                <input type="text" placeholder="Or enter manually" className="w-full p-3 rounded-md bg-gray-100 border-2 border-gray-200 focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <button className="w-full bg-primary text-white font-bold text-lg p-4 rounded-lg shadow-lg hover:bg-red-700 transition-colors animate-pulse-slow">
              Submit SOS Request
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {activeRequest && (
            <div className="bg-primary-light p-6 rounded-lg shadow-sm border border-primary">
              <h3 className="font-bold text-dark mb-3">Active Request Status</h3>
              <div className="flex justify-between items-center mb-4">
                <span className={`font-bold text-2xl text-primary`}>{activeRequest.bloodGroup}</span>
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${activeRequest.urgency === 'Critical' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-white'}`}>{activeRequest.urgency}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted">
                <span>Status: <span className="font-bold text-dark">{activeRequest.status}</span></span>
                <span>{activeRequest.requestedAt}</span>
              </div>
              <button className="mt-4 w-full flex items-center justify-center p-2 rounded-md bg-white text-primary font-semibold border-2 border-primary hover:bg-primary-light">
                <X className="w-4 h-4 mr-2" /> Cancel Request
              </button>
            </div>
          )}
          <div className="bg-white p-4 rounded-lg shadow-sm h-48 flex items-center justify-center">
            <p className="text-muted">Mini map preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
