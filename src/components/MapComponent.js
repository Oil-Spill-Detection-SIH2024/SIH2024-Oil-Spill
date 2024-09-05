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
    <div className="flex-grow h-full w-full" style={{ position: 'relative' }}>
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
        <div className="fixed left-0 top-0 h-full w-1/3 bg-white p-4 shadow-lg z-[1000]">
          <button className="absolute top-2 right-2 text-gray-600" onClick={() => setSelectedShip(null)}>X</button>
          <h3 className="font-bold text-xl mb-2">Ship {selectedShip + 1}</h3>
          <img src="https://via.placeholder.com/200" alt={`Ship ${selectedShip + 1}`} className="mx-auto my-2" />
          <p className="text-gray-600 mb-2">This is the description for Ship {selectedShip + 1}.</p>
          <div className="text-gray-600">
            <p><strong>Vessel No:</strong> 123456</p>
            <p><strong>IMO No:</strong> 123456</p>
            <p><strong>SOG:</strong> 45.2 km/hr</p>
            <p><strong>COG:</strong> 78°</p>
            <p><strong>Date:</strong> 12/12/2021</p>
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
