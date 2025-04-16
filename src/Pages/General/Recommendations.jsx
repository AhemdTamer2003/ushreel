// Recommendations.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';

function Recommendations() {
  const [searchUsher, setSearchUsher] = useState('');
  const [searchCC, setSearchCC] = useState('');

  // Mock data for demonstration
  const recommendedUshers = [
    { id: 1, name: 'Name first', feedback: 'feedback' },
    { id: 2, name: 'Name first', feedback: 'feedback' },
    { id: 3, name: 'Name first', feedback: 'feedback' },
    { id: 4, name: 'Name first', feedback: 'feedback' },
    { id: 5, name: 'Name first', feedback: 'feedback' },
    { id: 6, name: 'Name first', feedback: 'feedback' },
  ];

  const ushersList = [
    { id: 1, name: 'Name first', feedback: 'feedback' },
    { id: 2, name: 'Name first', feedback: 'feedback' },
    { id: 3, name: 'Name first', feedback: 'feedback' },
    { id: 4, name: 'Name first', feedback: 'feedback' },
    { id: 5, name: 'Name first', feedback: 'feedback' },
  ];

  const contentCreatorsList = [
    { id: 1, name: 'Name first', feedback: 'feedback', followers: '5M' },
    { id: 2, name: 'Name first', feedback: 'feedback', followers: '5M' },
    { id: 3, name: 'Name first', feedback: 'feedback', followers: '5M' },
    { id: 4, name: 'Name first', feedback: 'feedback', followers: '5M' },
    { id: 5, name: 'Name first', feedback: 'feedback', followers: '5M' },
  ];

  const ProfileCard = ({ name, feedback, followers }) => (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">👤</span>
      </div>
      <div>
        <h3 className="text-white">{name}</h3>
        <p className="text-gray-400 text-sm">{feedback}</p>
        {followers && <p className="text-gray-400 text-sm">{followers} followers</p>}
      </div>
    </div>
  );

  const SearchBar = ({ value, onChange }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-200 p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
        placeholder="Search"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        <FaFilter className="text-gray-500 cursor-pointer" />
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      <nav className="bg-[#C2A04C] p-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl">UsheReel</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-black hover:text-white transition-colors">Home</Link>
          <Link to="/explore" className="text-black hover:text-white transition-colors">Explore</Link>
          <Link to="/about" className="text-black hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-black hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-black">C</span>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Recommended Ushers */}
          <div className="bg-black/80 rounded-lg p-6 border border-[#C2A04C]/20">
            <h2 className="text-[#C2A04C] font-bold text-xl mb-4">Recommended Ushers</h2>
            <div className="space-y-4">
              {recommendedUshers.map(usher => (
                <ProfileCard key={usher.id} {...usher} />
              ))}
            </div>
          </div>

          {/* Ushers List */}
          <div className="bg-black/80 rounded-lg p-6 border border-[#C2A04C]/20">
            <h2 className="text-[#C2A04C] font-bold text-xl mb-4">Ushers List</h2>
            <SearchBar value={searchUsher} onChange={setSearchUsher} />
            <div className="mt-4 space-y-4">
              {ushersList.map(usher => (
                <ProfileCard key={usher.id} {...usher} />
              ))}
            </div>
          </div>

          {/* Content Creators List */}
          <div className="bg-black/80 rounded-lg p-6 border border-[#C2A04C]/20">
            <h2 className="text-[#C2A04C] font-bold text-xl mb-4">CC List</h2>
            <SearchBar value={searchCC} onChange={setSearchCC} />
            <div className="mt-4 space-y-4">
              {contentCreatorsList.map(creator => (
                <ProfileCard key={creator.id} {...creator} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-[#C2A04C] text-black px-6 py-2 rounded-full hover:bg-[#C2A04C]/80 transition-all duration-300 transform hover:scale-105">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;