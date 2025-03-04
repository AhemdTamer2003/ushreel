import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExploreDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = () => setExploreDropdown((prev) => !prev);
  const handleMobileMenuToggle = () => setIsOpen((prev) => !prev);
  const handleLinkClick = () => {
    setIsOpen(false);
    setExploreDropdown(false);
  };

  return (
    <nav className="bg-[#C2A04C] py-3 px-8 w-full shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center font-bold text-2xl">
            <span className="text-black uppercase">U</span>
            <span className="text-black">she</span>
            <span className="bg-black text-white px-1.5 rounded uppercase">R</span>
            <span className="text-black">eel</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link 
            to="/" 
            className="text-white font-bold hover:text-[#f1e8d8] hover:shadow-sm 
                     transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Home
          </Link>

          {/* Explore Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={exploreDropdown ? "true" : "false"}
            >
              Explore <span className="ml-1">▼</span>
            </button>
            {exploreDropdown && (
              <div className="absolute bg-white text-black py-2 mt-1 w-40 rounded-lg shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyregister" 
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Content Creator
                </Link>
              </div>
            )}
          </div>
          <Link 
            to="/about" 
            className="text-white font-bold hover:text-[#f1e8d8] hover:shadow-sm 
                     transition-all duration-300 transform hover:-translate-y-0.5"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-white font-bold hover:text-[#f1e8d8] hover:shadow-sm 
                     transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-2">
          <Link 
            to="/login" 
            className="px-4 py-2 bg-white text-black border border-black rounded-md
                     hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-black text-white rounded-md
                     hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={handleMobileMenuToggle}>
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4 bg-[#C2A04C] py-4">
          <Link 
            to="/" 
            className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Home
          </Link>

          <div className="text-center">
            <button 
              className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
              onClick={handleDropdownToggle}
            >
              Explore ▼
            </button>
            {exploreDropdown && (
              <div className="flex flex-col bg-white text-black mt-2 rounded-lg shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyregister" 
                  className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  Content Creator
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/about" 
            className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <Link 
            to="/login" 
            className="w-full max-w-xs px-4 py-2 bg-white text-black border border-black 
                     rounded-md text-center hover:shadow-md transition-all duration-300"
            onClick={handleLinkClick}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="w-full max-w-xs px-4 py-2 bg-black text-white rounded-md text-center
                     hover:shadow-md transition-all duration-300"
            onClick={handleLinkClick}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}