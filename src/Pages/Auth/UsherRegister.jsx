import React, { useState } from "react";
import usherregisterimg from "../../assets/AuthAssets/usherpic.png";
import AuthInput from "./Auth-Components/AuthInput";
import { MenuItem, Button, Select, FormControl, InputLabel } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function UsherRegister() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phoneNumber: "",
        birthDate: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-solid h-screen">
            <div className="grid lg:grid-cols-2 grid-cols-1  rounded-lg shadow-lg n ">
                {/* Left Side Image */}
                <div className="lg:flex hidden">
                    <img src={usherregisterimg} className="w-full  object-cover" alt="Usher Register" />
                </div>

                {/* Right Side Form */}
                <div className="bg-solid px-16 py-8 text-white w-full ">
                    <h2 className="text-xl font-bold text-yellow-500 mb-2">Register Now</h2>
                    <p className="text-sm text-gray-400 mb-6">And make events more easier</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <AuthInput LabelText="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <AuthInput LabelText="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center">
                        <AuthInput LabelText="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ marginBottom: "1rem", marginTop: "1rem", }} />
                        <AuthInput LabelText="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                        <AuthInput LabelText="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                    </div>

                    {/* Gender Selection */}
                    <FormControl fullWidth sx={{ backgroundColor: "white", marginBottom: "1rem", marginTop: "1rem", borderRadius: '2px' }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>

                    <AuthInput LabelText="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

                    {/* Date Picker */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Usher BirthDate"
                            inputFormat="MM/DD/YYYY"
                            value={formData.birthDate}
                            onChange={(date) => setFormData({ ...formData, birthDate: date })}
                            renderInput={(params) => <AuthInput {...params} />}
                        />
                    </LocalizationProvider>

                    {/* Register Button */}
                    <Button variant="contained" fullWidth sx={{ backgroundColor: "#D4A537", mt: 2 }}>
                        Create Account
                    </Button>

                    {/* Login Link */}
                    <p className="text-center text-gray-400 mt-3">
                        Already have an account? <span className="text-yellow-500 cursor-pointer">Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UsherRegister;
