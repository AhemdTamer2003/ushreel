import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Page Imports
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
import Recommendations from './Pages/Auth/Recommendations';
import ResetOtp from './Pages/Auth/ResetOtp';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D4A537',
      light: '#e3b955',
      dark: '#b88c2e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1a1a1a',
      light: '#2c2c2c',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#D4A537] border-opacity-20 rounded-full animate-spin"></div>
      <div className="w-16 h-16 border-4 border-t-[#D4A537] rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

// Error Boundary Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#D4A537] mb-4">Oops!</h1>
      <p className="text-xl text-white mb-4">Something went wrong</p>
      <p className="text-gray-400 mb-8">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-[#D4A537] text-white px-6 py-2 rounded-full hover:bg-[#b88c2e] transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check authentication status
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          // Validate token here if needed
          console.log('User is authenticated');
        }

        // Simulate initial loading
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err) {
        setError(err);
        console.error('App initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
        <ToastContainer 
          position="top-right" 
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={3}
          toastStyle={{
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            borderRadius: '8px',
          }}
        />

        <Routes>
          {/* Main Routes */}
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Authentication Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/usherregister' element={<UsherRegister />} />
          <Route path='/contentcreatorregister' element={<ContentCreatorRegister />} />
          <Route path='/companyregister' element={<CompanyRegister />} />

          {/* Password Reset Flow */}
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/verify-email' element={<VerifyOtp />} />
          <Route path='/verify-otp' element={<ResetOtp />} />
          <Route path='/ResetPassword' element={<ResetPassword />} />

          {/* Profile & Experience Routes */}
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/usher-profile" element={<UsherProfile />} />
          <Route path="/content-creator-profile" element={<ContentCreatorProfile />} />
          <Route path="/content-creator-edit" element={<ContentCreatorEditProfile />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/marketing-selection" element={<MarketingSelectionPages />} />
          <Route path="/form-description" element={<FormDescription />} />
          <Route path="/recommendations" element={<Recommendations />} />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-[#D4A537] mb-4">404</h1>
                <p className="text-xl text-white mb-8">Page not found</p>
                <button
                  onClick={() => window.history.back()}
                  className="bg-[#D4A537] text-white px-6 py-2 rounded-full hover:bg-[#b88c2e] transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;