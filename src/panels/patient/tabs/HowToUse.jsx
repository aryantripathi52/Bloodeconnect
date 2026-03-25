import React from 'react';
import { UserPlus, AlertTriangle, Search, MessageSquare, Map, Star, PlayCircle, Download } from 'lucide-react';

const steps = [
    { icon: <UserPlus/>, title: "Register & Verify", desc: "Create your account and complete your profile for faster matching." },
    { icon: <AlertTriangle/>, title: "Submit SOS Request", desc: "In an emergency, fill out the simple form with blood group and location." },
    { icon: <Search/>, title: "AI Matches Donors", desc: "Our AI instantly finds the closest, most reliable donors for you." },
    { icon: <MessageSquare/>, title: "Donors Get Alerted", desc: "Matched donors receive instant SMS, WhatsApp, and in-app notifications." },
    { icon: <Map/>, title: "Track Donor Response", desc: "See donor locations and their status in real-time on the live map." },
    { icon: <Star/>, title: "Confirm & Rate", desc: "Once you receive the donation, confirm it and rate your experience." },
];

const Step = ({ icon, title, desc, number }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center font-bold text-xl">
            {number}
        </div>
        <div>
            <h3 className="font-bold text-lg text-dark flex items-center">{icon}{title}</h3>
            <p className="text-muted">{desc}</p>
        </div>
    </div>
);

const HowToUse = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-dark">How to Use BloodConnect AI</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {steps.map((step, i) => (
                        <Step key={i} number={i+1} {...step} />
                    ))}
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-64">
                        <PlayCircle size={64} className="text-primary mb-4"/>
                        <h3 className="font-bold text-xl text-dark">Video Tutorial</h3>
                        <p className="text-muted">Coming Soon</p>
                    </div>
                    <button className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-red-700">
                        <Download size={18} className="mr-2" /> Download PDF Guide
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
