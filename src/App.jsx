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
import VerifyOtp from './Pages/Auth/VerifyOtp';
import ContactUs from "./Pages/Auth/ContactForm";
import AboutUs from "./Pages/Auth/AboutUs";
import Team from "./Pages/Auth/Team";
import AddExperience from './Pages/Auth/AddExperience';
import UsherProfile from './Pages/Auth/UsherProfile';
import ContentCreatorProfile from './Pages/Auth/ContentCreatorProfile';
import ContentCreatorEditProfile from './Pages/Auth/ContentCreatorEditProfile';
import CompanyProfile from './Pages/Auth/CompanyProfile';
import MarketingSelectionPages from './Pages/Auth/MarketingSelectionPages';
import FormDescription from './Pages/Auth/FormDescription';
import { ToastContainer } from 'react-toastify';
import VerifyEmail from './Pages/Auth/verify-email'; // ✅ Import VerifyEmail component

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/usherregister' element={<UsherRegister />} />
        <Route path='/contentcreatorregister' element={<ContentCreatorRegister />} />
        <Route path='/companyregister' element={<CompanyRegister />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/verifyotp' element={<VerifyOtp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/add-experience" element={<AddExperience />} />
        <Route path="/usher-profile" element={<UsherProfile />} />
        <Route path="/content-creator-profile" element={<ContentCreatorProfile />} />
        <Route path="/content-creator-edit" element={<ContentCreatorEditProfile />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/marketing-selection" element={<MarketingSelectionPages />} />
        <Route path="/form-description" element={<FormDescription />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* ✅ Added VerifyEmail route */}
      </Routes>
    </>
  );
}

export default App;
