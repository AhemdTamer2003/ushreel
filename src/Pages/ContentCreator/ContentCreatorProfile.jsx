import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaCamera,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentCreatorProfile } from "../../redux/Services/contentCreator";
import { toast } from "react-toastify";

function ContentCreatorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector(
    (state) => state.contentCreator
  );

  useEffect(() => {
    dispatch(fetchContentCreatorProfile())
      .unwrap()
      .catch((error) => {
        toast.error(error || "Failed to fetch profile");
      });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEditClick = () => {
    navigate("/content-creator-edit", { state: { profileData: profile } });
  };

  const handleAcceptOffer = () => {
    toast.info("Offer acceptance will be implemented");
  };

  const handleDeclineOffer = () => {
    toast.info("Offer decline will be implemented");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex items-center justify-center">
        <div className="text-[#C2A04C] text-xl">Loading profile...</div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex items-center justify-center">
        <div className="text-[#C2A04C] text-xl">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
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
        <div className="flex items-center space-x-2">
          <span className="text-black">{profile.name}</span>
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-black"
          />
        </div>
      </nav>

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div
          className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                      transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
        >
          <div className="flex flex-col items-center">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-[#C2A04C]
                       transform transition-all duration-300 hover:scale-105"
            />
            <h2 className="text-[#C2A04C] text-2xl font-bold mb-2">
              {profile.name}
            </h2>
            <p className="text-gray-400 text-sm mb-4">#{profile.id}</p>

            <div className="w-full space-y-3">
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaEnvelope className="text-[#C2A04C] mr-2" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaPhone className="text-[#C2A04C] mr-2" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaMapMarkerAlt className="text-[#C2A04C] mr-2" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaUser className="text-[#C2A04C] mr-2" />
                <span>{profile.gender}</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#C2A04C] transition-colors duration-300">
                <FaCamera className="text-[#C2A04C] mr-2" />
                <span>{profile.specialty}</span>
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
          {/* Photos Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profile.photos?.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border border-[#C2A04C]/20
                           transform transition-all duration-300 hover:scale-105 hover:border-[#C2A04C]"
                />
              ))}
            </div>
          </div>

          {/* Offers Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">Offers</h3>
            <div className="space-y-4">
              {profile.offers?.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#C2A04C] p-4 rounded-lg
                              transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-black font-semibold">{offer.company}</p>
                    {offer.status && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          offer.status === "accepted"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {offer.status.charAt(0).toUpperCase() +
                          offer.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <p className="text-black mb-3">{offer.message}</p>
                  {!offer.status && (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleDeclineOffer()}
                        className="bg-black text-red-500 px-4 py-2 rounded-full
                                 hover:bg-black/80 transition-all duration-300
                                 transform hover:scale-105"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptOffer()}
                        className="bg-black text-green-500 px-4 py-2 rounded-full
                                 hover:bg-black/80 transition-all duration-300
                                 transform hover:scale-105"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">
              Experiences
            </h3>
            <div className="space-y-4">
              {profile.experiences?.map((exp) => (
                <div
                  key={exp.id}
                  className="text-gray-300 p-3 rounded-lg hover:bg-black/40
                              transform transition-all duration-300"
                >
                  <p>
                    {exp.id} - {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Links Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">
              Platform Links
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 hover:text-[#C2A04C] transition-colors duration-300">
                <FaInstagram className="text-[#C2A04C] text-xl" />
                <a
                  href={profile.portfolioLinks?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300"
                >
                  {profile.portfolioLinks?.instagram}
                </a>
              </div>
              <div className="flex items-center space-x-4 hover:text-[#C2A04C] transition-colors duration-300">
                <FaFacebook className="text-[#C2A04C] text-xl" />
                <a
                  href={profile.portfolioLinks?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300"
                >
                  {profile.portfolioLinks?.facebook}
                </a>
              </div>
              <div className="flex items-center space-x-4 hover:text-[#C2A04C] transition-colors duration-300">
                <FaGlobe className="text-[#C2A04C] text-xl" />
                <a
                  href={profile.portfolioLinks?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300"
                >
                  {profile.portfolioLinks?.website}
                </a>
              </div>
            </div>
          </div>

          {/* Companies Opinions Section */}
          <div
            className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20
                         transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]"
          >
            <h3 className="text-[#C2A04C] text-xl font-bold mb-4">
              Companies opinions
            </h3>
            <div className="space-y-4">
              {profile.companyOpinions?.map((opinion, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-gray-300 p-3 rounded-lg
                              hover:bg-black/40 transition-all duration-300"
                >
                  <span>{opinion.company}</span>
                  <span>{opinion.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCreatorProfile;
