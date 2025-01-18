
// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaUsers, FaLaptopCode } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
          <div className="flex items-center mb-8">
            <FaCode className="text-7xl text-blue-500 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CodeSync
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
            Real-time collaborative coding platform where developers can connect, 
            share, and create together in a seamless environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard 
              icon={<FaUsers />}
              title="Real-time Collaboration"
              description="Code together with developers from around the world in real-time"
            />
            <FeatureCard 
              icon={<FaLaptopCode />}
              title="Advanced Editor"
              description="Feature-rich Monaco editor with syntax highlighting and auto-completion"
            />
            <FeatureCard 
              icon={<FaCode />}
              title="Code Sharing"
              description="Share your code snippets instantly with other developers"
            />
          </div>

          <button
            onClick={() => navigate('/connect')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-xl font-bold 
                     hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all
                     shadow-lg hover:shadow-xl"
          >
            Start Coding Together
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm
                  border border-gray-700 hover:border-blue-500 transition-all">
    <div className="text-3xl text-blue-500 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home;