import React, { useState } from 'react';
import { Button } from "@mui/material";
import companyregisterimg from "../../assets/AuthAssets/companyregister.png";
import AuthInput from "../../components/Auth/AuthInput";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CompanyRegister() {
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
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
            await axios.post(`${import.meta.env.VITE_BASEURL}/auth/register/company`, {
                name: formData.companyName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
            });
            localStorage.setItem("verificationEmail", formData.email);
            toast.success("Registration successful! Please log in.");
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div>
            <div className="bg-solid">
                <div className="grid lg:grid-cols-2 grid-cols-1 rounded-lg shadow-lg">
                    {/* Left Side Image */}
                    <div className="lg:flex hidden">
                        <img src={companyregisterimg} className="w-full max-h-screen object-cover" alt="Company Register" />
                    </div>

                    {/* Right Side Form */}
                    <div className="bg-solid lg:px-24 px-6 py-8 text-white w-full">
                        <h2 className="text-xl font-bold text-yellow-500 mb-2">Register Now</h2>
                        <p className="text-sm text-gray-400 mb-6">And make events more easier</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <AuthInput
                                LabelText="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />

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

                            <AuthInput
                                LabelText="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />

                            <AuthInput
                                LabelText="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <div className="w-full flex justify-center items-center">
                                <Button type="submit" variant="contained" sx={{ backgroundColor: "#D4A537", mt: 2, width: '50%' }}>
                                    Create Account
                                </Button>
                            </div>
                        </form>

                        <p className="text-center text-gray-400 mt-3">
                            Already have an account? <Link to={'/login'} className="text-yellow-500 cursor-pointer">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyRegister;
