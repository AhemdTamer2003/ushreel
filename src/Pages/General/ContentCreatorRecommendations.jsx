import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecommendedContentCreators,
  selectContentCreatorsForJob,
} from "../../redux/Services/job";
import { toast } from "react-toastify";
import Navbar from "../../components/Shared/Navbar";
import { CircularProgress } from "@mui/material";

function ContentCreatorRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    recommendedContentCreators,
    recommendedContentCreatorsLoading,
    recommendedContentCreatorsError,
    selectContentCreatorsLoading,
  } = useSelector((state) => state.job);

  const [searchCreator, setSearchCreator] = useState("");
  const [selectedContentCreators, setSelectedContentCreators] = useState([]);
  const [hasRequested, setHasRequested] = useState(false);

  const jobId = location.state?.jobId;
  const recommendations = location.state?.recommendations;

  useEffect(() => {
    if (jobId && !hasRequested) {
      dispatch(getRecommendedContentCreators(jobId));
      setHasRequested(true);
    }
  }, [jobId, dispatch, hasRequested]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectCreator = (creatorId) => {
    if (selectedContentCreators.includes(creatorId)) {
      setSelectedContentCreators(
        selectedContentCreators.filter((id) => id !== creatorId)
      );
    } else {
      setSelectedContentCreators([...selectedContentCreators, creatorId]);
    }
  };

  const handleNext = () => {
    if (selectedContentCreators.length === 0) {
      toast.error("Please select at least one content creator");
      return;
    }

    dispatch(
      selectContentCreatorsForJob({
        jobId,
        selectedContentCreators,
      })
    ).then((action) => {
      if (action.payload) {
        toast.success("Content creators selected successfully!");
        navigate("/company-profile", { state: { jobCreated: true } });
      }
    });
  };

  // Flatten recommendations object to array for filtering
  const allCreators = recommendedContentCreators
    ? Object.values(recommendedContentCreators).flat()
    : [];

  const filteredCreators = allCreators.filter((creator) =>
    creator.fullName.toLowerCase().includes(searchCreator.toLowerCase())
  );

  const ProfileCard = ({
    id,
    fullName,
    fieldOfWork,
    gender,
    profilePicture,
  }) => (
    <div
      className={`flex items-center space-x-4 p-3 border rounded-lg transition-all cursor-pointer
                ${
                  selectedContentCreators.includes(id)
                    ? "border-[#C2A04C] bg-[#C2A04C]/20"
                    : "border-gray-700 hover:bg-gray-700/30"
                }`}
      onClick={() => handleSelectCreator(id)}
    >
      <div className="relative">
        {selectedContentCreators.includes(id) && (
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
        <p className="text-gray-400 text-sm">
          {fieldOfWork || "Content Creator"}
        </p>
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
        placeholder="Search content creators"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        <FaFilter className="text-gray-500 cursor-pointer" />
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  );

  if (recommendedContentCreatorsLoading) {
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
            Recommended Content Creators
          </h2>
          <p className="text-gray-300 mb-6">
            Select the content creators you'd like to work with for this
            project.
          </p>

          <SearchBar value={searchCreator} onChange={setSearchCreator} />

          <div className="mt-6">
            <p className="text-white mb-2">
              <span className="text-[#C2A04C] font-bold">Selected:</span>{" "}
              {selectedContentCreators.length} content creators
            </p>
          </div>
        </div>

        {/* Group creators by field of work */}
        {recommendedContentCreators &&
        Object.keys(recommendedContentCreators).length > 0 ? (
          Object.entries(recommendedContentCreators).map(
            ([fieldOfWork, creators]) => (
              <div key={fieldOfWork} className="mb-8">
                <h3 className="text-[#C2A04C] text-xl font-bold mb-4 capitalize">
                  {fieldOfWork.replace(/([A-Z])/g, " $1").trim()}s
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creators
                    .filter((creator) =>
                      creator.fullName
                        .toLowerCase()
                        .includes(searchCreator.toLowerCase())
                    )
                    .map((creator) => (
                      <ProfileCard
                        key={creator._id}
                        id={creator._id}
                        fullName={creator.fullName}
                        fieldOfWork={creator.fieldOfWork}
                        gender={creator.gender}
                        profilePicture={creator.profilePicture}
                      />
                    ))}
                </div>
              </div>
            )
          )
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-300">
              No content creators available for this job
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNext}
            disabled={
              selectContentCreatorsLoading ||
              selectedContentCreators.length === 0
            }
            className={`bg-[#C2A04C] text-black px-6 py-2 rounded-full 
                      hover:bg-[#C2A04C]/80 transition-all duration-300 
                      transform hover:scale-105
                      ${
                        selectContentCreatorsLoading ||
                        selectedContentCreators.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
          >
            {selectContentCreatorsLoading
              ? "Processing..."
              : "Confirm Selection"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentCreatorRecommendations;
