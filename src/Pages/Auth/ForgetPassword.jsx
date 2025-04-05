import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Paper,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { EmailOutlined, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImg from '../../assets/AuthAssets/loginbackground.png';

function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('resetEmail', email);
        toast.success('Reset code sent to your email!');
        navigate('/verify-otp', { 
          state: { 
            email,
            fromForgotPassword: true 
          }
        });
      } else {
        throw new Error(data.message || 'Failed to send reset code');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred');
      setError(err.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Paper 
          elevation={24}
          className="p-8 rounded-xl relative"
          sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ 
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#D4A537'
            }}
          >
            <ArrowBack />
          </IconButton>

          <Box className="text-center mb-8">
            <div className="w-16 h-16 bg-[#D4A537] rounded-full flex items-center justify-center mx-auto mb-4">
              <EmailOutlined sx={{ fontSize: 32, color: 'white' }} />
            </div>
            <Typography variant="h4" className="text-[#D4A537] font-bold mb-2">
              Forgot Password?
            </Typography>
            <Typography variant="body1" className="text-gray-300">
              Enter your email address and we'll send you a code to reset your password
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={!!error}
              helperText={error}
              fullWidth
              required
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: '#D4A537' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#D4A537',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D4A537',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4A537',
                  },
                  '&.Mui-error fieldset': {
                    borderColor: '#f44336',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#D4A537',
                  '&.Mui-error': {
                    color: '#f44336',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#f44336',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#D4A537',
                color: 'white',
                height: '48px',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b88c2e',
                },
                '&:disabled': {
                  backgroundColor: '#7c6320',
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Reset Code'
              )}
            </Button>

            <div className="flex flex-col items-center space-y-4 pt-4">
              <Link
                to="/login"
                className="text-[#D4A537] hover:text-[#b88c2e] transition-colors text-sm"
              >
                Back to Login
              </Link>

              <Typography variant="body2" className="text-gray-400 text-center">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#D4A537] hover:text-[#b88c2e] transition-colors"
                >
                  Sign up
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;