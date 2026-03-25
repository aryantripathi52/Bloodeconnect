import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { User, Star, Phone, RefreshCw, Loader2 } from 'lucide-react';

// Mock data updated for Google Maps (lat/lng objects)
const donors = [
  { name: "Rahul Mehta", bloodGroup: "B+", distance: "1.2 km", trustScore: 4.8, status: "Responding", position: { lat: 28.4595, lng: 77.0266 } },
  { name: "Ananya Singh", bloodGroup: "B+", distance: "2.5 km", trustScore: 4.5, status: "Pending", position: { lat: 28.46, lng: 77.03 } },
  { name: "Vikram Nair", bloodGroup: "O+", distance: "3.1 km", trustScore: 4.2, status: "Declined", position: { lat: 28.45, lng: 77.02 } }
];

const userPosition = { lat: 28.457, lng: 77.025 }; // Gurgaon

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full text-white";
  let colorClass = "";
  switch (status) {
    case "Responding": colorClass = "bg-success animate-pulse"; break;
    case "Pending": colorClass = "bg-warning"; break;
    case "Declined": colorClass = "bg-muted"; break;
    default: colorClass = "bg-gray-400";
  }
  return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
};

const DonorCard = ({ donor }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
    <div className="flex items-center">
      <div className="p-3 bg-primary-light rounded-full mr-4">
        <User className="text-primary" />
      </div>
      <div>
        <p className="font-bold text-dark">{donor.name} <span className="text-primary font-black">{donor.bloodGroup}</span></p>
        <p className="text-sm text-muted">{donor.distance} away | {donor.trustScore} <Star className="w-3 h-3 inline text-yellow-400 fill-current" /></p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
        <StatusBadge status={donor.status} />
        <button className="p-2 bg-primary text-white rounded-md hover:bg-red-700">
            <Phone size={16} />
        </button>
    </div>
  </div>
);

const LiveDonorTracker = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const options = useMemo(() => ({
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
        {
          "featureType": "poi",
          "stylers": [{ "visibility": "off" }]
        }
    ]
  }), []);

  if (loadError) {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] bg-red-50 text-red-500 rounded-lg border border-red-200 p-6 text-center">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <h3 className="font-bold text-lg">Map Load Error</h3>
            <p className="text-sm">Please check your Google Maps API Key in the .env file.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-dark">Live Donor Tracker</h1>
            <div className="flex items-center text-sm text-muted">
                <RefreshCw size={14} className="mr-2 animate-spin" />
                Last updated 12s ago
            </div>
        </div>
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 relative">
        {!isLoaded ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-muted font-semibold">Loading Google Maps...</p>
            </div>
        ) : (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userPosition}
                zoom={14}
                options={options}
            >
                {/* User Marker */}
                <Marker 
                    position={userPosition} 
                    icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    title="Your Location"
                />
                
                {/* Donor Markers */}
                {donors.map((donor, idx) => (
                    <Marker 
                        key={idx} 
                        position={donor.position} 
                        icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        title={`${donor.name} (${donor.bloodGroup})`}
                    />
                ))}

                {/* Radius Circle */}
                <Circle
                    center={userPosition}
                    radius={5000}
                    options={{
                        fillColor: "#3B82F6",
                        fillOpacity: 0.1,
                        strokeColor: "#3B82F6",
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold text-dark mb-4">Elite Matched Donors</h2>
        <div className="space-y-3">
          {donors.map((donor, idx) => <DonorCard key={idx} donor={donor} />)}
        </div>
      </div>
    </div>
  );
};

export default LiveDonorTracker;
