import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          {/* Replace with your actual logo */}
          <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/downloaded-images">Downloaded Images</Link></li>
        </ul>
        <div className="navbar-auth">
          {/* Replace with actual login/logout logic */}
          <button className="auth-button">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;