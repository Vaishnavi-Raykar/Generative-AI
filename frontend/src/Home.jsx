// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Landing Page</h1>
      <p className="mb-4 text-gray-600">
        Explore our features and learn more about JavaScript and Web Development.
      </p>
      <div className="flex space-x-4">
        <Link to="/js">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Go to JavaScript
          </button>
        </Link>
        <Link to="/web">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Go to Web Development
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
