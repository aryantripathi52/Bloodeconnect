import React, { useState } from 'react';
import { Map, List, Building, MapPin, Clock, Phone, Navigation, Droplets, ArrowUpDown } from 'lucide-react';

const bloodBanks = [
    { name: "N. Asia Regional Center", address: "MG Road, Gurgaon", distance: "0.8 km", groups: ["A+","B+","O+"], hours: "24/7 Open", closest: true },
    { name: "Birlamund Blood Store", address: "Sector 14, Gurgaon", distance: "1.4 km", groups: ["B+","AB-"], hours: "9am - 5pm" },
    { name: "City Cannula Hub", address: "DLF Phase 2", distance: "2.2 km", groups: ["O+","A-","B-"], hours: "9am - 9pm" }
];

const requestHistory = [
    { date: '2023-03-15', bloodGroup: 'B+', location: 'N. Asia Regional Center', status: 'Fulfilled' },
    { date: '2023-02-20', bloodGroup: 'O-', location: 'City Cannula Hub', status: 'Fulfilled' },
    { date: '2023-01-10', bloodGroup: 'B+', location: 'Self-Donation', status: 'Cancelled' },
];

const BloodGroupPill = ({ group }) => (
    <span className="px-2 py-1 text-xs font-bold bg-primary-light text-primary rounded-full">{group}</span>
);

const StatusPill = ({ status }) => {
    const style = {
        Fulfilled: 'bg-success/10 text-success',
        Pending: 'bg-warning/10 text-warning',
        Cancelled: 'bg-muted/10 text-muted'
    }[status];
    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${style}`}>{status}</span>
};

const BloodBankCard = ({ bank }) => (
    <div className={`bg-white p-5 rounded-xl shadow-sm border-2 ${bank.closest ? 'border-primary' : 'border-gray-200'}`}>
        {bank.closest && <div className="text-xs font-bold text-primary mb-2">CLOSEST TO YOU</div>}
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-dark">{bank.name}</h3>
                <p className="text-sm text-muted flex items-center"><MapPin size={14} className="mr-2"/>{bank.address} ({bank.distance})</p>
            </div>
            <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md bg-primary text-white"><Phone size={16}/></button>
                <button className="p-2 rounded-md bg-blue-500 text-white"><Navigation size={16}/></button>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-dark flex items-center"><Droplets size={14} className="mr-2"/>Available Groups</p>
                <div className="flex space-x-2">
                    {bank.groups.map(g => <BloodGroupPill key={g} group={g} />)}
                </div>
            </div>
            <p className="text-sm font-semibold text-dark flex items-center"><Clock size={14} className="mr-2"/>{bank.hours}</p>
        </div>
    </div>
);

const NearbyBloodBanks = () => {
    const [view, setView] = useState('List');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-dark">Blood Logistics</h1>
                <p className="text-muted">Find nearby blood banks and manage your requests.</p>
            </div>

            <div className="flex justify-end">
                <div className="flex items-center bg-gray-200 rounded-lg p-1">
                    <button onClick={() => setView('List')} className={`px-4 py-2 rounded-md font-semibold flex items-center ${view === 'List' ? 'bg-white shadow' : 'text-muted'}`}><List size={16} className="mr-2"/>List View</button>
                    <button onClick={() => setView('Map')} className={`px-4 py-2 rounded-md font-semibold flex items-center ${view === 'Map' ? 'bg-white shadow' : 'text-muted'}`}><Map size={16} className="mr-2"/>Map View</button>
                </div>
            </div>

            {view === 'List' ? (
                <div className="space-y-4">
                    {bloodBanks.map((bank, i) => <BloodBankCard key={i} bank={bank} />)}
                </div>
            ) : (
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-muted shadow-inner">Map View Placeholder</div>
            )}

            <div>
                <h2 className="text-xl font-bold text-dark mb-4">Request History</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Date', 'Blood Group', 'Location', 'Status', 'Action'].map(h => (
                                    <th key={h} className="p-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                                        <div className="flex items-center">{h} <ArrowUpDown size={12} className="ml-2"/></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requestHistory.map((req, i) => (
                                <tr key={i}>
                                    <td className="p-3 text-sm text-dark font-medium">{req.date}</td>
                                    <td className="p-3"><BloodGroupPill group={req.bloodGroup} /></td>
                                    <td className="p-3 text-sm text-dark font-medium">{req.location}</td>
                                    <td className="p-3"><StatusPill status={req.status} /></td>
                                    <td className="p-3"><button className="font-semibold text-primary text-sm">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NearbyBloodBanks;
