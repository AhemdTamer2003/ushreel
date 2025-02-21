import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaCamera, FaInstagram, FaFacebook, FaArrowLeft, FaTimes } from 'react-icons/fa';

function CreatorEditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.profileData || {
    id: "15245637",
    name: "Samir William",
    email: "testmail@gmail.com",
    phone: "01010101010",
    location: "Cairo,Egypt",
    gender: "Male",
    specialty: "Photography",
    profileImage: "/path-to-profile-image.jpg",
    experiences: [
      {
        id: 1,
        description: "exhibition coverage at Cairo ict"
      },
      {
        id: 2,
        description: "Amr Diab concert coverage"
      }
    ],
    photos: [
      "/path-to-photo-1.jpg",
      "/path-to-photo-2.jpg"
    ],
    platformLinks: {
      instagram: "@Samir_wiliam",
      facebook: "Samir Wiliam"
    }
  };

  const [profileData, setProfileData] = useState(initialData);
  const [newExperience, setNewExperience] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(true);
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.trim()) {
      setProfileData(prev => ({
        ...prev,
        experiences: [
          ...prev.experiences,
          {
            id: prev.experiences.length + 1,
            description: newExperience
          }
        ]
      }));
      setNewExperience('');
    }
  };

  const handleRemoveExperience = (id) => {
    setProfileData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setProfileData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const handleRemovePhoto = (index) => {
    setProfileData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = () => {
    // Add your API call here
    console.log('Saving profile:', profileData);
    setIsDirty(false);
    navigate('/content-creator-profile', { state: { profileData } });
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/content-creator-profile');
      }
    } else {
      navigate('/content-creator-profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      <nav className="bg-[#C2A04C] p-4 flex justify-between items-center">
        <button
          onClick={handleCancel}
          className="flex items-center text-black hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="text-black font-bold text-xl">Edit Profile</div>
        <div className="flex items-center space-x-2">
          <span className="text-black">{profileData.name}</span>
          <img 
            src={profileData.profileImage} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border-2 border-black"
          />
        </div>
      </nav>

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                      transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C]
                         transform transition-all duration-300 group-hover:opacity-75"
              />
              <label className="absolute bottom-4 right-0 bg-[#C2A04C] rounded-full p-2 cursor-pointer
                              transform transition-all duration-300 hover:scale-110">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <FaCamera className="text-black" />
              </label>
            </div>
            <h2 className="text-[#C2A04C] text-2xl font-bold mb-2">{profileData.name}</h2>
            <p className="text-gray-400 text-sm">#{profileData.id}</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {[
              { icon: FaEnvelope, name: 'email', placeholder: 'Email' },
              { icon: FaPhone, name: 'phone', placeholder: 'Phone' },
              { icon: FaMapMarkerAlt, name: 'location', placeholder: 'Location' },
              { icon: FaUser, name: 'gender', placeholder: 'Gender' },
              { icon: FaCamera, name: 'specialty', placeholder: 'Specialty' }
            ].map((field) => (
              <div key={field.name} 
                   className="flex items-center bg-black/40 rounded-lg p-3
                            transform transition-all duration-300 hover:bg-black/60">
                <field.icon className="text-[#C2A04C] mr-2" />
                <input
                  type={field.name === 'email' ? 'email' : 'text'}
                  name={field.name}
                  value={profileData[field.name]}
                  onChange={handleInputChange}
                  className="bg-transparent text-gray-300 w-full focus:outline-none"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleCancel}
              className="flex-1 bg-black text-[#C2A04C] py-2 rounded-full 
                       hover:bg-black/80 transition-all duration-300
                       transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-[#C2A04C] text-black py-2 rounded-full 
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105"
              disabled={!isDirty}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Experiences Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Experiences</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto mb-4 pr-2">
              {profileData.experiences.map((exp, index) => (
                <div key={exp.id} 
                     className="flex justify-between items-center text-gray-300 bg-black/40 p-3 rounded-lg
                              transform transition-all duration-300 hover:bg-black/60">
                  <p>{index + 1} - {exp.description}</p>
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newExperience}
                onChange={(e) => setNewExperience(e.target.value)}
                className="flex-1 bg-black/40 text-gray-300 rounded-lg p-2 
                         border border-[#C2A04C]/20 focus:outline-none focus:border-[#C2A04C]
                         transform transition-all duration-300"
                placeholder="Add new experience"
              />
              <button
                onClick={handleAddExperience}
                className="bg-[#C2A04C] text-black px-4 py-2 rounded-lg
                         hover:bg-[#C2A04C]/80 transition-all duration-300
                         transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>

          {/* Photos Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Photos</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {profileData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg
                             transform transition-all duration-300 group-hover:opacity-75"
                  />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full
                             opacity-0 group-hover:opacity-100 transition-all duration-300
                             hover:bg-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-[#C2A04C] file:text-black
                         hover:file:bg-[#C2A04C]/80
                         cursor-pointer"
              />
            </label>
          </div>

          {/* Platform Links Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Platform Links</h3>
            <div className="space-y-4">
              {[
                { icon: FaInstagram, name: 'instagram', placeholder: 'Instagram username' },
                { icon: FaFacebook, name: 'facebook', placeholder: 'Facebook username' }
              ].map((platform) => (
                <div key={platform.name} 
                     className="flex items-center bg-black/40 rounded-lg p-3
                              transform transition-all duration-300 hover:bg-black/60">
                  <platform.icon className="text-[#C2A04C] mr-2" />
                  <input
                    type="text"
                    value={profileData.platformLinks[platform.name]}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      platformLinks: {
                        ...prev.platformLinks,
                        [platform.name]: e.target.value
                      }
                    }))}
                    className="bg-transparent text-gray-300 w-full focus:outline-none"
                    placeholder={platform.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorEditProfile;