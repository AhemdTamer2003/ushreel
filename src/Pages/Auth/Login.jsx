// src/components/Login.jsx

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuth, clearError } from '../../redux/Slices/authSlice.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpic from "../../assets/AuthAssets/loginbackground.png";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhoneOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhoneOrUsername: "",
    password: "",
  });

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle success messages and errors
  useEffect(() => {
    const successMessage = location.state?.successMessage;
    if (successMessage) {
      toast.success(successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);
    }
  }, [location, navigate, error, message, dispatch]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.emailOrPhoneOrUsername.trim()) {
      newErrors.emailOrPhoneOrUsername = "This field is required";
      isValid = false;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const result = await dispatch(loginUser({
        emailOrPhoneOrUsername: formData.emailOrPhoneOrUsername.trim(),
        password: formData.password.trim(),
      })).unwrap();

      console.log('Login Response:', result);

      if (!result) {
        throw new Error('No response received');
      }

      // Check if email verification is required
      if (result.user && !result.user.isEmailVerified) {
        navigate("/verify-otp", {
          state: {
            email: formData.emailOrPhoneOrUsername,
            fromLogin: true,
          },
        });
        return;
      }

      // Check if experience needs to be added
      if (result.user && !result.user.hasAddedExperience) {
        toast.info("Please complete your profile by adding your experience");
        navigate("/add-experience");
      } else {
        toast.success("Welcome back!");
        navigate("/usher-profile");
      }

    } catch (error) {
      console.error('Login error:', error);

      // Handle specific error cases
      if (error.response) {
        const errorMessage = error.response.data?.message;
        switch (error.response.status) {
          case 400:
            toast.error(errorMessage || "Invalid email or password format");
            break;
          case 401:
            toast.error(errorMessage || "Invalid credentials");
            setFormData(prev => ({ ...prev, password: "" }));
            break;
          case 403:
            if (errorMessage === "Email verification required") {
              navigate("/verify-otp", {
                state: {
                  email: formData.emailOrPhoneOrUsername,
                  fromLogin: true,
                },
              });
            } else {
              toast.error("Access denied");
              setFormData(prev => ({ ...prev, password: "" }));
            }
            break;
          case 404:
            toast.error("Account not found");
            break;
          case 429:
            toast.error("Too many attempts. Please try again later.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(errorMessage || "Login failed");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8 bg-black"
      style={{
        backgroundImage: `url(${loginpic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Paper
        elevation={24}
        className="p-8 rounded-xl w-full max-w-md"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4A537] rounded-full flex items-center justify-center mx-auto mb-4">
            <Email sx={{ fontSize: 32, color: 'white' }} />
          </div>
          <h2 className="text-3xl text-[#D4A537] font-bold mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-300">
            Enter your credentials to access your account
          </p>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Email / Phone / Username"
            name="emailOrPhoneOrUsername"
            value={formData.emailOrPhoneOrUsername}
            onChange={handleChange}
            error={!!errors.emailOrPhoneOrUsername}
            helperText={errors.emailOrPhoneOrUsername}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: '#D4A537' }}>
                  <Email />
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
                color: '#f44336',
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#D4A537' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
                color: '#f44336',
              },
            }}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[#D4A537] hover:text-[#b88c2e] transition-colors text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#D4A537",
              height: "48px",
              fontSize: "1rem",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: '#b88c2e',
              },
              '&:disabled': {
                backgroundColor: '#7c6320',
                color: '#ffffff70',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Log in"
            )}
          </Button>

          <div className="text-center text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#D4A537] hover:text-[#b88c2e] transition-colors"
            >
              Create Account
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;