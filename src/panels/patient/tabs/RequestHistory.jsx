import React, { useState } from 'react';
import { Download, Filter, Calendar, Droplets, ChevronDown, ChevronUp } from 'lucide-react';

const requestHistory = [
    { id: 1, date: '2023-03-15', bloodGroup: 'B+', hospital: 'Medanta Hospital', urgency: 'Critical', status: 'Fulfilled', donor: 'Rahul Mehta' },
    { id: 2, date: '2023-02-20', bloodGroup: 'O-', hospital: 'Artemis Hospital', urgency: 'Urgent', status: 'Fulfilled', donor: 'Ananya Singh' },
    { id: 3, date: '2023-01-10', bloodGroup: 'B+', hospital: 'Self-Request', urgency: 'Normal', status: 'Cancelled', donor: 'N/A' },
    { id: 4, date: '2022-12-05', bloodGroup: 'A+', hospital: 'Fortis Memorial', urgency: 'Critical', status: 'Fulfilled', donor: 'Vikram Nair' },
    { id: 5, date: '2022-11-12', bloodGroup: 'AB+', hospital: 'Max Hospital', urgency: 'Urgent', status: 'Fulfilled', donor: 'Priya Sharma' },
];

const StatusPill = ({ status }) => {
    const style = {
        Fulfilled: 'bg-success/10 text-success',
        Pending: 'bg-warning/10 text-warning',
        Cancelled: 'bg-muted/20 text-muted'
    }[status];
    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${style}`}>{status}</span>
};

const UrgencyPill = ({ urgency }) => {
    const style = {
        Critical: 'bg-primary/10 text-primary',
        Urgent: 'bg-yellow-500/10 text-yellow-600',
        Normal: 'bg-blue-500/10 text-blue-600'
    }[urgency];
    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${style}`}>{urgency}</span>
};

const RequestHistoryRow = ({ req }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer hover:bg-gray-50">
                <td className="p-4 text-sm text-dark font-medium">{req.date}</td>
                <td className="p-4 text-sm text-dark font-bold">{req.bloodGroup}</td>
                <td className="p-4 text-sm text-dark">{req.hospital}</td>
                <td className="p-4"><UrgencyPill urgency={req.urgency} /></td>
                <td className="p-4"><StatusPill status={req.status} /></td>
                <td className="p-4 text-sm text-dark">{req.donor}</td>
                <td className="p-4">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</td>
            </tr>
            {isOpen && (
                <tr className="bg-gray-50">
                    <td colSpan="7" className="p-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div><span className="font-semibold">Request ID:</span> {req.id}</div>
                            <div><span className="font-semibold">Patient Name:</span> Priya Sharma</div>
                            <div><span className="font-semibold">Units Required:</span> 2</div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

const PatientRequestHistory = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark">Request History</h1>
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-sm hover:bg-red-700">
                    <Download size={16} className="mr-2" /> Export as CSV
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                <Filter size={20} className="text-muted" />
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted" />
                    <select className="bg-transparent font-semibold text-dark focus:outline-none">
                        <option>Date Range</option>
                        <option>Last 30 days</option>
                        <option>Last 6 months</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-muted" />
                    <select className="bg-transparent font-semibold text-dark focus:outline-none">
                        <option>Blood Group</option>
                        <option>All</option>
                        <option>B+</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Date', 'Blood Group', 'Hospital/Location', 'Urgency', 'Status', 'Donor Name', ''].map(h => (
                                <th key={h} className="p-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requestHistory.map((req) => <RequestHistoryRow key={req.id} req={req} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientRequestHistory;
