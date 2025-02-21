import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function MarketingSelectionPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);

  // Get the type from location state (online, offline, or both)
  const marketingType = location.state?.type || 'both';

  const contentCreatorOptions = [
    {
      id: 'reel',
      title: 'Reel Maker',
      image: '/path-to-reel-maker-image.jpg'
    },
    {
      id: 'photographer',
      title: 'Photographer',
      image: '/path-to-photographer-image.jpg'
    },
    {
      id: 'video',
      title: 'Video Editor',
      image: '/path-to-video-editor-image.jpg'
    }
  ];

  const usherOptions = [
    {
      id: 'sales',
      title: 'Sales Usher',
      image: '/path-to-sales-usher-image.jpg'
    },
    {
      id: 'activation',
      title: 'Activation Usher',
      image: '/path-to-activation-usher-image.jpg'
    },
    {
      id: 'registration',
      title: 'Registration Usher',
      image: '/path-to-registration-usher-image.jpg'
    },
    {
      id: 'crowd',
      title: 'Crowd Management Usher',
      image: '/path-to-crowd-management-image.jpg'
    }
  ];

  const handleSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleNext = () => {
    // Handle the selection and navigate to the next step
    console.log('Selected items:', selectedItems);
    // Add your navigation logic here
  };

  const handleBack = () => {
    navigate('/company-profile');
  };

  const renderContent = () => {
    switch (marketingType) {
      case 'online':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contentCreatorOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                          ${selectedItems.includes(option.id) ? 'ring-2 ring-[#C2A04C] scale-105' : 'hover:scale-105'}`}
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-black/60">
                  <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                </div>
              </div>
            ))}
          </div>
        );

      case 'offline':
        return (
          <>
            <h2 className="text-white text-center text-xl mb-6">
              you can choose as many as your event needs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {usherOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                            ${selectedItems.includes(option.id) ? 'ring-2 ring-[#C2A04C] scale-105' : 'hover:scale-105'}`}
                >
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-black/60">
                    <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'both':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contentCreatorOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                            ${selectedItems.includes(option.id) ? 'ring-2 ring-[#C2A04C] scale-105' : 'hover:scale-105'}`}
                >
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-black/60">
                    <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {usherOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300
                            ${selectedItems.includes(option.id) ? 'ring-2 ring-[#C2A04C] scale-105' : 'hover:scale-105'}`}
                >
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-black/60">
                    <h3 className="text-[#C2A04C] text-lg font-bold text-center">{option.title}</h3>
                  </div>
                </div>
              ))}
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

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center bg-[#C2A04C] text-black px-6 py-2 rounded-full
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105"
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