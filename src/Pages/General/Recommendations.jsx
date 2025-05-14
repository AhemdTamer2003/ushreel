// Recommendations.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecommendedUshers,
  selectUshersForJob,
} from "../../redux/Services/job";
import { toast } from "react-toastify";
import Navbar from "../../components/Shared/Navbar";
import { CircularProgress } from "@mui/material";

function Recommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    jobData,
    recommendedUshers,
    recommendedUshersLoading,
    recommendedUshersError,
    selectUshersLoading,
  } = useSelector((state) => state.job);

  const [searchUsher, setSearchUsher] = useState("");
  const [selectedUshers, setSelectedUshers] = useState([]);
  const [hasRequested, setHasRequested] = useState(false);

  const jobId = location.state?.jobId || jobData?.jobId;

  useEffect(() => {
    if (jobId && !hasRequested) {
      dispatch(getRecommendedUshers(jobId));
      // setHasRequested(true);
    }
  }, [jobId, dispatch, hasRequested]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectUsher = (usherId) => {
    if (selectedUshers.includes(usherId)) {
      setSelectedUshers(selectedUshers.filter((id) => id !== usherId));
    } else {
      setSelectedUshers([...selectedUshers, usherId]);
    }
  };

  const handleNext = () => {
    if (selectedUshers.length === 0) {
      toast.error("Please select at least one usher");
      return;
    }

    dispatch(
      selectUshersForJob({
        jobId,
        selectedUshers,
      })
    );

    navigate("/company-profile", { state: { jobCreated: true } });
  };

  // Filter ushers based on search term
  const filteredUshers = recommendedUshers.filter((usher) =>
    usher.fullName.toLowerCase().includes(searchUsher.toLowerCase())
  );

  const ProfileCard = ({
    id,
    fullName,
    experienceRole,
    gender,
    profilePicture,
  }) => (
    <div
      className={`flex items-center space-x-4 p-3 border rounded-lg transition-all cursor-pointer
                ${
                  selectedUshers.includes(id)
                    ? "border-[#C2A04C] bg-[#C2A04C]/20"
                    : "border-gray-700 hover:bg-gray-700/30"
                }`}
      onClick={() => handleSelectUsher(id)}
    >
      <div className="relative">
        {selectedUshers.includes(id) && (
          <FaCheckCircle className="absolute -top-1 -right-1 text-green-500 text-lg z-10" />
        )}
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-white text-xl" />
          )}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-white">{fullName}</h3>
        <p className="text-gray-400 text-sm">{experienceRole || "Usher"}</p>
        {gender && <p className="text-gray-400 text-sm">Gender: {gender}</p>}
      </div>
    </div>
  );

  const SearchBar = ({ value, onChange }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-200 p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
        placeholder="Search ushers"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        <FaFilter className="text-gray-500 cursor-pointer" />
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  );

  if (recommendedUshersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex items-center justify-center">
        <CircularProgress sx={{ color: "#D4A537" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      <Navbar forceAuth={true} />

      <div className="container mx-auto p-8">
        <button
          onClick={handleBack}
          className="flex items-center text-[#C2A04C] mb-6 hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-black/80 rounded-lg p-6 border border-[#C2A04C]/20 mb-8">
          <h2 className="text-[#C2A04C] font-bold text-2xl mb-4">
            {jobData?.title || "Recommended Ushers"}
          </h2>
          <p className="text-gray-300 mb-6">
            Select the ushers you'd like to work with for this project.
          </p>

          <SearchBar value={searchUsher} onChange={setSearchUsher} />

          <div className="mt-6">
            <p className="text-white mb-2">
              <span className="text-[#C2A04C] font-bold">Selected:</span>{" "}
              {selectedUshers.length} ushers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUshers.length > 0 ? (
            filteredUshers.map((usher) => (
              <ProfileCard
                key={usher.id}
                id={usher.id}
                fullName={usher.fullName}
                experienceRole={usher.experienceRole}
                gender={usher.gender}
                profilePicture={usher.profilePicture}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-300">
                No ushers match your search criteria
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNext}
            disabled={selectUshersLoading || selectedUshers.length === 0}
            className={`bg-[#C2A04C] text-black px-6 py-2 rounded-full 
                      hover:bg-[#C2A04C]/80 transition-all duration-300 
                      transform hover:scale-105
                      ${
                        selectUshersLoading || selectedUshers.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
          >
            {selectUshersLoading ? "Processing..." : "Confirm Selection"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
