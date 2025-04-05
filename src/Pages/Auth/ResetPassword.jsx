import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { 
  LockOutlined, 
  Visibility, 
  VisibilityOff,
  CheckCircleOutline,
  ArrowBack
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import backgroundImg from '../../assets/AuthAssets/loginbackground.png';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Get email and OTP from location state
  const email = location.state?.email || localStorage.getItem('resetEmail');
  const otp = location.state?.otp;

  useEffect(() => {
    // Check both location state and localStorage
    const verifiedEmail = email || localStorage.getItem('resetEmail');
    const verifiedOtp = otp || localStorage.getItem('verifiedOtp');
  
    console.log('Reset Password Mount:', { verifiedEmail, verifiedOtp });
  
    if (!verifiedEmail || !verifiedOtp) {
      toast.error('Invalid reset attempt. Please try again.');
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  // Password validation criteria
  const passwordCriteria = [
    { label: 'At least 8 characters', test: pwd => pwd.length >= 8 },
    { label: 'Contains a number', test: pwd => /\d/.test(pwd) },
    { label: 'Contains a lowercase letter', test: pwd => /[a-z]/.test(pwd) },
    { label: 'Contains an uppercase letter', test: pwd => /[A-Z]/.test(pwd) },
    { label: 'Contains a special character', test: pwd => /[!@#$%^&*]/.test(pwd) }
  ];

  const validatePassword = (password) => {
    const failedCriteria = passwordCriteria
      .filter(criteria => !criteria.test(password))
      .map(criteria => criteria.label);
    
    return failedCriteria.length === 0 ? '' : failedCriteria.join(', ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    // Validate password as user types
    if (name === 'newPassword') {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setErrors(prev => ({
          ...prev,
          newPassword: passwordError
        }));
      }
    }

    // Check password match when confirming
    if (name === 'confirmPassword') {
      if (value !== formData.newPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setErrors(prev => ({
        ...prev,
        newPassword: passwordError
      }));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('Password reset successfully!');
        localStorage.removeItem('resetEmail');
        
        setTimeout(() => {
          navigate('/login', {
            state: { successMessage: 'Password has been reset successfully. Please login with your new password.' }
          });
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
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
            {!success && (
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
            )}

            {success ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircleOutline 
                  sx={{ 
                    fontSize: 64, 
                    color: '#4CAF50',
                    marginBottom: 2
                  }} 
                />
                <Typography variant="h5" className="text-white mb-4">
                  Password Reset Successful!
                </Typography>
                <Typography variant="body1" className="text-gray-300">
                  Redirecting to login...
                </Typography>
              </motion.div>
            ) : (
              <>
                <Box className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#D4A537] rounded-full flex items-center justify-center mx-auto mb-4">
                    <LockOutlined sx={{ fontSize: 32, color: 'white' }} />
                  </div>
                  <Typography variant="h4" className="text-[#D4A537] font-bold mb-2">
                    Reset Password
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Create a new strong password
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <TextField
                    label="New Password"
                    name="newPassword"
                    type={showPassword.newPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility('newPassword')}
                            edge="end"
                            sx={{ color: '#D4A537' }}
                          >
                            {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
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
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4A537',
                      },
                      '& .MuiFormHelperText-root': {
                        color: errors.newPassword ? '#f44336' : '#D4A537',
                      },
                    }}
                  />

                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            edge="end"
                            sx={{ color: '#D4A537' }}
                          >
                            {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
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
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4A537',
                      },
                      '& .MuiFormHelperText-root': {
                        color: errors.confirmPassword ? '#f44336' : '#D4A537',
                      },
                    }}
                  />

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <Typography variant="body2" className="text-gray-300 mb-2">
                      Password must contain:
                    </Typography>
                    <ul className="space-y-1">
                      {passwordCriteria.map((criteria, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-center ${
                            criteria.test(formData.newPassword)
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }`}
                        >
                          <CheckCircleOutline
                            sx={{
                              fontSize: 16,
                              marginRight: 1,
                              color: criteria.test(formData.newPassword)
                                ? '#4CAF50'
                                : '#666'
                            }}
                          />
                          {criteria.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading || !!errors.newPassword || !!errors.confirmPassword}
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
                      'Reset Password'
                    )}
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ResetPassword;