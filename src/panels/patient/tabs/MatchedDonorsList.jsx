import React, { useEffect, useState } from 'react';
import { User, Star, Droplets, MapPin, Search, SlidersHorizontal, Send, Eye, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

const TrustScore = ({ score }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < Math.floor(score) ? "text-yellow-400 fill-current" : "text-gray-300"} />
        ))}
        <span className="ml-2 text-sm font-bold text-dark">{score}</span>
    </div>
);

const DonorCard = ({ donor }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="font-bold text-lg text-dark">{donor.name}</p>
                    <p className="text-sm text-muted">{donor.distance} away</p>
                </div>
            </div>
            <span className="font-black text-lg text-primary px-3 py-1 bg-primary-light rounded-lg">{donor.blood_group || donor.bloodGroup}</span>
        </div>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-muted">Trust Score</span>
                <TrustScore score={donor.trust_score || donor.trustScore} />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted">Last Donated</span>
                <span className="font-semibold text-dark">{donor.last_donation || donor.lastDonation}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted">Response Rate</span>
                <span className="font-semibold text-dark">{donor.response_rate || donor.responseRate}</span>
            </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-white text-primary border-2 border-primary font-semibold hover:bg-primary-light transition-colors">
                <Eye size={16} className="mr-2" /> View Profile
            </button>
            <button className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-success text-white font-semibold hover:bg-green-600 transition-colors">
                <Send size={16} className="mr-2" /> Send Request
            </button>
        </div>
    </div>
);

const MatchedDonorsList = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('donors')
                    .select('*');

                if (error) throw error;
                setDonors(data);
            } catch (err) {
                console.error('Error fetching donors:', err.message);
                setError(err.message);
                // Fallback to mock data if table doesn't exist yet
                setDonors([
                    { name: "Rahul Mehta", bloodGroup: "B+", distance: "1.2 km", trustScore: 4.8, lastDonation: "3 months ago", responseRate: "95%" },
                    { name: "Ananya Singh", bloodGroup: "B+", distance: "2.5 km", trustScore: 4.5, lastDonation: "1 month ago", responseRate: "98%" },
                    { name: "Vikram Nair", bloodGroup: "O+", distance: "3.1 km", trustScore: 4.2, lastDonation: "6 months ago", responseRate: "85%" },
                    { name: "Priya Sharma", bloodGroup: "A-", distance: "4.0 km", trustScore: 4.9, lastDonation: "2 weeks ago", responseRate: "99%" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark">Matched Donors</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input type="text" placeholder="Search by name..." className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-primary focus:border-primary" />
                </div>
                <select className="bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-2 font-semibold text-dark">
                    <option>Blood Group</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>O-</option>
                </select>
                <select className="bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-2 font-semibold text-dark">
                    <option>Distance</option>
                    <option>&lt; 5 km</option>
                    <option>&lt; 10 km</option>
                </select>
                <button className="p-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-dark">
                    <SlidersHorizontal size={20} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-muted font-semibold">Connecting to Supabase...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {donors.map((donor, idx) => (
                        <DonorCard key={idx} donor={donor} />
                    ))}
                </div>
            )}
            
            {error && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                        <strong>Note:</strong> Showing local mock data because the 'donors' table was not found in Supabase.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MatchedDonorsList;

