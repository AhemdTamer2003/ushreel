import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuth,
  clearError,
} from "../../redux/Slices/authSlice.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpic from "../../assets/AuthAssets/loginbackground.png";
import PropTypes from "prop-types";
import Header from "../../components/Shared/Header";
import PageContainer from "../../components/Shared/PageContainer";

const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.emailOrPhoneOrUsername.trim()) {
    errors.emailOrPhoneOrUsername = "This field is required";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

const PasswordField = ({
  value,
  onChange,
  error,
  helperText,
  showPassword,
  toggleShowPassword,
}) => (
  <TextField
    label="Password"
    name="password"
    type={showPassword ? "text" : "password"}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={helperText}
    fullWidth
    required
    InputProps={{
      startAdornment: (
        <InputAdornment position="start" sx={{ color: "#D4A537" }}>
          <Lock />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleShowPassword}
            edge="end"
            sx={{ color: "#D4A537" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        color: "white",
        "& fieldset": {
          borderColor: "#D4A537",
        },
        "&:hover fieldset": {
          borderColor: "#D4A537",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#D4A537",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#D4A537",
      },
      "& .MuiFormHelperText-root": {
        color: "#f44336",
      },
    }}
  />
);

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  showPassword: PropTypes.bool.isRequired,
  toggleShowPassword: PropTypes.func.isRequired,
};

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

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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
      const result = await dispatch(
        loginUser({
          emailOrPhoneOrUsername: formData.emailOrPhoneOrUsername.trim(),
          password: formData.password.trim(),
        })
      ).unwrap();

      if (!result) {
        throw new Error("No response received");
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

      // Handle role-based redirects
      if (result.role === "contentCreator") {
        if (result.user && !result.user.hasAddedExperience) {
          toast.info("Please complete your profile by adding your experience");
          navigate("/add-experience");
        } else {
          toast.success("Welcome back!");
          navigate("/content-creator-profile");
        }
      } else if (result.role === "usher") {
        if (result.user && !result.user.hasAddedExperience) {
          toast.info("Please complete your profile by adding your experience");
          navigate("/add-experience");
        } else {
          toast.success("Welcome back!");
          navigate("/usher-profile");
        }
      } else {
        toast.success("Welcome back!");
        navigate("/company-profile");
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message;
      switch (error.response.status) {
        case 400:
          toast.error(errorMessage || "Invalid email or password format");
          break;
        case 401:
          toast.error(errorMessage || "Invalid credentials");
          setFormData((prev) => ({ ...prev, password: "" }));
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
            setFormData((prev) => ({ ...prev, password: "" }));
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
  };

  return (
    <PageContainer backgroundImage={loginpic}>
      <Header
        title="Welcome Back"
        subtitle="Enter your credentials to access your account"
        icon={<Email sx={{ fontSize: 32, color: "white" }} />}
      />

      <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
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
              <InputAdornment position="start" sx={{ color: "#D4A537" }}>
                <Email />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "#D4A537",
              },
              "&:hover fieldset": {
                borderColor: "#D4A537",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D4A537",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#D4A537",
            },
            "& .MuiFormHelperText-root": {
              color: "#f44336",
            },
          }}
        />

        <PasswordField
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />

        <Link
          to="/forgot-password"
          className="text-[#D4A537] text-sm hover:underline block text-right"
        >
          Forgot password?
        </Link>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#D4A537",
            color: "white",
            py: 1.5,
            "&:hover": { bgcolor: "#b88c2e" },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#D4A537] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </PageContainer>
  );
}

export default Login;
