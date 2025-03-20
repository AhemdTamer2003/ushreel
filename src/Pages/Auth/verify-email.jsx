import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the email from location state (passed from a previous page, e.g., forgot password)
  const email = location.state?.email || '';

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, navigate to the next page (e.g., add-experience)
        navigate('/add-experience');
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="bg-black-transport lg:w-1/3 w-full rounded-xl p-6 mt-6">
        <h2 className="text-2xl text-main font-bold text-center">Enter OTP</h2>
        <p className="text-xl text-white my-4 text-center">
          Please enter the OTP sent to your email
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <TextField
            label="Enter OTP"
            name="otp"
            type="text"
            value={otp}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#2A2A2A', // Dark background for the input field
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D4A537', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: '#FF9900', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF9900', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FF9900', // Label color
              },
            }}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#C2A04C', width: '50%' }}
            >
              Verify OTP
            </Button>
          </div>
          <span className="text-center text-white">
            Didn't receive OTP?{' '}
            <Link to="/forgetpassword" className="underline text-main">
              Resend
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;