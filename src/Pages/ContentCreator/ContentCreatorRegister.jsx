import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import contentcreatorregisterimg from "../../assets/AuthAssets/contentcreatorregister.png";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthInput from "../../components/Auth/AuthInput";

function ContentCreatorRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    fieldOfWork: "",
    phone: "",
    birthdate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/register/content-creator`,
        {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          gender: formData.gender,
          birthdate: formData.birthdate,
          fieldOfWork: formData.fieldOfWork,
        }
      );
      localStorage.setItem("verificationEmail", formData.email);
      toast.success("Registration successful! Please log in.");
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-solid">
      <div className="grid lg:grid-cols-2 grid-cols-1 rounded-lg shadow-lg">
        {/* Left Side Image */}
        <div className="lg:flex hidden">
          <img
            src={contentcreatorregisterimg}
            className="w-full max-h-screen object-cover"
            alt="Content Creator Register"
          />
        </div>

        {/* Right Side Form */}
        <div className="bg-solid lg:px-24 px-6 py-8 text-white w-full">
          <h2 className="text-xl font-bold text-yellow-500 mb-2">
            Register Now
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            And make events more easier
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <AuthInput
              LabelText="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <AuthInput
              LabelText="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <AuthInput
              LabelText="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {/* Field of Work Selection */}
            <FormControl
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            >
              <InputLabel>Field of Work</InputLabel>
              <Select
                name="fieldOfWork"
                value={formData.fieldOfWork}
                onChange={handleChange}
              >
                <MenuItem value="Writing">Writing</MenuItem>
                <MenuItem value="Reel Maker">Reel Maker</MenuItem>
                <MenuItem value="Video Editor">Video Editor</MenuItem>
                <MenuItem value="Photographer">Photographer</MenuItem>
              </Select>
            </FormControl>

            {/* Gender Selection */}
            <FormControl
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            >
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <AuthInput
              LabelText="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <AuthInput
              LabelText="Birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
            />

            <div className="w-full flex justify-center items-center">
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#D4A537", mt: 2, width: "50%" }}
              >
                Create Account
              </Button>
            </div>
          </form>

          <p className="text-center text-gray-400 mt-3">
            Already have an account?{" "}
            <Link to={"/login"} className="text-yellow-500 cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContentCreatorRegister;
