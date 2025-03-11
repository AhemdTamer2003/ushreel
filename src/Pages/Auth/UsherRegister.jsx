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
                <div className="lg:flex hidden">
                    <img src={usherregisterimg} className="w-full max-h-screen object-cover" alt="Usher Register" />
                </div>

                <form onSubmit={handleSubmit} className="bg-solid lg:px-24 px-6 py-8 text-white w-full">
                    <h2 className="text-xl font-bold text-yellow-500 mb-2">Register Now</h2>
                    <p className="text-sm text-gray-400 mb-6">And make events more easier</p>

                    <AuthInput LabelText="User Name" name="userName" value={formData.userName} onChange={handleChange} />
                    <AuthInput LabelText="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <AuthInput LabelText="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                    <AuthInput LabelText="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                    <AuthInput LabelText="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />

                    <FormControl fullWidth sx={{ backgroundColor: "white", marginBottom: ".5rem", borderRadius: '2px' }}>
                        <InputLabel>Gender</InputLabel>
                        <Select name="gender" value={formData.gender} onChange={handleChange}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>

                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="py-4 w-full text-black bg-white my-2 px-2 rounded-sm"
                    />

                    <div className="w-full flex justify-center items-center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "#D4A537", mt: 2, width: '50%' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                        </Button>
                    </div>

                    <p className="text-center text-gray-400 mt-3">
                        Already have an account? <Link to="/login" className="text-yellow-500 cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default UsherRegister;
