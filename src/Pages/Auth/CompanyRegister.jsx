import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import companyregisterimg from "../../assets/AuthAssets/companyregister.png";
import AuthInput from "./Auth-Components/AuthInput";
import { Link } from 'react-router-dom';
function CompanyRegister() {
    const [formData, setFormData] = useState({
        comapnyname: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <div className="bg-solid">
                <div className="grid lg:grid-cols-2 grid-cols-1  rounded-lg shadow-lg  ">
                    {/* Left Side Image */}
                    <div className="lg:flex hidden">
                        <img src={companyregisterimg} className="w-full max-h-screen object-cover" alt="Usher Register" />
                    </div>

                    {/* Right Side Form */}
                    <div className="bg-solid lg:px-24 px-6 py-8 text-white w-full ">
                        <h2 className="text-xl font-bold text-yellow-500 mb-2">Register Now</h2>
                        <p className="text-sm text-gray-400 mb-6">And make events more easier</p>


                        <AuthInput LabelText="Company Name" name="comapnyname" value={formData.comapnyname} onChange={handleChange} />


                        <div className="flex flex-col gap-2 justify-center items-center">
                            <AuthInput LabelText="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ marginTop: ".5rem", }} />
                            <AuthInput LabelText="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                            <AuthInput LabelText="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <AuthInput LabelText="Address" name="address" value={formData.address} onChange={handleChange} sx={{ marginTop: ".5rem" }} />


                        <AuthInput LabelText="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} sx={{ marginTop: ".5rem" }} />

                        {/* Register Button */}
                        <div className="w-full flex justify-center items-center">
                            <Button variant="contained" sx={{ backgroundColor: "#D4A537", mt: 2, width: '50%' }}>
                                Create Account
                            </Button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-gray-400 mt-3">
                            Already have an account? <Link to={'/login'} className="text-yellow-500 cursor-pointer">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyRegister
