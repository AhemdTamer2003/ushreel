import { Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import React, { useState } from "react";
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
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
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
        {/* Using space-y-4 to add spacing between children, plus some overall padding */}
        <form
          onSubmit={handleSubmit}
          className="bg-solid lg:px-24 px-6 py-8 text-white w-full space-y-4"
        >
          <div>
            <h2 className="text-xl font-bold text-yellow-500">Register Now</h2>
            <p className="text-sm text-gray-400">And make events more easier</p>
          </div>

          <div>
            <AuthInput
              LabelText="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div>
            <AuthInput
              LabelText="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <AuthInput
              LabelText="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <AuthInput
              LabelText="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <AuthInput
              LabelText="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* MUI FormControl for Gender with margin-bottom */}
          <FormControl
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "2px",
              marginBottom: "1rem", // increase spacing here
            }}
          >
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Date input with consistent padding/margins */}
          <div>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="py-3 px-4 w-full text-black bg-white rounded-sm"
            />
          </div>

          <div className="w-full flex justify-center items-center mt-4">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D4A537", width: "50%" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>
          </div>

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
