// src/components/ConnectPopup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectPopup = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }
    onSubmit(name);
    navigate('/editor');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Join the Coding Session
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Enter Your Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 text-white rounded-lg
                     font-semibold transform hover:scale-105 transition-all"
          >
            Join Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnectPopup;