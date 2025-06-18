import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, logout } from "../../redux/Slices/authSlice";

// Logo component
const Logo = () => (
  <div className="flex items-center font-bold text-2xl">
    <span className="text-black uppercase">U</span>
    <span className="text-black">she</span>
    <span className="bg-black text-white px-1.5 rounded uppercase">R</span>
    <span className="text-black">eel</span>
  </div>
);

const NavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="text-white font-bold hover:text-[#f1e8d8] hover:shadow-sm 
              transition-all duration-300 transform hover:-translate-y-0.5"
    onClick={onClick}
  >
    {children}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const ExploreDropdownContent = ({ onClick }) => (
  <div className="absolute bg-white text-black py-2 mt-1 w-40 rounded-lg shadow-lg z-10">
    <Link
      to="/usherregister"
      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      Usher
    </Link>
    <Link
      to="/companyregister"
      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      Company
    </Link>
    <Link
      to="/contentcreatorregister"
      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      Content Creator
    </Link>
  </div>
);

ExploreDropdownContent.propTypes = {
  onClick: PropTypes.func,
};

const MobileExploreDropdown = ({ isOpen, onClick }) =>
  isOpen && (
    <div className="flex flex-col bg-white text-black mt-2 rounded-lg shadow-lg">
      <Link
        to="/usherregister"
        className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
        onClick={onClick}
      >
        Usher
      </Link>
      <Link
        to="/companyregister"
        className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
        onClick={onClick}
      >
        Company
      </Link>
      <Link
        to="/contentcreatorregister"
        className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
        onClick={onClick}
      >
        Content Creator
      </Link>
    </div>
  );

MobileExploreDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

// User Profile component
const UserProfileButton = ({ user, onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const getProfilePictureUrl = (path) => {
    if (!path) return null;

    if (path.startsWith("http")) return path;

    if (path.includes("\\uploads\\")) {
      const uploadPath = path.split("uploads")[1];
      const formattedPath = uploadPath.replace(/\\/g, "/");
      return `${import.meta.env.VITE_BASEURL}/uploads${formattedPath}`;
    }

    return path;
  };

  const getProfilePath = () => {
    console.log("User data:", user);

    if (user?.role) {
      switch (user.role) {
        case "usher":
          return "/usher-profile";
        case "contentCreator":
          return "/content-creator-profile";
        case "company":
          return "/company-profile";
        default:
          break;
      }
    }

    // If role is not explicitly defined or is an unknown value, try to infer from user properties
    if (user) {
      // Usher typically has firstName, lastName, experience fields
      if (user.firstName && (user.experienceRole || user.experienceLevel)) {
        return "/usher-profile";
      }
      // Content Creator has specific fields
      else if (user.firstName && user.specialty) {
        return "/content-creator-profile";
      }
      // Company users have a name field but no firstName
      else if (user.name && !user.firstName) {
        return "/company-profile";
      }
    }

    // If we can't determine the type, check localStorage for role information
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        if (parsedUser && parsedUser.role) {
          switch (parsedUser.role) {
            case "usher":
              return "/usher-profile";
            case "contentCreator":
              return "/content-creator-profile";
            case "company":
              return "/company-profile";
          }
        }
      } catch (e) {
        console.error("Error parsing stored user data:", e);
      }
    }

    // Default fallback - go to login
    return "/login";
  };

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    if (onClick) onClick();
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    if (onClick) onClick();
    setMenuOpen(false);
    navigate("/login");
  };

  // Get display name based on the user model type
  const displayName = () => {
    if (!user) return "Profile";

    // For company users
    if (user.role === "company" || (!user.firstName && user.name)) {
      return (
        user.name?.charAt(0).toUpperCase() + user.name?.slice(1) || "Company"
      );
    }
    // For content creators with specialty
    else if (
      user.role === "contentCreator" ||
      (user.firstName && user.specialty)
    ) {
      return (
        `${
          user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1) ||
          ""
        } ${
          user.lastName?.charAt(0).toUpperCase() + user.lastName?.slice(1) || ""
        }`.trim() || "Creator"
      );
    }
    // For ushers
    else if (
      user.role === "usher" ||
      (user.firstName && (user.experienceRole || user.experienceLevel))
    ) {
      return (
        `${
          user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1) ||
          ""
        } ${
          user.lastName?.charAt(0).toUpperCase() + user.lastName?.slice(1) || ""
        }`.trim() || "Usher"
      );
    }
    // For users with only username
    else if (user.userName) {
      return user.userName;
    }
    // Fallback
    else {
      return "Profile";
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleProfileClick}
      >
        {user.profilePicture ? (
          <img
            src={getProfilePictureUrl(user.profilePicture)}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-black"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              const parentElement = e.target.parentElement;
              const iconElement = document.createElement("div");
              iconElement.className =
                "w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 border-2 border-black";
              iconElement.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
              parentElement.insertBefore(iconElement, e.target);
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 border-2 border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <span className="text-white font-bold">{displayName()}</span>
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => handleNavigation(getProfilePath())}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
            >
              My Profile
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

UserProfileButton.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

// Auth buttons component
const AuthButtons = ({ onClick, isMobile = false }) => {
  const baseClasses = isMobile
    ? "w-full max-w-xs px-4 py-2 text-center hover:shadow-md transition-all duration-300"
    : "px-4 py-2 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5";

  return (
    <>
      <Link
        to="/login"
        className={`${baseClasses} bg-white text-black border border-black rounded-md`}
        onClick={onClick}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`${baseClasses} bg-black text-white rounded-md`}
        onClick={onClick}
      >
        Register
      </Link>
    </>
  );
};

AuthButtons.propTypes = {
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default function Navbar({ forceAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(selectAuth);

  const [userProfile, setUserProfile] = useState(null);
  const [hasRequestedProfile, setHasRequestedProfile] = useState(false);

  const safeJSONParse = (data) => {
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON in Navbar:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("user");

        if (!token) {
          return;
        }

        let storedUser = null;
        let role = null;

        if (storedUserData) {
          try {
            storedUser = safeJSONParse(storedUserData);
            role = storedUser?.role;
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }

        if (!role && user?.role) {
          role = user.role;
        }

        if (!role) {
          role = localStorage.getItem("role");
        }

        if (!role) {
          role = "usher";
        }

        let endpoint = "";
        switch (role) {
          case "usher":
            endpoint = "/usher/profile";
            break;
          case "contentCreator":
            endpoint = "/content-creator/profile";
            break;
          case "company":
            endpoint = "/company/profile";
            break;
          default:
            endpoint = "/usher/profile";
            break;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASEURL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.profile) {
            const profileWithRole = { ...data.profile, role };
            setUserProfile(profileWithRole);

            dispatch({
              type: "auth/setUser",
              payload: profileWithRole,
            });

            localStorage.setItem("user", JSON.stringify(profileWithRole));
          }
        } else {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({ type: "auth/logout" });
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (
      (isAuthenticated || localStorage.getItem("token")) &&
      !hasRequestedProfile
    ) {
      setHasRequestedProfile(true);
      fetchUserProfile();
    }
  }, []);

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

  const getCurrentUser = () => {
    if (userProfile) return userProfile;

    if (user) return user;

    // Finally, try localStorage as a last resort
    try {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        const parsedUser = JSON.parse(storedUserData);

        // If we found a user in localStorage but Redux doesn't have it,
        // update Redux state
        if (parsedUser && !user && isAuthenticated) {
          console.log(
            "Updating Redux with user from localStorage:",
            parsedUser
          );
          setTimeout(() => {
            dispatch({ type: "auth/setUser", payload: parsedUser });
          }, 0);
        }

        return parsedUser;
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }

    // If we have authentication but no user object, create a minimal one
    if (isAuthenticated || localStorage.getItem("token")) {
      console.log("Creating fallback user object for authenticated session");
      return {
        isAuthenticated: true,
        role: localStorage.getItem("role") || "usher", // Default to usher if no role found
      };
    }

    return null;
  };

  // Enhanced function to debug authentication state
  const debugUserAuth = () => {
    const hasToken = !!localStorage.getItem("token");
    const hasUser = !!localStorage.getItem("user");
    const reduxAuth = isAuthenticated;

    console.log("Auth Debug:", {
      hasToken,
      hasUser,
      reduxAuth,
      isAuthenticated,
      userFromSelector: user,
      userFromProfile: userProfile,
      forcedAuth: forceAuth,
    });

    // If forceAuth is provided, use it to override authentication check
    if (forceAuth) {
      return true;
    }

    return reduxAuth || (hasToken && hasUser);
  };

  const currentUser = getCurrentUser();
  const isUserLoggedIn = debugUserAuth();

  return (
    <nav className="bg-[#C2A04C] py-3 px-8 w-full shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" onClick={handleLinkClick}>
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm">
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>

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
              <ExploreDropdownContent onClick={handleLinkClick} />
            )}
          </div>

          <NavLink to="/about" onClick={handleLinkClick}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={handleLinkClick}>
            Contact Us
          </NavLink>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-2">
          {isUserLoggedIn || forceAuth ? (
            <UserProfileButton
              user={currentUser || { role: "usher" }}
              onClick={handleLinkClick}
            />
          ) : (
            <AuthButtons onClick={handleLinkClick} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={handleMobileMenuToggle}
        >
          {isOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-4 bg-[#C2A04C] py-4">
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>

          <div className="text-center">
            <button
              className="text-white font-bold hover:text-[#f1e8d8] transition-colors duration-300"
              onClick={handleDropdownToggle}
            >
              Explore ▼
            </button>
            <MobileExploreDropdown
              isOpen={exploreDropdown}
              onClick={handleLinkClick}
            />
          </div>

          <NavLink to="/about" onClick={handleLinkClick}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={handleLinkClick}>
            Contact
          </NavLink>

          <div className="flex flex-col space-y-2 w-full items-center">
            {isUserLoggedIn || forceAuth ? (
              <UserProfileButton
                user={currentUser || { role: "usher" }}
                onClick={handleLinkClick}
              />
            ) : (
              <AuthButtons onClick={handleLinkClick} isMobile={true} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  forceAuth: PropTypes.bool,
};

Navbar.defaultProps = {
  forceAuth: false,
};
