import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaGlobe, FaBriefcase } from 'react-icons/fa';

function CompanyProfile() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    id: "COM123456",
    name: "Future Makers",
    email: "contact@futuremakers.com",
    phone: "02012345678",
    location: "Cairo, Egypt",
    website: "www.futuremakers.com",
    industry: "Technology",
    profileImage: "/path-to-company-logo.jpg",
    marketingPreference: "", // Can be "online", "offline", or "both"
    activeProjects: [
      {
        id: 1,
        title: "Tech Conference 2024",
        type: "offline",
        status: "Active",
        participants: 15
      },
      {
        id: 2,
        title: "Social Media Campaign",
        type: "online",
        status: "Active",
        participants: 8
      }
    ],
    completedProjects: [
      {
        id: 3,
        title: "Product Launch Event",
        type: "both",
        status: "Completed",
        rating: "⭐⭐⭐⭐⭐"
      }
    ]
  });

  const handleMarketingPreferenceSelect = (preference) => {
    setCompanyData(prev => ({
      ...prev,
      marketingPreference: preference
    }));

    // Navigate to the marketing selection page with the selected preference
    navigate('/marketing-selection', { 
      state: { 
        type: preference,
        companyData: companyData 
      } 
    });
  };

  const handleEditProfile = () => {
    navigate('/company-edit-profile', { state: { companyData } });
  };

  const handleViewProject = (projectId) => {
    console.log('Viewing project:', projectId);
    // Add navigation or modal display logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      {/* Navigation Bar */}
      <nav className="bg-[#C2A04C] p-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl">UsheReel</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-black hover:text-white transition-colors">Home</Link>
          <Link to="/explore" className="text-black hover:text-white transition-colors">Explore</Link>
          <Link to="/about" className="text-black hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-black hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-black">{companyData.name}</span>
          <img 
            src={companyData.profileImage} 
            alt="Company Logo" 
            className="w-8 h-8 rounded-full border-2 border-black"
          />
        </div>
      </nav>

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Profile Card */}
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                      transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
          <div className="flex flex-col items-center">
            <img 
              src={companyData.profileImage} 
              alt="Company Logo" 
              className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C]
                       transform transition-all duration-300 hover:scale-105"
            />
            <h2 className="text-[#C2A04C] text-2xl font-bold mb-2">{companyData.name}</h2>
            <p className="text-gray-400 text-sm mb-4">#{companyData.id}</p>
            
            <div className="w-full space-y-3">
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaEnvelope className="text-[#C2A04C] mr-2" />
                <span>{companyData.email}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaPhone className="text-[#C2A04C] mr-2" />
                <span>{companyData.phone}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaMapMarkerAlt className="text-[#C2A04C] mr-2" />
                <span>{companyData.location}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaGlobe className="text-[#C2A04C] mr-2" />
                <span>{companyData.website}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaBriefcase className="text-[#C2A04C] mr-2" />
                <span>{companyData.industry}</span>
              </div>
            </div>

            <button 
              onClick={handleEditProfile}
              className="mt-6 bg-[#C2A04C] text-black px-6 py-2 rounded-full 
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105 hover:shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Marketing Preference Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-6">Select what you need</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div 
                onClick={() => handleMarketingPreferenceSelect('online')}
                className={`cursor-pointer p-6 rounded-lg border-2 
                          ${companyData.marketingPreference === 'online' 
                            ? 'border-[#C2A04C] bg-[#C2A04C]/20' 
                            : 'border-gray-600 hover:border-[#C2A04C]/50'}
                          transition-all duration-300 transform hover:scale-105`}
              >
                <h4 className="text-[#C2A04C] text-lg font-bold mb-2">Content Creator</h4>
                <p className="text-gray-300">Online Marketing</p>
              </div>

              <div 
                onClick={() => handleMarketingPreferenceSelect('offline')}
                className={`cursor-pointer p-6 rounded-lg border-2 
                          ${companyData.marketingPreference === 'offline' 
                            ? 'border-[#C2A04C] bg-[#C2A04C]/20' 
                            : 'border-gray-600 hover:border-[#C2A04C]/50'}
                          transition-all duration-300 transform hover:scale-105`}
              >
                <h4 className="text-[#C2A04C] text-lg font-bold mb-2">Usher</h4>
                <p className="text-gray-300">Offline Marketing</p>
              </div>
            </div>

            <div 
              onClick={() => handleMarketingPreferenceSelect('both')}
              className={`cursor-pointer p-6 rounded-lg border-2 
                        ${companyData.marketingPreference === 'both' 
                          ? 'border-[#C2A04C] bg-[#C2A04C]/20' 
                          : 'border-gray-600 hover:border-[#C2A04C]/50'}
                        transition-all duration-300 transform hover:scale-105`}
            >
              <h4 className="text-[#C2A04C] text-lg font-bold mb-2">Both</h4>
              <p className="text-gray-300">Online & Offline Marketing</p>
            </div>
          </div>

          {/* Active Projects Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Active Projects</h3>
            <div className="space-y-4">
              {companyData.activeProjects.map(project => (
                <div key={project.id} 
                     className="bg-black/40 p-4 rounded-lg border border-[#C2A04C]/20
                              transform transition-all duration-300 hover:border-[#C2A04C] hover:scale-[1.02]"
                     onClick={() => handleViewProject(project.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#C2A04C] font-bold">{project.title}</h4>
                    <span className="text-green-400">{project.status}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-gray-300">
                    <span>Type: {project.type}</span>
                    <span>Participants: {project.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Projects Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Completed Projects</h3>
            <div className="space-y-4">
              {companyData.completedProjects.map(project => (
                <div key={project.id} 
                     className="bg-black/40 p-4 rounded-lg border border-[#C2A04C]/20
                              transform transition-all duration-300 hover:border-[#C2A04C] hover:scale-[1.02]"
                     onClick={() => handleViewProject(project.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#C2A04C] font-bold">{project.title}</h4>
                    <span className="text-gray-400">{project.status}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-gray-300">
                    <span>Type: {project.type}</span>
                    <span>{project.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;