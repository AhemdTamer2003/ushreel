import React, { useState } from 'react';
import AuthInput from './Auth-Components/AuthInput';
import { Button } from '@mui/material';
import backgroundImg from '../../assets/AuthAssets/loginbackground.png';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);  // Track OTP state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Simulate API Call to send reset link and OTP
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setMessage('OTP sent to your email!'); // Simulate success

      // OTP sent successfully
      setIsOtpSent(true); // Change state to show OTP input

      // Redirect to OTP input page
      navigate('/verifyotp');
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-black-transport lg:w-1/3 w-full rounded-xl p-6 mt-6">
        <h2 className="text-2xl text-main font-bold text-center">Reset Password</h2>
        <p className="text-xl text-white my-4 text-center">
          Enter your email to receive a reset link
        </p>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <AuthInput
            LabelText="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginTop: ".5rem" }}
          />
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D4A537", width: '50%' }}
            >
              Send Reset Link
            </Button>
          </div>
          <span className="text-center text-white">
            Remember your password? <Link to="/login" className="underline text-main">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
