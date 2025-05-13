import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEdit, FaCalendar, FaUser, FaRobot } from "react-icons/fa";
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
import {
  clearErrors,
  resetUpdateStatus,
  setLastFetched,
} from "../../redux/Slices/usherSlice";
import Navbar from "../../components/Shared/Navbar";

function UsherProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, loading, error, updateStatus, updateError, lastFetched } =
    useSelector((state) => state.usher);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const authUser = useSelector((state) => state.auth.user);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
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

  // Prevent excessive profile requests by using a ref to track if we've already fetched
  const hasRequestedProfile = useRef(false);

  // Debug logging with reduced frequency
  const logCounter = useRef(0);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your profile");
      navigate("/login");
      return;
    }

    // Calculate if we should fetch based on:
    // 1. We haven't fetched in this session (hasRequestedProfile is false)
    // 2. We don't have profile data yet
    // 3. The last fetch was more than 5 minutes ago
    const shouldFetch =
      (!hasRequestedProfile.current && !profile) ||
      (!profile && lastFetched === null) ||
      (lastFetched && Date.now() - lastFetched > 5 * 60 * 1000);

    if (shouldFetch) {
      console.log("Fetching usher profile...");
      hasRequestedProfile.current = true;
      dispatch(fetchUsherProfile());
    } else if (!hasRequestedProfile.current) {
      // Mark as requested even if we didn't fetch
      hasRequestedProfile.current = true;
      console.log("Using cached profile data");
      // Update the lastFetched timestamp to prevent unnecessary refetches
      if (profile && !lastFetched) {
        dispatch(setLastFetched(Date.now()));
      }
    }
  }, [isAuthenticated, dispatch, navigate, profile, lastFetched]);

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
        experience: profile.experience || "",
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

  useEffect(() => {
    // Only log occasionally to reduce console spam
    if (logCounter.current % 5 === 0) {
      console.log("Auth state:", {
        isAuthenticated,
        profileLoaded: !!profile,
        authUserLoaded: !!authUser,
        localStorageToken: !!localStorage.getItem("token"),
        localStorageUser: !!localStorage.getItem("user"),
        fetchCount: logCounter.current,
      });
    }

    logCounter.current++;

    // Only try to fix auth state if token exists but not authenticated
    if (!isAuthenticated && localStorage.getItem("token")) {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          dispatch({ type: "auth/setUser", payload: parsedUser });
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, [isAuthenticated, authUser, dispatch]);

  // Add cleanup for hasRequestedProfile when component unmounts
  useEffect(() => {
    // Reset the request flag when component unmounts
    return () => {
      hasRequestedProfile.current = false;
    };
  }, []);

  const handleProfileUpdate = () => {
    dispatch(updateUsherProfile(editFormData));
  };

  const handleExperienceUpdate = () => {
    setAiProcessing(true);
    dispatch(updateUsherExperience(editFormData.experience))
      .unwrap()
      .then((response) => {
        if (response.profile) {
          if (
            response.profile.experienceLevel ||
            (response.profile.experienceRole &&
              response.profile.experienceRole.length > 0)
          ) {
            let message = "Experience updated successfully. ";
            message += `AI detected your level as: ${
              response.profile.experienceLevel || "Unknown"
            }. `;

            if (
              response.profile.experienceRole &&
              response.profile.experienceRole.length > 0
            ) {
              message +=
                "Your detected roles are: " +
                response.profile.experienceRole.join(", ");
            }

            toast.info(message, { autoClose: 8000 });
          } else {
            toast.success("Experience updated successfully");
          }
          setIsEditingExperience(false);
        }
        setAiProcessing(false);
      })
      .catch((error) => {
        toast.error(error || "Failed to update experience");
        setAiProcessing(false);
      });
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to format the profile picture URL
  const getProfilePictureUrl = (path) => {
    if (!path) return "/default-profile.jpg";

    // If path is a full URL, return it
    if (path.startsWith("http")) return path;

    // If path is a server-side file path (starts with C:\ or similar), convert to URL
    if (path.includes("\\uploads\\")) {
      // Extract the part of the path after "uploads"
      const uploadPath = path.split("uploads")[1];
      // Replace backslashes with forward slashes
      const formattedPath = uploadPath.replace(/\\/g, "/");
      // Return the formatted URL
      return `${import.meta.env.VITE_BASEURL}/uploads${formattedPath}`;
    }

    // If it's a relative path, just return it
    return path;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <CircularProgress sx={{ color: "#D4A537" }} />
      </div>
    );
  }

  // Debug profile picture path
  console.log("Profile picture path:", profile?.profilePicture);
  const profilePicUrl = getProfilePictureUrl(profile?.profilePicture);
  console.log("Formatted profile picture URL:", profilePicUrl);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      {/* Use shared Navbar component with forced auth */}
      <Navbar forceAuth={true} />

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          {/* Profile Header */}
          <div className="flex items-center space-x-8 mb-8">
            <div className="relative">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#C2A04C]"
                onError={(e) => {
                  console.error("Error loading profile image:", e);
                  e.target.src = "/default-profile.jpg";
                }}
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

              {/* Experience Section */}
              <div className="mt-8">
                <h3 className="text-[#C2A04C] text-xl font-bold flex items-center justify-between mb-3">
                  My Experience
                  <div className="flex items-center gap-3">
                    {aiProcessing && (
                      <div className="flex items-center text-[#C2A04C] animate-pulse">
                        <FaRobot className="mr-1" />
                        <span className="text-sm">AI analyzing...</span>
                      </div>
                    )}
                    <button
                      onClick={() => setIsEditingExperience(true)}
                      className="text-sm hover:text-[#9c7c3c]"
                      title="Edit your experience"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </h3>
                <div className="bg-black/30 p-3 rounded border border-[#C2A04C]/30">
                  <p className="text-white">
                    {profile?.experience || "No experience added yet"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {/* AI-Detected Experience Level */}
              <div>
                <h3 className="text-[#C2A04C] text-xl font-bold mb-2">
                  Experience Level
                </h3>
                <div className="bg-black/30 p-3 rounded border border-[#C2A04C]/30">
                  {profile?.experienceLevel ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-[#C2A04C] text-black px-3 py-1 rounded-full text-sm font-medium">
                        {profile.experienceLevel}
                      </span>
                      <span className="text-gray-400 text-sm">
                        (AI detected)
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-400">Not yet determined</p>
                  )}
                </div>
              </div>

              {/* AI-Detected Experience Roles */}
              <div>
                <h3 className="text-[#C2A04C] text-xl font-bold mb-2">
                  Experience Roles
                </h3>
                <div className="bg-black/30 p-3 rounded border border-[#C2A04C]/30">
                  {profile?.experienceRole &&
                  profile.experienceRole.length > 0 ? (
                    <div className="space-y-2">
                      {profile.experienceRole.map((role, index) => (
                        <div
                          key={index}
                          className="bg-[#C2A04C]/20 px-3 py-2 rounded flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#C2A04C]"></div>
                          <span className="text-white">{role}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No experience roles detected yet. Update your experience
                      description to get AI-based role suggestions.
                    </p>
                  )}
                </div>
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
          <div className="gap-4 flex flex-col mt-4">
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
        <DialogTitle>Edit Experience</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Experience"
            name="experience"
            value={editFormData.experience}
            onChange={handleInputChange}
            className="mt-4"
            placeholder="Describe your experience..."
            helperText="Describe your experience in detail. The system will analyze it to determine your roles."
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
