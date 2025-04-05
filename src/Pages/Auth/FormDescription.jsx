import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCalendar, FaClock } from 'react-icons/fa';

function FormDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];

  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    location: '',
    description: '',
    totalUshers: '',
    totalContentCreators: '',
    selectedUsherTypes: {
      sales: false,
      activation: false,
      registration: false,
      crowdManagement: false
    },
    selectedCreatorTypes: {
      reelMaker: false,
      photographer: false,
      videoEditor: false
    },
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, type) => {
    if (category === 'ushers') {
      setFormData(prev => ({
        ...prev,
        selectedUsherTypes: {
          ...prev.selectedUsherTypes,
          [type]: !prev.selectedUsherTypes[type]
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        selectedCreatorTypes: {
          ...prev.selectedCreatorTypes,
          [type]: !prev.selectedCreatorTypes[type]
        }
      }));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    // Add validation here if needed
    navigate('/recommendations', { state: { formData } });
  };

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
        <div className="w-8 h-8"></div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          <button
            onClick={handleBack}
            className="flex items-center text-[#C2A04C] mb-6 hover:text-white transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Date</h3>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">From</label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">To</label>
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Time</h3>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">From</label>
                    <input
                      type="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">To</label>
                    <input
                      type="time"
                      name="timeTo"
                      value={formData.timeTo}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
              </div>

              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows="4"
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
              </div>
            </div>

            {/* Right Column - Requirements */}
            <div className="space-y-6">
              {/* Ushers Section */}
              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Ushers</h3>
                <input
                  type="number"
                  name="totalUshers"
                  value={formData.totalUshers}
                  onChange={handleInputChange}
                  placeholder="Number of total ushers"
                  className="w-full bg-gray-200 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.selectedUsherTypes).map(([type, checked]) => (
                    <label key={type} className="flex items-center space-x-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange('ushers', type)}
                        className="form-checkbox text-[#C2A04C] rounded"
                      />
                      <span>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Content Creators Section */}
              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Content Creators</h3>
                <input
                  type="number"
                  name="totalContentCreators"
                  value={formData.totalContentCreators}
                  onChange={handleInputChange}
                  placeholder="Number of total content creators"
                  className="w-full bg-gray-200 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.selectedCreatorTypes).map(([type, checked]) => (
                    <label key={type} className="flex items-center space-x-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange('creators', type)}
                        className="form-checkbox text-[#C2A04C] rounded"
                      />
                      <span>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center bg-[#C2A04C] text-black px-6 py-2 rounded-full
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDescription;