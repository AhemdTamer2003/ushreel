import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  CircularProgress,
  Paper,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import {
  LockOutlined,
  ArrowBack
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { verifyEmail, selectAuth } from '../../redux/Slices/authSlice';
import backgroundImg from '../../assets/AuthAssets/loginbackground.png';

function ResetOtp() {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const email = location.state?.email || localStorage.getItem('verificationEmail');
  const fromLogin = location.state?.fromLogin;

  useEffect(() => {
    if (!email) {
      toast.error('No email found. Please try again.');
      navigate('/login');
      return;
    }

    inputRefs.current = inputRefs.current.slice(0, 6);
    if (inputRefs.current[0]) inputRefs.current[0].focus();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    if (inputRefs.current[5]) inputRefs.current[5].focus();
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    toast.success('Verification code resent! (Demo)');
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
  
    if (otpString.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
  
    try {
      await dispatch(verifyEmail({
        email,
        verificationCode: otpString
      })).unwrap();
  
      toast.success('Email verified successfully!');
      navigate('/add-experience', { replace: true });
  
    } catch (error) {
      toast.error(error?.message || 'Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
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
              <LockOutlined sx={{ fontSize: 32, color: 'white' }} />
            </div>
            <Typography variant="h4" className="text-[#D4A537] font-bold mb-2">
              Verify Email
            </Typography>
            <Typography variant="body1" className="text-gray-300">
              Resetting code sent to<br />
              <span className="text-[#D4A537] font-medium">{email}</span>
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={el => inputRefs.current[index] = el}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  type="text"
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      padding: '12px',
                      color: 'white'
                    }
                  }}
                  sx={{
                    width: '48px',
                    '& .MuiOutlinedInput-root': {
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
                  }}
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || otp.join('').length !== 6}
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
                'Verify Code'
              )}
            </Button>

            <div className="text-center space-y-4">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || loading}
                className={`text-sm ${
                  canResend
                    ? 'text-[#D4A537] hover:text-[#b88c2e] cursor-pointer'
                    : 'text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                {canResend ? 'Resend Code' : `Resend code in ${timeLeft}s`}
              </button>

              <Typography variant="body2" className="text-gray-400">
                Didn't receive the code?{' '}
                <Link
                  to="/contact-support"
                  className="text-[#D4A537] hover:text-[#b88c2e] transition-colors"
                >
                  Contact Support
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
}

export default ResetOtp;
