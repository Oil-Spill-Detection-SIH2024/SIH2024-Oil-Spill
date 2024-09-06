import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the center coordinates for Mumbai
const mumbaiPosition = [19.076, 72.8777];

// Use an external URL for the ship icon image
const shipIconUrl = './ship-icon.png'; // Example ship icon URL

// Fix default marker icon issues by setting the path manually
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create a custom icon
const shipIcon = new L.Icon({
  iconUrl: shipIconUrl,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

// Define ship positions around the Mumbai coastline
const shipPositions = [
  [18.9, 72.8],
  [18.7, 72.6],
  [19.0, 72.5],
  [18.6, 72.9],
  [19.2, 72.7],
  [18.8, 72.4],
  [19.1, 72.6],
  [18.5, 72.8],
  [19.3, 72.9],
  [18.4, 72.7],
];

const MapComponent = () => {
  const [cursorPosition, setCursorPosition] = useState({ lat: mumbaiPosition[0], lng: mumbaiPosition[1] });
  const [selectedShip, setSelectedShip] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Define state for menu
  const [searchQuery, setSearchQuery] = useState(''); // Define state for search query

  // Custom hook to listen to map events
  const MapEvents = () => {
    useMapEvents({
      mousemove(e) {
        const { lat, lng } = e.latlng; // Get latitude and longitude from the mousemove event
        setCursorPosition({ lat, lng }); // Update cursor position state
      },
    });
    return null;
  };

  return (
    <div className="flex-grow h-full w-full relative">
      <MapContainer
        center={mumbaiPosition}
        zoom={10}
        className="h-full w-full"
        style={{ height: 'calc(100% - 40px)' }} // Adjust map height to leave space for the footer
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents /> {/* Include custom map event listener component */}
        <Marker position={mumbaiPosition}>
          <Popup>
            Mumbai Coastline <br />
            Latitude: {mumbaiPosition[0]} <br />
            Longitude: {mumbaiPosition[1]}
          </Popup>
        </Marker>
        {shipPositions.map((position, index) => (
          <Marker 
            key={index} 
            position={position} 
            icon={shipIcon}
            eventHandlers={{
              click: () => setSelectedShip(index), // Show sidebar directly on marker click
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              <span>Ship {index + 1} <br /> Latitude: {position[0]} <br /> Longitude: {position[1]}</span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Sidebar with ship details */}
      {selectedShip !== null && (
        <div className="fixed left-0 top-0 h-full w-1/3 bg-white shadow-lg z-[1000] p-6 border-r border-gray-200">
          {/* Close Button */}
          <button 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
            onClick={() => setSelectedShip(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Ship Details */}
          <div className="text-center mb-6">
            <h3 className="font-semibold text-2xl text-gray-800">Ship {selectedShip + 1}</h3>
            <img src="https://via.placeholder.com/200" alt={`Ship ${selectedShip + 1}`} className="mx-auto mt-4 rounded-lg shadow-md" />
          </div>

          {/* Ship Description */}
          <p className="text-gray-600 mb-4 text-center">This is the description for Ship {selectedShip + 1}.</p>
          
          {/* Additional Ship Information */}
          <div className="border-t border-gray-300 pt-4 text-left text-gray-700 space-y-3">
            <p><strong className="text-gray-800">Vessel No:</strong> 123456</p>
            <p><strong className="text-gray-800">IMO No:</strong> 123456</p>
            <p><strong className="text-gray-800">SOG:</strong> 45.2 km/hr</p>
            <p><strong className="text-gray-800">COG:</strong> 78°</p>
            <p><strong className="text-gray-800">Latitude:</strong> {shipPositions[selectedShip][0].toFixed(4)}</p>
            <p><strong className="text-gray-800">Longitude:</strong> {shipPositions[selectedShip][1].toFixed(4)}</p>
            <p><strong className="text-gray-800">Date:</strong> 12/12/2021</p>
          </div>
        </div>
      )}

<footer style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px', background: '#f1f1f1', zIndex: 1000 }}>
        <p>Latitude: {cursorPosition.lat.toFixed(4)} | Longitude: {cursorPosition.lng.toFixed(4)}</p>
      </footer>
    </div>
  );
};




export default MapComponent;
