import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

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
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo-container">
          <div className="usheReel">
            <span className="letter">u</span>
            <span className="letter">s</span>
            <span className="letter">h</span>
            <span className="letter">e</span>
            <span className="letter highlight-R">R</span>
            <span className="letter">e</span>
            <span className="letter">e</span>
            <span className="letter">l</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/" className="nav-link">Home</Link>

          {/* Explore Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="nav-link"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={exploreDropdown ? "true" : "false"}
            >
              Explore <span className="ml-1">▼</span>
            </button>
            {exploreDropdown && (
              <div className="absolute bg-white text-black py-2 mt-1 w-40 rounded shadow-lg">
                <Link to="/usherregister" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Usher</Link>
                <Link to="/companyregister" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Company</Link>
                <Link to="/contentcreatorregister" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Content Creator</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Desktop Login/Register */}
        <div className="hidden md:flex space-x-2">
          <Link to="/login" className="px-3 py-1 border border-black bg-white text-black rounded">Login</Link>
          <Link to="/register" className="px-3 py-1 bg-black text-white rounded">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={handleMobileMenuToggle}>
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>

          {/* Mobile Explore Dropdown */}
          <div className="text-center">
            <button className="nav-link" onClick={handleDropdownToggle}>
              Explore ▼
            </button>
            {exploreDropdown && (
              <div className="flex flex-col bg-white text-black mt-2 rounded shadow-lg">
                <Link to="/usherregister" className="px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Usher</Link>
                <Link to="/companyregister" className="px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Company</Link>
                <Link to="/contentcreatorregister" className="px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Content Creator</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="nav-link" onClick={handleLinkClick}>About</Link>
          <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
          <Link to="/login" className="px-3 py-1 border border-black bg-white text-black rounded w-full text-center" onClick={handleLinkClick}>Login</Link>
          <Link to="/register" className="px-3 py-1 bg-black text-white rounded w-full text-center" onClick={handleLinkClick}>Register</Link>
        </div>
      )}
    </nav>
  );
}