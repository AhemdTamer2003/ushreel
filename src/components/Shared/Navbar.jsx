import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);

  const handleDropdownToggle = () => setExploreDropdown(prev => !prev);

  const handleMobileMenuToggle = () => setIsOpen(prev => !prev);

  const handleLinkClick = () => {
    setIsOpen(false);
    setExploreDropdown(false);
  };

  return (
    <nav className="bg-main text-white px-6 py-3 font-bold">
      <div className="flex justify-between items-center">
        {/* Logo with split animation */}
        <div className="logo-container">
          <span className="ushe logo-animate">ushR</span>
          <span className="eel logo-animate">eel</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={exploreDropdown ? "true" : "false"}
            >
              Explore <span className="ml-1">▼</span>
            </button>
            {exploreDropdown && (
              <div className="absolute bg-white text-black py-2 mt-1 w-40 rounded shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyregister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Content Creator
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Desktop Register/Login */}
        <div className="hidden md:flex space-x-2">
          <Link 
            to="/login" 
            className="px-3 py-1 border border-black bg-white text-black rounded"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-3 py-1 bg-black text-white rounded"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={handleMobileMenuToggle}>
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4">
          <Link to="/" className="hover:underline" onClick={handleLinkClick}>
            Home
          </Link>
          
          {/* Mobile Explore Dropdown */}
          <div className="text-center">
            <button
              className="hover:underline"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={exploreDropdown ? "true" : "false"}
            >
              Explore ▼
            </button>
            {exploreDropdown && (
              <div className="flex flex-col bg-white text-black mt-2 rounded shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyregister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={handleLinkClick}
                >
                  Content Creator
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:underline" onClick={handleLinkClick}>
            About
          </Link>
          <Link to="/contact" className="hover:underline" onClick={handleLinkClick}>
            Contact
          </Link>
          <Link 
            to="/login" 
            className="px-3 py-1 border border-black bg-white text-black rounded w-full text-center"
            onClick={handleLinkClick}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-3 py-1 bg-black text-white rounded w-full text-center"
            onClick={handleLinkClick}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}