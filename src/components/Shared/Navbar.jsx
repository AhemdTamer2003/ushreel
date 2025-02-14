import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-main text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">UsheReel</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <div className="relative group">
            <button className="hover:underline flex items-center">
              Explore <span className="ml-1">▼</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black py-2 mt-1 w-32 rounded shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">Option 1</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">Option 2</a>
            </div>
          </div>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          <Link to={'/login'} className="px-3 py-1 border border-black bg-white text-black rounded">Login</Link>
          <Link to={'/register'} className="px-3 py-1 bg-black text-white rounded">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Explore</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <button className="px-3 py-1 border border-black bg-white text-black rounded w-full">Login</button>
          <button className="px-3 py-1 bg-black text-white rounded w-full">Register</button>
        </div>
      )}
    </nav>
  );
}
