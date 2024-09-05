// src/App.js
import React from 'react';
import MapComponent from './components/MapComponent'; // Import the MapComponent

function App() {
  return (
    <div className="flex flex-col h-screen w-screen"> {/* Full screen container */}
      <h1 className="text-center text-2xl font-bold p-4">Map Display with React and Tailwind CSS</h1>
      <MapComponent />
    </div>
  );
}

export default App;
