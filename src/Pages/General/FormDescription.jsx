import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createJob, createContentJob } from "../../redux/Services/job";
import { toast } from "react-toastify";
import Navbar from "../../components/Shared/Navbar";

function FormDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { createJobLoading, createJobError } = useSelector(
    (state) => state.job
  );

  const marketingType = location.state?.type || "offline";

  const [formData, setFormData] = useState({
    title: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    location: "",
    description: "",
    totalUshers: "",
    salaryPerUsher: "",
    selectedUsherTypes: {
      sales: false,
      activation: false,
      registration: false,
      crowdManagement: false,
    },
    creatorRoleCounts: {
      reelMaker: "",
      photographer: "",
      videoEditor: "",
    },
    gender: "",
  });

  useEffect(() => {
    if (createJobError) {
      toast.error(createJobError);
    }
  }, [createJobError]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateFrom" || name === "dateTo") {
      if (value && !validateDate(value)) {
        toast.error("Please select a date between today and 2 years from now");
        return;
      }

      if (name === "dateTo" && formData.dateFrom && value) {
        const fromDate = new Date(formData.dateFrom);
        const toDate = new Date(value);
        if (toDate < fromDate) {
          toast.error("End date cannot be earlier than start date");
          return;
        }
      }

      if (name === "dateFrom" && formData.dateTo && value) {
        const fromDate = new Date(value);
        const toDate = new Date(formData.dateTo);
        if (fromDate > toDate) {
          toast.error("Start date cannot be later than end date");
          return;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatorRoleCountChange = (role, value) => {
    setFormData((prev) => ({
      ...prev,
      creatorRoleCounts: {
        ...prev.creatorRoleCounts,
        [role]: value,
      },
    }));
  };

  const formatTimeFor24Hour = (timeString) => {
    if (!timeString) return "";

    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)) {
      return timeString;
    }

    try {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = modifier === "AM" ? "00" : "12";
      } else if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours.padStart(2, "0")}:${minutes}`;
    } catch (error) {
      console.error("Time format error:", error);
      return timeString;
    }
  };
  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";

    try {
      const [year, month, day] = dateString.split("-");
      return `${year}-${day}-${month}`;
    } catch (error) {
      console.error("Date format error:", error);
      return dateString;
    }
  };

  const validateDate = (dateString) => {
    if (!dateString) return false;

    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 2); // 2 years from now

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate && selectedDate <= maxDate;
  };

  const getMinDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return maxDate.toISOString().split("T")[0];
  };

  const handleCheckboxChange = (category, type) => {
    if (category === "ushers") {
      setFormData((prev) => ({
        ...prev,
        selectedUsherTypes: {
          ...prev.selectedUsherTypes,
          [type]: !prev.selectedUsherTypes[type],
        },
      }));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (!formData.title) {
      toast.error("Please enter a job title");
      return;
    }
    if (!formData.dateFrom || !formData.dateTo) {
      toast.error("Please enter both start and end dates");
      return;
    }
    if (!formData.timeFrom || !formData.timeTo) {
      toast.error("Please enter both start and end times");
      return;
    }
    if (!formData.location) {
      toast.error("Please enter a location");
      return;
    }
    if (!formData.description) {
      toast.error("Please enter a description");
      return;
    }
    if (marketingType === "online") {
      const requiredContentRoles = {};
      let hasValidRoles = false;

      const roleMapping = {
        reelMaker: "Reel Maker",
        photographer: "Photography",
        videoEditor: "Video Editor",
      };

      Object.entries(formData.creatorRoleCounts).forEach(([role, count]) => {
        const numCount = parseInt(count);
        if (numCount > 0) {
          const backendRoleName = roleMapping[role] || role;
          requiredContentRoles[backendRoleName] = numCount;
          hasValidRoles = true;
        }
      });

      if (!hasValidRoles) {
        toast.error(
          "Please specify at least one content creator role with count"
        );
        return;
      }
      const contentJobData = {
        title: formData.title,
        description: formData.description,
        startDate: formatDateForBackend(formData.dateFrom),
        endDate: formatDateForBackend(formData.dateTo),
        startTime: formatTimeFor24Hour(formData.timeFrom),
        endTime: formatTimeFor24Hour(formData.timeTo),
        location: formData.location,
        requiredContentRoles,
      };

      dispatch(createContentJob(contentJobData)).then((action) => {
        if (action.payload) {
          if (action.payload.message === "Content job created successfully") {
            toast.success("Content job created successfully!");
            navigate("/content-creator-recommendations", {
              state: {
                jobId: action.payload.jobId,
                recommendations: action.payload.recommendedContentCreators,
              },
            });
          }
        }
      });
    } else {
      if (!formData.totalUshers) {
        toast.error("Please enter number of ushers needed");
        return;
      }
      if (!formData.salaryPerUsher) {
        toast.error("Please enter salary per usher");
        return;
      }
      const jobData = {
        description: formData.description,
        title: formData.title,
        startDate: formatDateForBackend(formData.dateFrom),
        endDate: formatDateForBackend(formData.dateTo),
        startTime: formatTimeFor24Hour(formData.timeFrom),
        endTime: formatTimeFor24Hour(formData.timeTo),
        location: formData.location,
        numOfUshers: parseInt(formData.totalUshers),
        salaryPerUsher: parseFloat(formData.salaryPerUsher),
        preferred_gender: formData.gender || "any",
      };

      dispatch(createJob(jobData)).then((action) => {
        if (action.payload) {
          if (action.payload.message === "Job created and ushers recommended") {
            toast.success("Job created successfully!");
            navigate("/recommendations", {
              state: { jobId: action.payload.jobId },
            });
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      <Navbar forceAuth={true} />

      <div className="container mx-auto p-8">
        <div className="bg-black/80 rounded-lg p-6 shadow-lg border border-[#C2A04C]/20">
          <button
            onClick={handleBack}
            className="flex items-center text-[#C2A04C] mb-6 hover:text-white transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
              </div>{" "}
              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Date</h3>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">From</label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">To</label>
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleInputChange}
                      min={formData.dateFrom || getMinDate()}
                      max={getMaxDate()}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[#C2A04C] font-bold mb-4">Time</h3>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">From</label>
                    <input
                      type="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-300 block mb-2">To</label>
                    <input
                      type="time"
                      name="timeTo"
                      value={formData.timeTo}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
              </div>
              <div>
                <label className="text-[#C2A04C] font-bold block mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows="4"
                  className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                />
              </div>
            </div>

            {/* Right Column - Requirements */}
            <div className="space-y-6">
              {marketingType === "offline" && (
                <div>
                  <h3 className="text-[#C2A04C] font-bold mb-4">Ushers</h3>
                  <input
                    type="number"
                    name="totalUshers"
                    value={formData.totalUshers}
                    onChange={handleInputChange}
                    placeholder="Number of total ushers"
                    className="w-full bg-gray-200 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                  />

                  <input
                    type="number"
                    name="salaryPerUsher"
                    value={formData.salaryPerUsher}
                    onChange={handleInputChange}
                    placeholder="Salary per usher"
                    step="0.01"
                    className="w-full bg-gray-200 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(formData.selectedUsherTypes).map(
                      ([type, checked]) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 text-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              handleCheckboxChange("ushers", type)
                            }
                            className="form-checkbox text-[#C2A04C] rounded"
                          />
                          <span>{type.replace(/([A-Z])/g, " $1").trim()}</span>
                        </label>
                      )
                    )}
                  </div>

                  {/* Gender Selection - only for ushers */}
                  <div className="mt-4">
                    <label className="text-[#C2A04C] font-bold block mb-2">
                      Preferred Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                    >
                      <option value="">Select gender preference</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="any">Any</option>
                    </select>
                  </div>
                </div>
              )}

              {marketingType === "online" && (
                <div>
                  <h3 className="text-[#C2A04C] font-bold mb-4">
                    Content Creators
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(formData.creatorRoleCounts).map(
                      ([role, count]) => (
                        <div key={role}>
                          <label className="text-gray-300 block mb-2 capitalize">
                            {role.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <input
                            type="number"
                            value={count}
                            onChange={(e) =>
                              handleCreatorRoleCountChange(role, e.target.value)
                            }
                            placeholder={`Number of ${role
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .toLowerCase()}s`}
                            min="0"
                            className="w-full bg-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={createJobLoading}
              className={`flex items-center bg-[#C2A04C] text-black px-6 py-2 rounded-full
                       hover:bg-[#C2A04C]/80 transition-all duration-300
                       transform hover:scale-105 ${
                         createJobLoading ? "opacity-50 cursor-not-allowed" : ""
                       }`}
            >
              {createJobLoading ? "Creating..." : "Next"}{" "}
              {!createJobLoading && <FaArrowRight className="ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDescription;
