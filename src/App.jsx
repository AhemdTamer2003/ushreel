import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import UsherRegister from './Pages/Auth/UsherRegister';
import ContentCreatorRegister from './Pages/Auth/ContentCreatorRegister';
import CompanyRegister from './Pages/Auth/CompanyRegister';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import VerifyOtp from './Pages/Auth/VerifyOtp';  // Import VerifyOtp component
import ContactUs from "./Pages/Auth/ContactForm";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/usherregister' element={<UsherRegister />} />
        <Route path='/contentcreatorregister' element={<ContentCreatorRegister />} />
        <Route path='/companyregister' element={<CompanyRegister />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/verifyotp' element={<VerifyOtp />} /> {/* Add the route for OTP verification */}
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
