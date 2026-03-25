import React from 'react';
import { MapPin, Phone, Star, ShieldCheck } from 'lucide-react';
import BloodGroupBadge from './BloodGroupBadge';

const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white rounded-xl border border-border p-4 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={donor.avatar || `https://i.pravatar.cc/150?u=${donor.id}`}
              alt={donor.name}
              className="w-12 h-12 rounded-full border-2 border-primary-light shadow-sm"
            />
            {donor.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-border">
                <ShieldCheck size={14} className="text-success fill-success/10" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-dark group-hover:text-primary transition-colors">{donor.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted">
              <MapPin size={12} />
              <span>{donor.distance || '1.2 km away'}</span>
            </div>
          </div>
        </div>
        <BloodGroupBadge group={donor.bloodGroup} />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-bg p-2 rounded-lg text-center">
          <p className="text-[10px] text-muted uppercase font-bold tracking-wider mb-0.5">Trust Score</p>
          <div className="flex items-center justify-center gap-1 text-warning">
            <Star size={12} fill="currentColor" />
            <span className="text-sm font-bold text-dark">{donor.trustScore || '4.9'}</span>
          </div>
        </div>
        <div className="bg-bg p-2 rounded-lg text-center">
          <p className="text-[10px] text-muted uppercase font-bold tracking-wider mb-0.5">Donations</p>
          <p className="text-sm font-bold text-dark">{donor.totalDonations || '12'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-sm shadow-primary/20">
          Request Now
        </button>
        <button className="p-2 border border-border rounded-lg hover:bg-bg transition-colors text-muted hover:text-dark">
          <Phone size={18} />
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
