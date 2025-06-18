import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchCompanyProfile,
  updateCompanyProfile,
} from "../../redux/Services/company";
import {
  clearErrors,
  resetUpdateStatus,
} from "../../redux/Slices/companySlice";
import CompanyEditProfileDialog from "./CompanyEditProfileDialog";
import { CircularProgress } from "@mui/material";
import Navbar from "../../components/Shared/Navbar";

function CompanyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get company state from Redux
  const { profile, loading, error, updateStatus, updateError } = useSelector(
    (state) => state.company
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
    marketingPreference: "",
    activeProjects: [],
    completedProjects: [],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your profile");
      navigate("/login");
      return;
    }
    dispatch(fetchCompanyProfile());
  }, [isAuthenticated, dispatch, navigate]);

  // Update local state when profile data is fetched
  useEffect(() => {
    if (profile) {
      setCompanyData({
        ...companyData,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        profilePicture: profile.profilePicture || "",
        activeProjects:
          profile.inProgressProjects?.map((project) => ({
            id: project._id,
            title: project.title,
            type: project.type || "",
            status: "Active",
            participants: project.participants || 0,
          })) || [],
        completedProjects:
          profile.previousProjects?.map((project) => ({
            id: project._id,
            title: project.title,
            type: project.type || "",
            status: "Completed",
            rating: "",
          })) || [],
      });
    }
  }, [profile]);

  // Handle update status changes
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully");
      setIsEditDialogOpen(false);
      dispatch(resetUpdateStatus());
    } else if (updateStatus === "failed" && updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [updateStatus, updateError, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      if (
        error.includes("401") ||
        error.includes("403") ||
        error.includes("Invalid token")
      ) {
        toast.error("Session expired. Please log in again");
        navigate("/login");
      } else {
        toast.error(error);
      }
      dispatch(clearErrors());
    }
  }, [error, navigate, dispatch]);

  const handleMarketingPreferenceSelect = (preference) => {
    setCompanyData((prev) => ({
      ...prev,
      marketingPreference: preference,
    }));

    navigate("/form-description", {
      state: {
        type: preference,
        companyData: companyData,
      },
    });
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    // Filter only allowed fields before sending to API
    const updatedProfileData = {
      name: updatedData.name,
      phone: updatedData.phone,
      address: updatedData.address,
    };

    dispatch(updateCompanyProfile(updatedProfileData));
  };

  const handleViewProject = (projectId) => {
    navigate(`/job-details/${projectId}`);
  };

  // Function to format the profile picture URL
  const getProfilePictureUrl = (path) => {
    if (!path) return "";

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
      {/* Navigation Bar */}
      <Navbar forceAuth={true} />

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Profile Card */}
        <div
          className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                      transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
        >
          <div className="flex flex-col items-center">
            {companyData.profilePicture ? (
              <img
                src={getProfilePictureUrl(companyData.profilePicture)}
                alt="Company Logo"
                className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C]
                       transform transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  const parentElement = e.target.parentElement;
                  const iconElement = document.createElement("div");
                  iconElement.className =
                    "w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C] flex items-center justify-center bg-gray-800";
                  iconElement.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#C2A04C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>';
                  parentElement.insertBefore(iconElement, e.target);
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C] flex items-center justify-center bg-gray-800">
                <FaBuilding className="h-16 w-16 text-[#C2A04C]" />
              </div>
            )}
            <h2 className="text-[#C2A04C] text-2xl font-bold mb-2">
              {companyData.name}
            </h2>
            {profile?._id && (
              <p className="text-gray-400 text-sm mb-4">
                #{profile._id.substring(0, 8)}
              </p>
            )}

            <div className="w-full space-y-3">
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaEnvelope className="text-[#C2A04C] mr-2" />
                <span>{companyData.email}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaPhone className="text-[#C2A04C] mr-2" />
                <span>{companyData.phone}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaMapMarkerAlt className="text-[#C2A04C] mr-2" />
                <span>{companyData.address}</span>
              </div>
            </div>

            <button
              onClick={handleEditClick}
              className="mt-6 bg-[#C2A04C] text-black px-6 py-2 rounded-full 
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105 hover:shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Marketing Preference Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-6">
              Select what you need
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div
                onClick={() => handleMarketingPreferenceSelect("online")}
                className={`cursor-pointer p-6 rounded-lg border-2 
                          ${
                            companyData.marketingPreference === "online"
                              ? "border-[#C2A04C] bg-[#C2A04C]/20"
                              : "border-gray-600 hover:border-[#C2A04C]/50"
                          }
                          transition-all duration-300 transform hover:scale-105`}
              >
                <h4 className="text-[#C2A04C] text-lg font-bold mb-2">
                  Content Creator
                </h4>
                <p className="text-gray-300">Online Marketing</p>
              </div>

              <div
                onClick={() => handleMarketingPreferenceSelect("offline")}
                className={`cursor-pointer p-6 rounded-lg border-2 
                          ${
                            companyData.marketingPreference === "offline"
                              ? "border-[#C2A04C] bg-[#C2A04C]/20"
                              : "border-gray-600 hover:border-[#C2A04C]/50"
                          }
                          transition-all duration-300 transform hover:scale-105`}
              >
                <h4 className="text-[#C2A04C] text-lg font-bold mb-2">Usher</h4>
                <p className="text-gray-300">Offline Marketing</p>
              </div>
            </div>
          </div>

          {/* Active Projects Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">
              Active Projects
            </h3>
            <div className="space-y-4">
              {companyData.activeProjects &&
              companyData.activeProjects.length > 0 ? (
                companyData.activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-black/40 p-4 rounded-lg border border-[#C2A04C]/20
                                transform transition-all duration-300 hover:border-[#C2A04C]"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-[#C2A04C] font-bold">
                        {project.title}
                      </h4>
                      <span className="text-green-400">{project.status}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-gray-300">
                      <span>Type: {project.type}</span>
                      <span>Participants: {project.participants}</span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleViewProject(project.id)}
                        className="bg-[#C2A04C] text-black px-4 py-2 rounded-full text-sm font-medium
                                   hover:bg-[#C2A04C]/80 transition-all duration-300
                                   transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No active projects available</p>
              )}
            </div>
          </div>

          {/* Completed Projects Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">
              Completed Projects
            </h3>
            <div className="space-y-4">
              {companyData.completedProjects &&
              companyData.completedProjects.length > 0 ? (
                companyData.completedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-black/40 p-4 rounded-lg border border-[#C2A04C]/20
                                transform transition-all duration-300 hover:border-[#C2A04C]"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-[#C2A04C] font-bold">
                        {project.title}
                      </h4>
                      <span className="text-gray-400">{project.status}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-gray-300">
                      <span>Type: {project.type}</span>
                      <span>{project.rating}</span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleViewProject(project.id)}
                        className="bg-[#C2A04C] text-black px-4 py-2 rounded-full text-sm font-medium
                                   hover:bg-[#C2A04C]/80 transition-all duration-300
                                   transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No completed projects available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <CompanyEditProfileDialog
        open={isEditDialogOpen}
        handleClose={handleCloseDialog}
        companyData={{
          name: companyData.name,
          email: companyData.email,
          phone: companyData.phone,
          address: companyData.address,
          profilePicture: companyData.profilePicture,
        }}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default CompanyProfile;
