import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import History from './components/History';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path="/history" element={<History/>}/>
            {/* Add more routes here as needed */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;