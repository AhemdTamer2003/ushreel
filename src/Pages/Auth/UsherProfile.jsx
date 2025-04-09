import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function UsherProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usherData, setUsherData] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    address: '',
    experience: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to view your profile');
        navigate('/login');
        return;
      }

      const response = await api.get('/usher/profile');
      if (response.data) {
        setUsherData(response.data);
        setEditFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
        
          userName: response.data.userName || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          experience: response.data.experience || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await api.put('/usher/profile', {
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        userName: editFormData.userName,
        phone: editFormData.phone,
        address: editFormData.address,
        experience: editFormData.experience
      });

      if (response.data) {
        setUsherData(response.data);
        setIsEditingProfile(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      handleApiError(error);
    }
  };

  const handleExperienceUpdate = async () => {
    try {
      const response = await api.post('/api/usher/complete-profile', {
        experience: editFormData.experience
      });

      if (response.data) {
        setUsherData(prev => ({
          ...prev,
          experience: response.data.experience
        }));
        setIsEditingExperience(false);
        toast.success('Experience updated successfully');
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      handleApiError(error);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('picture', file);

    try {
      const response = await api.post('/usher/profile/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setUsherData(prev => ({
          ...prev,
          profileImage: response.data.profileImage
        }));
        toast.success('Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error('Session expired. Please log in again');
      navigate('/login');
    } else {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <CircularProgress sx={{ color: '#D4A537' }} />
      </div>
    );
  }

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
        <div className="flex items-center space-x-4">
          <span className="text-black font-medium">{usherData?.firstName || 'User'}</span>
          <div className="relative">
            <img
              src={usherData?.profileImage || '/default-profile.jpg'}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
          </div>
          <button onClick={handleLogout} className="text-black hover:text-white transition-colors">
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          {/* Profile Header */}
          <div className="flex items-center space-x-8 mb-8">
            <div className="relative">
              <img
                src={usherData?.profileImage || '/default-profile.jpg'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#C2A04C]"
              />
              <label className="absolute bottom-2 right-2 cursor-pointer bg-[#C2A04C] rounded-full p-2">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
                <FaEdit className="text-black" />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-[#C2A04C] text-3xl font-bold">
                {usherData?.firstName} {usherData?.lastName}
              </h1>
              <p className="text-gray-400">@{usherData?.userName}</p>
            </div>
            <Button
              onClick={() => setIsEditingProfile(true)}
              variant="contained"
              sx={{
                backgroundColor: '#C2A04C',
                '&:hover': { backgroundColor: '#9c7c3c' }
              }}
            >
              Edit Profile
            </Button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#C2A04C]" />
                <span className="text-white">{usherData?.phone || 'No phone number'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#C2A04C]" />
                <span className="text-white">{usherData?.address || 'No address'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#C2A04C] text-xl font-bold flex items-center justify-between">
                Experience
                <button
                  onClick={() => setIsEditingExperience(true)}
                  className="text-sm hover:text-[#9c7c3c]"
                >
                  <FaEdit />
                </button>
              </h3>
              <p className="text-white">{usherData?.experience || 'No experience added'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={isEditingProfile} 
        onClose={() => setIsEditingProfile(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-4">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={editFormData.userName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editFormData.phone}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editFormData.address}
              onChange={handleInputChange}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditingProfile(false)}>Cancel</Button>
          <Button 
            onClick={handleProfileUpdate} 
            variant="contained"
            sx={{
              backgroundColor: '#C2A04C',
              '&:hover': { backgroundColor: '#9c7c3c' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Experience Dialog */}
      <Dialog 
        open={isEditingExperience} 
        onClose={() => setIsEditingExperience(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Experience</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Experience"
            name="experience"
            value={editFormData.experience}
            onChange={handleInputChange}
            className="mt-4"
            placeholder="Describe your experience..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditingExperience(false)}>Cancel</Button>
          <Button 
            onClick={handleExperienceUpdate} 
            variant="contained"
            sx={{
              backgroundColor: '#C2A04C',
              '&:hover': { backgroundColor: '#9c7c3c' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsherProfile;