import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">OIL SPILL DETECTION</span>
        </div>

        {/* Links Section */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-blue-200 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/history" className="text-white hover:text-blue-200 transition duration-200">
              History
            </Link>
          </li>
          <li>
            <Link to="/downloaded-images" className="text-white hover:text-blue-200 transition duration-200">
              Downloaded Images
            </Link>
          </li>
        </ul>

        {/* Auth Button Section */}
        <div>
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-200">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
