import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Loader2, AlertTriangle } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const MapView = ({ center = { lat: 20.5937, lng: 78.9629 }, zoom = 5, markers = [] }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const options = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    styles: [
        {
          "featureType": "poi",
          "stylers": [{ "visibility": "off" }]
        }
    ]
  }), []);

  // Convert center array to object if necessary
  const mapCenter = Array.isArray(center) ? { lat: center[0], lng: center[1] } : center;

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
    <div className="w-full h-full rounded-xl overflow-hidden border border-border shadow-sm min-h-[400px] relative bg-gray-100">
      {!isLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-muted font-semibold">Loading Google Maps...</p>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={zoom}
          options={options}
        >
          {markers.map((marker, idx) => {
            const position = Array.isArray(marker.position) 
              ? { lat: marker.position[0], lng: marker.position[1] } 
              : marker.position;
              
            return (
              <Marker 
                key={idx} 
                position={position}
                onClick={() => setSelectedMarker(marker)}
              />
            );
          })}

          {selectedMarker && (
            <InfoWindow
              position={Array.isArray(selectedMarker.position) 
                ? { lat: selectedMarker.position[0], lng: selectedMarker.position[1] } 
                : selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2">
                <h4 className="text-sm font-bold text-dark">{selectedMarker.title}</h4>
                {selectedMarker.subtitle && <p className="text-xs text-muted mt-1">{selectedMarker.subtitle}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapView;
