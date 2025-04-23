import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
  FaCalendar,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  fetchUsherProfile,
  updateUsherProfile,
  updateUsherExperience,
  uploadProfilePicture,
} from "../../redux/Services/usher";
import { clearErrors, resetUpdateStatus } from "../../redux/Slices/usherSlice";

function UsherProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, loading, error, updateStatus, updateError } = useSelector(
    (state) => state.usher
  );
  console.log(profile);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    email: "",
    gender: "",
    birthdate: "",
    experience: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your profile");
      navigate("/login");
      return;
    }
    dispatch(fetchUsherProfile());
  }, [isAuthenticated, dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setEditFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        userName: profile.userName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        gender: profile.gender || "",
        birthdate: profile.birthdate
          ? new Date(profile.birthdate).toISOString().split("T")[0]
          : "",
        experience: profile.experienceRole?.join(", ") || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
      setIsEditingExperience(false);
      dispatch(resetUpdateStatus());
    } else if (updateStatus === "failed" && updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [updateStatus, updateError, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.includes("401")) {
        toast.error("Session expired. Please log in again");
        navigate("/login");
      } else {
        toast.error(error);
      }
      dispatch(clearErrors());
    }
  }, [error, navigate, dispatch]);

  const handleProfileUpdate = () => {
    dispatch(updateUsherProfile(editFormData));
  };

  const handleExperienceUpdate = () => {
    const experienceArray = editFormData.experience
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    dispatch(updateUsherExperience(experienceArray));
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadProfilePicture(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <CircularProgress sx={{ color: "#D4A537" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      {/* Navigation Bar */}
      <nav className="bg-[#C2A04C] p-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl">UsheReel</div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-black hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-black hover:text-white transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/about"
            className="text-black hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-black font-medium">
            {profile?.firstName || "User"}
          </span>
          <div className="relative">
            <img
              src={profile?.profilePicture || "/default-profile.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
          </div>
          <button
            onClick={handleLogout}
            className="text-black hover:text-white transition-colors"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          {/* Profile Header */}
          <div className="flex items-center space-x-8 mb-8">
            <div className="relative">
              <img
                src={profile?.profilePicture || "/default-profile.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#C2A04C]"
              />
              <label className="absolute bottom-2 right-2 cursor-pointer bg-[#C2A04C] rounded-full p-2">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
                <FaEdit className="text-black" />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-[#C2A04C] text-3xl font-bold">
                {profile?.firstName} {profile?.lastName}
              </h1>
              <p className="text-gray-400">@{profile?.userName}</p>
              <p className="text-gray-400 mt-1">{profile?.email}</p>
            </div>
            <Button
              onClick={() => setIsEditingProfile(true)}
              variant="contained"
              sx={{
                backgroundColor: "#C2A04C",
                "&:hover": { backgroundColor: "#9c7c3c" },
              }}
            >
              Edit Profile
            </Button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#C2A04C]" />
                <span className="text-white">
                  {profile?.phone || "No phone number"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaUser className="text-[#C2A04C]" />
                <span className="text-white capitalize">
                  {profile?.gender || "Not specified"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCalendar className="text-[#C2A04C]" />
                <span className="text-white">
                  {formatDate(profile?.birthdate) || "Not specified"}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#C2A04C] text-xl font-bold flex items-center justify-between">
                Experience Roles
                <button
                  onClick={() => setIsEditingExperience(true)}
                  className="text-sm hover:text-[#9c7c3c]"
                >
                  <FaEdit />
                </button>
              </h3>
              <div className="text-white">
                {profile?.experienceRole &&
                profile.experienceRole.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {profile.experienceRole.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                ) : (
                  "No experience roles added"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        open={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-4">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={editFormData.userName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editFormData.phone}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              variant="outlined"
              disabled
            />
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={editFormData.gender}
              onChange={handleInputChange}
              variant="outlined"
              select
              SelectProps={{ native: true }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            <TextField
              fullWidth
              label="Birthdate"
              name="birthdate"
              type="date"
              value={editFormData.birthdate}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditingProfile(false)}>Cancel</Button>
          <Button
            onClick={handleProfileUpdate}
            variant="contained"
            sx={{
              backgroundColor: "#C2A04C",
              "&:hover": { backgroundColor: "#9c7c3c" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Experience Dialog */}
      <Dialog
        open={isEditingExperience}
        onClose={() => setIsEditingExperience(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Experience Roles</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Experience Roles"
            name="experience"
            value={editFormData.experience}
            onChange={handleInputChange}
            className="mt-4"
            placeholder="Enter your experience roles (comma-separated)"
            helperText="Enter multiple roles separated by commas (e.g., 'Security, Event Management, Crowd Control')"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditingExperience(false)}>Cancel</Button>
          <Button
            onClick={handleExperienceUpdate}
            variant="contained"
            sx={{
              backgroundColor: "#C2A04C",
              "&:hover": { backgroundColor: "#9c7c3c" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsherProfile;
