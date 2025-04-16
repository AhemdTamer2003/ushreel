import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function MarketingSelectionPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState('');

  // Get the type from location state (online, offline, or both)
  const marketingType = location.state?.type || 'both';

  const contentCreatorOptions = [
    {
      id: 'reelMaker',
      title: 'Reel Maker',
      image: '/src/assets/AuthAssets/registerpic2.png'
    },
    {
      id: 'photographer',
      title: 'Photographer',
      image: '/src/assets/AuthAssets/contentcreatorregister.png'
    },
    {
      id: 'videoEditor',
      title: 'Video Editor',
      image: '/src/assets/AuthAssets/0_qKaI6a9c0mZi5P1P.jpg'
    }
  ];

  const usherOptions = [
    {
      id: 'sales',
      title: 'Sales Usher',
      image: '/src/assets/AuthAssets/image 3.png'
    },
    {
      id: 'activation',
      title: 'Activation Usher',
      image: '/src/assets/AuthAssets/image 4.png'
    },
    {
      id: 'registration',
      title: 'Registration Usher',
      image: '/src/assets/AuthAssets/image 5.png'
    },
    {
      id: 'crowdManagement',
      title: 'Crowd Management Usher',
      image: '/src/assets/AuthAssets/image.png'
    }
  ];

  const handleSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
    setError(''); // Clear any previous error
  };

  const handleNext = () => {
    if (selectedItems.length === 0) {
      setError('Please select at least one option');
      return;
    }

    navigate('/form-description', { 
      state: { 
        selectedItems,
        marketingType,
        companyData: location.state?.companyData
      } 
    });
  };

  const handleBack = () => {
    navigate('/company-profile');
  };

  const renderContent = () => {
    switch (marketingType) {
      case 'online':
        return (
          <div className="space-y-6">
            <h2 className="text-[#C2A04C] text-2xl font-bold text-center mb-6">
              Select Content Creator Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contentCreatorOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                            ${selectedItems.includes(option.id) 
                              ? 'ring-2 ring-[#C2A04C] scale-105 shadow-lg shadow-[#C2A04C]/20' 
                              : 'hover:scale-105 hover:shadow-lg hover:shadow-[#C2A04C]/10'}`}
                >
                  <div className="relative">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300
                                  hover:opacity-0"/>
                  </div>
                  <div className="p-4 bg-black/60">
                    <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'offline':
        return (
          <div className="space-y-6">
            <h2 className="text-[#C2A04C] text-2xl font-bold text-center mb-6">
              Select Usher Types
            </h2>
            <p className="text-white text-center text-lg mb-6">
              You can choose as many as your event needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {usherOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                            ${selectedItems.includes(option.id) 
                              ? 'ring-2 ring-[#C2A04C] scale-105 shadow-lg shadow-[#C2A04C]/20' 
                              : 'hover:scale-105 hover:shadow-lg hover:shadow-[#C2A04C]/10'}`}
                >
                  <div className="relative">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300
                                  hover:opacity-0"/>
                  </div>
                  <div className="p-4 bg-black/60">
                    <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'both':
        return (
          <div className="space-y-12">
            <div>
              <h2 className="text-[#C2A04C] text-2xl font-bold text-center mb-6">
                Select Content Creator Types
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentCreatorOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                              ${selectedItems.includes(option.id) 
                                ? 'ring-2 ring-[#C2A04C] scale-105 shadow-lg shadow-[#C2A04C]/20' 
                                : 'hover:scale-105 hover:shadow-lg hover:shadow-[#C2A04C]/10'}`}
                  >
                    <div className="relative">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300
                                    hover:opacity-0"/>
                    </div>
                    <div className="p-4 bg-black/60">
                      <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[#C2A04C] text-2xl font-bold text-center mb-6">
                Select Usher Types
              </h2>
              <p className="text-white text-center text-lg mb-6">
                You can choose as many as your event needs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {usherOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                              ${selectedItems.includes(option.id) 
                                ? 'ring-2 ring-[#C2A04C] scale-105 shadow-lg shadow-[#C2A04C]/20' 
                                : 'hover:scale-105 hover:shadow-lg hover:shadow-[#C2A04C]/10'}`}
                  >
                    <div className="relative">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300
                                    hover:opacity-0"/>
                    </div>
                    <div className="p-4 bg-black/60">
                      <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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

          {renderContent()}

          {error && (
            <div className="mt-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className={`flex items-center px-6 py-2 rounded-full
                        transition-all duration-300 transform hover:scale-105
                        ${selectedItems.length === 0 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : 'bg-[#C2A04C] hover:bg-[#C2A04C]/80'} 
                        text-black`}
              disabled={selectedItems.length === 0}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingSelectionPages;