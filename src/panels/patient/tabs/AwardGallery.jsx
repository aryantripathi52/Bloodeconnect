import React from 'react';
import { Medal, Shield, Heart, Lock, User } from 'lucide-react';

const badges = [
    { name: 'First Request', desc: 'Made your first SOS call', date: '2022-11-12', icon: <Medal/>, earned: true },
    { name: 'Life Saver', desc: 'First request fulfilled', date: '2022-11-12', icon: <Heart/>, earned: true },
    { name: 'Loyal User', desc: 'Made 5 requests', date: '2023-03-15', icon: <Shield/>, earned: true },
    { name: 'Emergency Hero', desc: 'Made 3 critical requests', date: '2023-03-15', icon: <Medal/>, earned: true },
    { name: 'Community Champion', desc: 'Made 10 requests', icon: <Shield/>, earned: false },
    { name: 'Platform Advocate', desc: 'Referred a new user', icon: <Heart/>, earned: false },
];

const hallOfFame = [
    { name: "Rahul Mehta", donations: 3 },
    { name: "Ananya Singh", donations: 2 },
    { name: "Vikram Nair", donations: 1 },
];

const BadgeCard = ({ badge }) => (
    <div className={`p-5 rounded-xl text-center flex flex-col items-center justify-between transition-all duration-300 ${badge.earned ? 'bg-white shadow-sm hover:shadow-md hover:scale-105' : 'bg-gray-100'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${badge.earned ? 'bg-primary-light text-primary' : 'bg-gray-200 text-gray-400'}`}>
            {badge.earned ? badge.icon : <Lock />}
        </div>
        <h3 className={`font-bold text-lg ${badge.earned ? 'text-dark' : 'text-gray-500'}`}>{badge.name}</h3>
        <p className={`text-sm mb-3 ${badge.earned ? 'text-muted' : 'text-gray-400'}`}>{badge.desc}</p>
        {badge.earned ? 
            <p className="text-xs font-semibold text-primary">Earned: {badge.date}</p> : 
            <p className="text-xs font-semibold text-gray-400">Locked</p>
        }
    </div>
);

const AwardGallery = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-dark">Your Recognition & Milestones</h1>
                <p className="text-muted">Every request you raise brings someone closer to life.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {badges.map((badge, i) => <BadgeCard key={i} badge={badge} />)}
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-bold text-dark mb-2">Next Badge: Community Champion</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-right text-sm text-muted mt-1">8 more requests to unlock</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-dark mb-4">Hall of Fame</h2>
                <p className="text-muted mb-4">Top donors who responded to your requests.</p>
                <div className="bg-white p-5 rounded-lg shadow-sm space-y-4">
                    {hallOfFame.map((donor, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <p className="font-bold text-dark">{donor.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-primary">{donor.donations} Donations</p>
                                <p className="text-xs text-muted">to your requests</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AwardGallery;
