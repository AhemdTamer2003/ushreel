import React, { useState } from 'react';
import AuthInput from './Auth-Components/AuthInput';
import { Button } from '@mui/material';
import loginpic from '../../assets/AuthAssets/loginbackground.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, formData);
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      toast.success("Login successful!");
      if (role == "usher") {
        navigate('/usher-profile')
      }
      else if (role == "company") {
        navigate('/company-profile')
      }
      else if (role == "contentCreator") {
        navigate('/content-creator-profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen px-4"
      style={{
        backgroundImage: `url(${loginpic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black-transport lg:w-1/3 w-full rounded-xl p-6 mt-6 gap-4">
        <h2 className="text-2xl text-main font-bold text-center">Login</h2>
        <p className="text-xl text-white my-4 text-center">
          Enter now and reach people
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AuthInput
            LabelText="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginTop: ".5rem" }}
          />
          <AuthInput
            LabelText="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginTop: ".5rem" }}
          />
          <div className="flex justify-end">
            <Link
              to="/forgetpassword"
              className="underline text-main hover:text-main-dark transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#D4A537",
                width: "50%",
                "&:hover": { backgroundColor: "#c59d30" },
              }}
            >
              Log in
            </Button>
          </div>
          <div className="text-center text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline text-main hover:text-main-dark transition-colors"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
