import React, { useState } from "react";
import { 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  CircularProgress, 
  TextField 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import usherregisterimg from "../../assets/AuthAssets/usherpic.png";
import AuthInput from "./Auth-Components/AuthInput";
import { Link } from "react-router-dom";
import { registerUshear } from "../../redux/Services/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsherRegister() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    birthdate: "",
    role: "usher",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...dataToSend } = formData;

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(registerUshear(dataToSend)).unwrap();
      toast.success("Usher registered successfully!");
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  return (
    <div className="bg-solid">
      <div className="grid lg:grid-cols-2 grid-cols-1 rounded-lg shadow-lg">
        {/* Left side image */}
        <div className="lg:flex hidden">
          <img
            src={usherregisterimg}
            className="w-full max-h-screen object-cover"
            alt="Usher Register"
          />
        </div>

        {/* Right side form */}
        <form
          onSubmit={handleSubmit}
          className="bg-solid lg:px-24 px-8 py-12 text-white w-full space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">Register Now</h2>
            <p className="text-sm text-gray-400">And make events more easier</p>
          </div>

          {/* First Name and Last Name */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <AuthInput
                LabelText="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <AuthInput
                LabelText="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <AuthInput
              LabelText="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <AuthInput
              LabelText="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <AuthInput
              LabelText="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Gender Select */}
          <FormControl
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Phone Number */}
          <div>
            <AuthInput
              LabelText="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Birthdate */}
          <div>
            <TextField
              label="Usher BirthDate"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center items-center mt-6">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D4A537", width: "50%", padding: "10px 0" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UsherRegister;