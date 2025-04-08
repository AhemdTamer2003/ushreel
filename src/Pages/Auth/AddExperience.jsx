// src/components/AddExperience.jsx

import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, selectAuth } from '../../redux/Slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WorkHistory } from '@mui/icons-material';

function AddExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);
  const [formData, setFormData] = useState({
    experience: '',
  });
  const [errors, setErrors] = useState({});

  // Check authentication and if the user has added experience
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = (() => {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}');
      } catch (e) {
        return {}; // Return an empty object if parsing fails
      }
    })();

    if (!token) {
      toast.error('Please log in to continue');
      navigate('/login');
      return;
    }

    // If user has already added experience, redirect to profile
    if (user?.hasAddedExperience) {
      toast.info('Experience already added');
      navigate('/usher-profile');
    }
  }, []); // Remove `navigate` from dependencies

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Experience description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      const result = await dispatch(addExperience(
        formData.experience
      )).unwrap();
      toast.success('Experience added successfully!');
      navigate('/usher-profile');
    } catch (error) {
      console.error('Error adding experience:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error(error.message || 'Failed to add experience');
      }
    }
  };

  // Styles
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#D4A537',
      },
      '&:hover fieldset': {
        borderColor: '#D4A537',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4A537',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#666',
      '&.Mui-focused': {
        color: '#D4A537',
      },
    },
    marginBottom: '20px',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper className="bg-white rounded-xl p-8 shadow-2xl">
          <Box className="flex items-center mb-8">
            <WorkHistory sx={{ color: '#D4A537', fontSize: 40 }} />
            <div className="ml-4">
              <h2 className="text-3xl font-bold text-gray-800">Add Experience</h2>
              <p className="text-gray-600">Share your ushering experience to enhance your profile</p>
            </div>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Experience Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description || 'Minimum 50 characters required'}
              fullWidth
              required
              multiline
              rows={6}
              sx={inputStyle}
              placeholder="Describe your experience, skills, and achievements..."
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-700 font-semibold mb-2">Tips for a great experience description:</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Start with your role and responsibilities</li>
                <li>• Include specific achievements and metrics</li>
                <li>• Mention relevant skills and tools used</li>
                <li>• Keep it professional and concise</li>
                <li>• Highlight any special events or venues you've worked at</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{
                  borderColor: '#D4A537',
                  color: '#D4A537',
                  '&:hover': {
                    borderColor: '#b88c2e',
                    backgroundColor: 'rgba(212, 165, 55, 0.1)',
                  },
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: '#D4A537',
                  '&:hover': {
                    backgroundColor: '#b88c2e',
                  },
                  '&:disabled': {
                    backgroundColor: '#7c6320',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Save Experience'
                )}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default AddExperience;
