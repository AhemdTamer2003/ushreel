import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEdit, FaUser, FaBriefcase } from "react-icons/fa";
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
  fetchContentCreatorProfile,
  updateContentCreatorProfile,
  uploadContentCreatorProfilePicture,
  acceptContentOffer,
  declineContentOffer,
} from "../../redux/Services/contentCreator";
import {
  clearErrors,
  resetUpdateStatus,
} from "../../redux/Slices/contentCreatorSlice";
import Navbar from "../../components/Shared/Navbar";

function ContentCreatorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, loading, error, updateStatus, updateError } = useSelector(
    (state) => state.contentCreator
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    fieldOfWork: "",
    portfolioLinks: [],
  });

  const hasRequestedProfile = useRef(false);

  // Authentication check and profile fetch - runs only once
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your profile");
      navigate("/login");
      return;
    }

    // Only fetch if we haven't requested yet
    if (!hasRequestedProfile.current) {
      console.log("Fetching content creator profile...");
      hasRequestedProfile.current = true;
      dispatch(fetchContentCreatorProfile());
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Update form data when profile loads - runs only when profile changes
  useEffect(() => {
    if (profile) {
      setEditFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        gender: profile.gender || "",
        fieldOfWork: profile.fieldOfWork || "",
        portfolioLinks: profile.portfolioLinks || [],
      });
    }
  }, [profile]);

  // Handle update status changes
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
      dispatch(resetUpdateStatus());
    } else if (updateStatus === "failed" && updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [updateStatus, updateError, dispatch]);

  // Handle errors
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

  // Reset the request flag when component unmounts
  useEffect(() => {
    return () => {
      hasRequestedProfile.current = false;
    };
  }, []);

  const handleProfileUpdate = () => {
    dispatch(updateContentCreatorProfile(editFormData));
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadContentCreatorProfilePicture(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAcceptOffer = (offerId) => {
    dispatch(acceptContentOffer(offerId))
      .unwrap()
      .then(() => {
        toast.success("Offer accepted successfully!");
        // Refresh profile to get updated job lists
        dispatch(fetchContentCreatorProfile());
      })
      .catch((error) => {
        toast.error(error || "Failed to accept offer");
      });
  };

  const handleDeclineOffer = (offerId) => {
    dispatch(declineContentOffer(offerId))
      .unwrap()
      .then(() => {
        toast.success("Offer declined successfully!");
        // Refresh profile to get updated job lists
        dispatch(fetchContentCreatorProfile());
      })
      .catch((error) => {
        toast.error(error || "Failed to decline offer");
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
                src={getProfilePictureUrl(profile?.profilePicture)}
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
                <FaBriefcase className="text-[#C2A04C]" />
                <span className="text-white">
                  {profile?.fieldOfWork || "Not specified"}
                </span>
              </div>

              {/* Portfolio Links */}
              {profile?.portfolioLinks && profile.portfolioLinks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-[#C2A04C] text-xl font-bold mb-3">
                    Portfolio Links
                  </h3>
                  <div className="space-y-2">
                    {profile.portfolioLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:text-blue-300 break-all"
                      >
                        🔗 {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Job Offers */}
              <div className="mt-8">
                <h3 className="text-[#C2A04C] text-xl font-bold mb-3">
                  Available Job Offers ({profile?.availableOffers?.length || 0})
                </h3>
                <div className="space-y-3">
                  {profile?.availableOffers?.length > 0 ? (
                    profile.availableOffers.map((offer, index) => (
                      <div
                        key={index}
                        className="bg-black/30 p-4 rounded border border-[#C2A04C]/30"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">
                            {offer.jobTitle}
                          </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {offer.companyName}
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                          📍 {offer.location}
                        </p>
                        <p className="text-gray-400 text-sm mb-3">
                          📅 {new Date(offer.startDate).toLocaleDateString()} -{" "}
                          {new Date(offer.endDate).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAcceptOffer(offer.offerId)}
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              "&:hover": { backgroundColor: "#45a049" },
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleDeclineOffer(offer.offerId)}
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#f44336",
                              borderColor: "#f44336",
                              "&:hover": {
                                borderColor: "#d32f2f",
                                color: "#d32f2f",
                              },
                            }}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No job offers available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Upcoming Jobs */}
              <div>
                <h3 className="text-[#C2A04C] text-xl font-bold mb-3">
                  Upcoming Jobs ({profile?.upcomingJobs?.length || 0})
                </h3>
                <div className="space-y-3">
                  {profile?.upcomingJobs?.length > 0 ? (
                    profile.upcomingJobs.map((job, index) => (
                      <div
                        key={index}
                        className="bg-black/30 p-4 rounded border border-green-500/30"
                      >
                        <h4 className="text-white font-semibold mb-2">
                          {job.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          📍 {job.location}
                        </p>
                        <p className="text-gray-400 text-sm">
                          📅 {new Date(job.startDate).toLocaleDateString()} -{" "}
                          {new Date(job.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          🕐 {job.startTime} - {job.endTime}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No upcoming jobs</p>
                  )}
                </div>
              </div>

              {/* Past Jobs */}
              <div>
                <h3 className="text-[#C2A04C] text-xl font-bold mb-3">
                  Past Jobs ({profile?.pastJobs?.length || 0})
                </h3>
                <div className="space-y-3">
                  {profile?.pastJobs?.length > 0 ? (
                    profile.pastJobs.map((job, index) => (
                      <div
                        key={index}
                        className="bg-black/30 p-4 rounded border border-gray-500/30"
                      >
                        <h4 className="text-gray-300 font-semibold mb-2">
                          {job.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          📍 {job.location}
                        </p>
                        <p className="text-gray-400 text-sm">
                          📅 {new Date(job.startDate).toLocaleDateString()} -{" "}
                          {new Date(job.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          🕐 {job.startTime} - {job.endTime}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No past jobs</p>
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
            />
            <TextField
              fullWidth
              label="Field of Work"
              name="fieldOfWork"
              value={editFormData.fieldOfWork}
              onChange={handleInputChange}
              variant="outlined"
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
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContentCreatorProfile;
