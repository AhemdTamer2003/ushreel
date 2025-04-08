import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress } from '@mui/material';

function UsherProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usherData, setUsherData] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to view your profile');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/usher/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        setUsherData(response.data.profile);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please log in again');
          navigate('/login');
        } else {
          toast.error('Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Handle accepting an offer
  const handleAcceptOffer = async (offerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/usher/offers/${offerId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsherData((prev) => ({
        ...prev,
        offers: prev.offers.map((offer) =>
          offer.id === offerId ? { ...offer, status: 'accepted' } : offer
        ),
      }));

      toast.success('Offer accepted successfully!');
    } catch (error) {
      console.error('Error accepting offer:', error);
      toast.error('Failed to accept offer');
    }
  };

  // Handle declining an offer
  const handleDeclineOffer = async (offerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/usher/offers/${offerId}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsherData((prev) => ({
        ...prev,
        offers: prev.offers.map((offer) =>
          offer.id === offerId ? { ...offer, status: 'declined' } : offer
        ),
      }));

      toast.success('Offer declined successfully!');
    } catch (error) {
      console.error('Error declining offer:', error);
      toast.error('Failed to decline offer');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <CircularProgress sx={{ color: '#D4A537' }} />
      </div>
    );
  }

  // Render error state
  if (!usherData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Failed to load profile data</h2>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              backgroundColor: '#D4A537',
              '&:hover': {
                backgroundColor: '#b88c2e',
              },
            }}
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      {/* Navigation Bar */}
      <nav className="bg-[#C2A04C] p-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl">UsheReel</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-black hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-black hover:text-white transition-colors">
            Explore
          </Link>
          <Link to="/about" className="text-black hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-black hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-black">{usherData.firstName}</span>
          <img
            src={usherData.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <button onClick={handleLogout} className="text-black hover:text-white transition-colors">
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          <div className="flex flex-col items-center">
            <img
              src={usherData.profileImage || 'default-profile-image.jpg'}
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
            </div>
            <button
              onClick={() => navigate('/edit-profile')}
              className="mt-6 bg-[#C2A04C] text-black px-6 py-2 rounded-full hover:bg-[#C2A04C]/80 transition-colors duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Offers Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Offers</h3>
            <div className="space-y-4">
              {usherData.offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#C2A04C] p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-black font-semibold">{offer.company}</p>
                    {offer.status && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${offer.status === 'accepted' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}
                      >
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <p className="text-black mb-3">{offer.message}</p>
                  {!offer.status && (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleDeclineOffer(offer.id)}
                        className="bg-black text-red-500 px-4 py-2 rounded-full hover:bg-black/80 transition-all duration-300 transform hover:scale-105"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="bg-black text-green-500 px-4 py-2 rounded-full hover:bg-black/80 transition-all duration-300 transform hover:scale-105"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#C2A04C] text-xl font-bold">Experiences</h3>
              <button
                onClick={() => navigate('/edit-experience')}
                className="text-[#C2A04C] hover:text-[#C2A04C]/80 transition-colors duration-300"
              >
                <FaEdit size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* {usherData.experience?.length ? (
                usherData.experience.map((exp, index) => (
                  <div key={index} className="text-gray-300">
                    <p>{exp}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No experiences added yet</p>
              )} */}

            </div>
          </div>

          {/* Companies Opinions Section */}
          <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Companies Opinions</h3>
            <div className="space-y-4">
              {/* {usherData.companyOpinions?.length === 0 ? (
                <p className="text-gray-400">No opinions yet</p>
              ) : (
                usherData.companyOpinions.map((opinion, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-300">
                    <span>{opinion.company}</span>
                    <span>{opinion.rating}</span>
                  </div>
                ))
              )} */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsherProfile;