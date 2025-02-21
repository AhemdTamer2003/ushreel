import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaBirthdayCake } from 'react-icons/fa';
import EditProfileDialog from './EditProfileDialog';

function UsherProfile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [usherData, setUsherData] = useState({
    id: "162673764",
    name: "Jack William",
    email: "testmail@gmail.com",
    phone: "01010101010",
    location: "Cairo,Egypt",
    gender: "Male",
    age: "20",
    profileImage: "/path-to-profile-image.jpg",
    experiences: [
      {
        id: 1,
        description: "worked as an usher at Cairo ICT event",
        date: "(2024 - 2025)"
      },
      {
        id: 2,
        description: "worked as an usher at Cairo ICT event",
        date: "(2024 - 2025)"
      }
    ],
    offers: [
      {
        id: 1,
        company: "Future Makers",
        message: "Future Makers has sent you a request to join them at their next conference"
      },
      {
        id: 2,
        company: "Future Makers",
        message: "Future Makers has sent you a request to join them at their next conference"
      }
    ],
    companyOpinions: [
      {
        company: "Future Makers",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        company: "UnReal",
        rating: "⭐⭐⭐⭐"
      }
    ]
  });

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    setUsherData({
      ...usherData,
      ...updatedData
    });
    // Add your API call here to update the profile in the backend
    console.log('Updated Profile Data:', updatedData);
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
          <span className="text-black">{usherData.name}</span>
          <img 
            src={usherData.profileImage} 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        </div>
      </nav>

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          <div className="flex flex-col items-center">
            <img 
              src={usherData.profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C]"
            />
            <h2 className="text-[#C2A04C] text-2xl font-bold mb-2">{usherData.name}</h2>
            <p className="text-gray-400 text-sm mb-4">#{usherData.id}</p>
            
            <div className="w-full space-y-3">
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="text-[#C2A04C] mr-2" />
                <span>{usherData.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhone className="text-[#C2A04C] mr-2" />
                <span>{usherData.phone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="text-[#C2A04C] mr-2" />
                <span>{usherData.location}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaUser className="text-[#C2A04C] mr-2" />
                <span>{usherData.gender}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaBirthdayCake className="text-[#C2A04C] mr-2" />
                <span>{usherData.age}</span>
              </div>
            </div>

            <button 
              onClick={handleEditClick}
              className="mt-6 bg-[#C2A04C] text-black px-6 py-2 rounded-full 
                       hover:bg-[#C2A04C]/80 transition-colors duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Offers Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Offers</h3>
            <div className="space-y-4">
              {usherData.offers.map(offer => (
                <div key={offer.id} 
                     className="bg-[#C2A04C] p-4 rounded-lg flex justify-between items-center
                              transform transition-all duration-300 hover:scale-[1.02]">
                  <p className="text-black">{offer.message}</p>
                  <button className="bg-black text-[#C2A04C] px-4 py-2 rounded-full
                                   hover:bg-black/80 transition-colors duration-300">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Experiences</h3>
            <div className="space-y-4">
              {usherData.experiences.map(exp => (
                <div key={exp.id} className="text-gray-300">
                  <p>{exp.id} - {exp.description}</p>
                  <p className="text-[#C2A04C] text-sm">{exp.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Companies Opinions Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Companies opinions</h3>
            <div className="space-y-4">
              {usherData.companyOpinions.map((opinion, index) => (
                <div key={index} className="flex justify-between items-center text-gray-300">
                  <span>{opinion.company}</span>
                  <span>{opinion.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={isEditDialogOpen}
        handleClose={handleCloseDialog}
        profileData={usherData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default UsherProfile;