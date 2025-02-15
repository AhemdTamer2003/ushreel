import React, { useState } from 'react'
import AuthInput from './Auth-Components/AuthInput'
import { Button } from '@mui/material';
import loginpic from '../../assets/AuthAssets/loginbackground.png';
import { Link } from 'react-router-dom';
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='flex justify-center items-center h-screen px-4' style={{ backgroundImage: `url(${loginpic})` }}>
      <div className=" gap-4 r  bg-black-transport lg:w-1/3 w-full rounded-xl p-6 mt-6">
        <h2 className='text-2xl text-main font-bold text-center'>Login</h2>
        <p className='text-xl text-white my-4  text-center'>Enter Now and Reach people</p>
        <div className="flex flex-col gap-8 ">
          <AuthInput LabelText="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ marginTop: ".5rem", }} />
          <AuthInput LabelText="Password" name="password" type="password" value={formData.password} onChange={handleChange} sx={{ marginTop: ".5rem", }} />
          <Link className='underline text-start text-main'>Forget Password?</Link>
          <div className="w-full flex flex-col justify-center items-center">

            <Button variant="contained" sx={{ backgroundColor: "#D4A537", width: '50%' }}>
              Log in
            </Button>
          </div>
          <span className=' text-center text-white'>Don't have Account? <Link to={'/register'} className='underline  text-main'>Sign up</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login
