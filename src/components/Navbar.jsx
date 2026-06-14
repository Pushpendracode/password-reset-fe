import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 px-6 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          🔐 SecureApp
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="text-white hover:text-blue-200 font-medium">
            Login
          </Link>
          <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded-lg font-bold hover:bg-blue-50">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;