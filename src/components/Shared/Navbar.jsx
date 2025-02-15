import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);

  return (
    <nav className="bg-main text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">UsheReel</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={() => setExploreDropdown(!exploreDropdown)}
              aria-haspopup="true"
              aria-expanded={exploreDropdown}
            >
              Explore <span className="ml-1">▼</span>
            </button>
            {exploreDropdown && (
              <div className="absolute bg-white text-black py-2 mt-1 w-40 rounded shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setExploreDropdown(false)}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyrtegister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setExploreDropdown(false)}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setExploreDropdown(false)}
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
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          
          {/* Mobile Explore Dropdown */}
          <div className="text-center">
            <button
              className="hover:underline"
              onClick={() => setExploreDropdown(!exploreDropdown)}
              aria-haspopup="true"
              aria-expanded={exploreDropdown}
            >
              Explore ▼
            </button>
            {exploreDropdown && (
              <div className="flex flex-col bg-white text-black mt-2 rounded shadow-lg">
                <Link 
                  to="/usherregister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setExploreDropdown(false);
                    setIsOpen(false);
                  }}
                >
                  Usher
                </Link>
                <Link 
                  to="/companyrtegister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setExploreDropdown(false);
                    setIsOpen(false);
                  }}
                >
                  Company
                </Link>
                <Link 
                  to="/contentcreatorregister" 
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setExploreDropdown(false);
                    setIsOpen(false);
                  }}
                >
                  Content Creator
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link 
            to="/login" 
            className="px-3 py-1 border border-black bg-white text-black rounded w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-3 py-1 bg-black text-white rounded w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
