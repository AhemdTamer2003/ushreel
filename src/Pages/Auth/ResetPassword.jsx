import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      console.log("Password reset successful");
      navigate('/login'); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="bg-black-transport lg:w-1/3 w-full rounded-xl p-6 mt-6">
        <h2 className="text-2xl text-main font-bold text-center text-white">Reset Password</h2>
        <p className="text-xl text-white my-4 text-center">Enter your new password below</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <TextField
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#2A2A2A',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#D4A537' },
                '&:hover fieldset': { borderColor: '#FF9900' },
                '&.Mui-focused fieldset': { borderColor: '#FF9900' },
              },
              '& .MuiInputLabel-root': { color: '#FF9900' },
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#2A2A2A',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#D4A537' },
                '&:hover fieldset': { borderColor: '#FF9900' },
                '&.Mui-focused fieldset': { borderColor: '#FF9900' },
              },
              '& .MuiInputLabel-root': { color: '#FF9900' },
            }}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D4A537", width: '50%', '&:hover': { backgroundColor: '#FF9900' } }}
            >
              Reset Password
            </Button>
          </div>
          <span className="text-center text-white">
            Remembered your password? <Link to="/login" className="underline text-main">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
