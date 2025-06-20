import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usherregisterimg from "../../assets/AuthAssets/usherpic.png";
import { Link } from "react-router-dom";
import { registerUshear } from "../../redux/Services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsherRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    birthdate: "",
    address: "",
    role: "usher",
  });

  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!formData.birthdate) newErrors.birthdate = "Birthdate is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData; // eslint-disable-line no-unused-vars
    try {
      await dispatch(registerUshear(dataToSend)).unwrap();
      localStorage.setItem("registrationEmail", formData.email);
      toast.success("Registration successful! Please verify your email.");
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: "4px",
      height: "48px",
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
      color: "#666",
      "&.Mui-focused": {
        color: "#D4A537",
      },
    },
    marginBottom: "20px",
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 hidden lg:block">
        <img
          src={usherregisterimg}
          className="w-full h-screen object-cover"
          alt="Usher Register"
        />
      </div>

      <div className="flex-1 px-8 lg:px-16 py-8 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <h1 className="text-[#D4A537] text-3xl font-bold mb-2">
            Register Now
          </h1>
          <p className="text-gray-400 mb-8">And make events more easier</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                sx={inputStyle}
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                sx={inputStyle}
              />
            </div>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={inputStyle}
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
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth error={!!errors.gender} sx={inputStyle}>
              <InputLabel>Gender *</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender *"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </FormControl>

            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              label="Birthdate"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              error={!!errors.birthdate}
              helperText={errors.birthdate}
              InputLabelProps={{
                shrink: true,
              }}
              sx={inputStyle}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              sx={inputStyle}
              multiline
              rows={2}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#D4A537",
                height: "48px",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "24px",
                "&:hover": {
                  backgroundColor: "#b88c2e",
                },
                "&:disabled": {
                  backgroundColor: "#7c6320",
                  color: "#ffffff70",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>

            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#D4A537] hover:text-[#b88c2e] transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UsherRegister;
