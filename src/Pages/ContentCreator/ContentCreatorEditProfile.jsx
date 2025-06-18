import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaInstagram, FaFacebook, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContentCreatorProfile,
  uploadContentCreatorProfilePicture,
} from "../../redux/Services/contentCreator";
import { toast } from "react-toastify";

function ContentCreatorEditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, updateStatus, updateError } = useSelector(
    (state) => state.contentCreator
  );

  const [formData, setFormData] = useState({
    phone: profile?.phone || "",
    fieldOfWork: profile?.fieldOfWork || [],
    portfolioLinks: {
      facebook: profile?.portfolioLinks?.facebook || "",
      instagram: profile?.portfolioLinks?.instagram || "",
      youtube: profile?.portfolioLinks?.youtube || "",
      tiktok: profile?.portfolioLinks?.tiktok || "",
      website: profile?.portfolioLinks?.website || "",
    },
  });

  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateSocialLinks = (links) => {
    const errors = {};

    if (
      links.facebook &&
      !links.facebook.match(/^https?:\/\/(www\.)?facebook\.com\/.*$/)
    ) {
      errors.facebook =
        "Must be a valid Facebook profile URL (e.g., https://facebook.com/username)";
    }

    if (
      links.instagram &&
      !links.instagram.match(/^https?:\/\/(www\.)?instagram\.com\/.*$/)
    ) {
      errors.instagram =
        "Must be a valid Instagram profile URL (e.g., https://instagram.com/username)";
    }

    return errors;
  };

  useEffect(() => {
    if (!profile) {
      navigate("/content-creator-profile");
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully");
      navigate("/content-creator-profile");
    }
  }, [updateStatus, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      const newFormData = {
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      };

      if (parent === "portfolioLinks") {
        setValidationErrors((prev) => ({
          ...prev,
          [child]: "",
        }));
      }

      setFormData(newFormData);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setIsDirty(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(uploadContentCreatorProfilePicture(file)).unwrap();
        toast.success("Profile picture updated successfully");
      } catch (error) {
        toast.error(error || "Failed to upload profile picture");
      }
    }
  };

  const handleSaveChanges = async () => {
    const linkErrors = validateSocialLinks(formData.portfolioLinks);

    if (Object.keys(linkErrors).length > 0) {
      setValidationErrors(linkErrors);
      Object.values(linkErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      await dispatch(updateContentCreatorProfile(formData)).unwrap();
    } catch (error) {
      toast.error(error || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate("/content-creator-profile");
      }
    } else {
      navigate("/content-creator-profile");
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleCancel}
          className="flex items-center text-[#C2A04C] mb-6 hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Profile
        </button>

        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          <h2 className="text-[#C2A04C] text-2xl font-bold mb-6">
            Edit Profile
          </h2>

          {/* Profile Picture Section */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#C2A04C]"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-[#C2A04C] p-2 rounded-full cursor-pointer hover:bg-[#C2A04C]/80 transition-colors"
              >
                <FaCamera className="text-black" />
              </label>
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[#C2A04C] block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white border border-[#C2A04C]/20 rounded-lg p-2 focus:outline-none focus:border-[#C2A04C]"
              />
            </div>

            <div>
              <label className="text-[#C2A04C] block mb-2">Field of Work</label>
              <select
                name="fieldOfWork"
                value={formData.fieldOfWork}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white border border-[#C2A04C]/20 rounded-lg p-2 focus:outline-none focus:border-[#C2A04C]"
                multiple
              >
                <option value="Writing">Writing</option>
                <option value="Reel Maker">Reel Maker</option>
                <option value="Video Editor">Video Editor</option>
                <option value="Photographer">Photographer</option>
              </select>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 mb-6">
            <h3 className="text-[#C2A04C] text-xl font-bold">
              Social Media Links
            </h3>

            <div>
              <label className="text-[#C2A04C] block mb-2">
                <FaFacebook className="inline mr-2" /> Facebook
              </label>
              <input
                type="url"
                name="portfolioLinks.facebook"
                value={formData.portfolioLinks.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/your-profile"
                className={`w-full bg-gray-800 text-white border ${
                  validationErrors.facebook
                    ? "border-red-500"
                    : "border-[#C2A04C]/20"
                } rounded-lg p-2 focus:outline-none focus:border-[#C2A04C]`}
              />
              {validationErrors.facebook && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.facebook}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#C2A04C] block mb-2">
                <FaInstagram className="inline mr-2" /> Instagram
              </label>
              <input
                type="url"
                name="portfolioLinks.instagram"
                value={formData.portfolioLinks.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/your-profile"
                className={`w-full bg-gray-800 text-white border ${
                  validationErrors.instagram
                    ? "border-red-500"
                    : "border-[#C2A04C]/20"
                } rounded-lg p-2 focus:outline-none focus:border-[#C2A04C]`}
              />
              {validationErrors.instagram && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.instagram}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#C2A04C] block mb-2">Website</label>
              <input
                type="url"
                name="portfolioLinks.website"
                value={formData.portfolioLinks.website}
                onChange={handleInputChange}
                placeholder="https://your-website.com"
                className="w-full bg-gray-800 text-white border border-[#C2A04C]/20 rounded-lg p-2 focus:outline-none focus:border-[#C2A04C]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={updateStatus === "loading" || !isDirty}
              className={`px-6 py-2 bg-[#C2A04C] text-black rounded-full 
                ${
                  updateStatus === "loading" || !isDirty
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#C2A04C]/80 transition-colors"
                }`}
            >
              {updateStatus === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCreatorEditProfile;
