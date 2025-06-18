import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { getJobOfferDetails } from "../../redux/Services/job";
import Navbar from "../../components/Shared/Navbar";

function JobOfferDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      dispatch(getJobOfferDetails(jobId))
        .unwrap()
        .then((response) => {
          setJobDetails(response);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error || "Failed to fetch job details");
          setLoading(false);
        });
    }
  }, [jobId, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const UserCard = ({ user, status }) => {
    const getStatusColor = () => {
      switch (status) {
        case "accepted":
          return "#4CAF50";
        case "declined":
          return "#f44336";
        case "sent":
          return "#C2A04C";
        default:
          return "#9E9E9E";
      }
    };

    const getStatusText = () => {
      switch (status) {
        case "accepted":
          return "Accepted";
        case "declined":
          return "Declined";
        case "sent":
          return "Pending";
        default:
          return "Unknown";
      }
    };

    return (
      <Card
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: `1px solid ${getStatusColor()}30`,
          mb: 2,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  bgcolor: getStatusColor(),
                  width: 40,
                  height: 40,
                }}
              >
                {user.fullName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  {user.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
                  {user.gender} • Age {user.age}
                </Typography>
                {user.address && (
                  <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
                    📍 {user.address}
                  </Typography>
                )}
              </Box>
            </Box>
            <Chip
              label={getStatusText()}
              sx={{
                backgroundColor: getStatusColor(),
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <CircularProgress sx={{ color: "#D4A537" }} />
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#C2A04C]">
        <Typography variant="h6" sx={{ color: "#C2A04C" }}>
          Job details not found
        </Typography>
      </div>
    );
  }

  const { job, sent, accepted, declined } = jobDetails;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      <Navbar forceAuth={true} />

      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate(-1)}
            startIcon={<FaArrowLeft />}
            sx={{
              color: "#C2A04C",
              "&:hover": { backgroundColor: "rgba(194, 160, 76, 0.1)" },
            }}
          >
            Back
          </Button>
        </div>

        {/* Job Details Card */}
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(194, 160, 76, 0.3)",
            mb: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ color: "#C2A04C", fontWeight: "bold", mb: 2 }}
            >
              {job.jobTitle}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaMapMarkerAlt color="#C2A04C" />
                  <Typography sx={{ color: "white" }}>
                    {job.location}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaCalendarAlt color="#C2A04C" />
                  <Typography sx={{ color: "white" }}>
                    {formatDate(job.startDate)} - {formatDate(job.endDate)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaClock color="#C2A04C" />
                  <Typography sx={{ color: "white" }}>
                    {job.startTime} - {job.endTime}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaUsers color="#C2A04C" />
                  <Typography sx={{ color: "white" }}>
                    {job.requiredCount}{" "}
                    {job.jobType === "offline" ? "Ushers" : "Content Creators"}{" "}
                    Required
                  </Typography>
                </Box>

                {job.salaryPerUsher && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <FaDollarSign color="#C2A04C" />
                    <Typography sx={{ color: "white" }}>
                      ${job.salaryPerUsher} per person
                    </Typography>
                  </Box>
                )}

                <Chip
                  label={
                    job.jobType === "offline" ? "Offline Job" : "Online Job"
                  }
                  sx={{
                    backgroundColor:
                      job.jobType === "offline" ? "#2196F3" : "#4CAF50",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "#C2A04C", mb: 1 }}>
                  Description
                </Typography>
                <Typography sx={{ color: "white" }}>
                  {job.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(194, 160, 76, 0.1)",
                border: "1px solid #C2A04C",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#C2A04C", fontWeight: "bold" }}
                >
                  {sent.length}
                </Typography>
                <Typography variant="h6" sx={{ color: "#C2A04C" }}>
                  Offers Sent
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                border: "1px solid #4CAF50",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#4CAF50", fontWeight: "bold" }}
                >
                  {accepted.length}
                </Typography>
                <Typography variant="h6" sx={{ color: "#4CAF50" }}>
                  Accepted
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                border: "1px solid #f44336",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#f44336", fontWeight: "bold" }}
                >
                  {declined.length}
                </Typography>
                <Typography variant="h6" sx={{ color: "#f44336" }}>
                  Declined
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* People Lists */}
        <Grid container spacing={3}>
          {/* Accepted */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ color: "#4CAF50", fontWeight: "bold", mb: 2 }}
            >
              ✅ Accepted ({accepted.length})
            </Typography>
            {accepted.length > 0 ? (
              accepted.map((user, index) => (
                <UserCard key={index} user={user} status="accepted" />
              ))
            ) : (
              <Typography sx={{ color: "#9E9E9E" }}>
                No one has accepted yet
              </Typography>
            )}
          </Grid>

          {/* Pending */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ color: "#C2A04C", fontWeight: "bold", mb: 2 }}
            >
              ⏳ Pending ({sent.length - accepted.length - declined.length})
            </Typography>
            {sent
              .filter(
                (sentUser) =>
                  !accepted.some(
                    (acceptedUser) =>
                      acceptedUser.fullName === sentUser.fullName
                  ) &&
                  !declined.some(
                    (declinedUser) =>
                      declinedUser.fullName === sentUser.fullName
                  )
              )
              .map((user, index) => (
                <UserCard key={index} user={user} status="sent" />
              ))}
            {sent.length - accepted.length - declined.length === 0 && (
              <Typography sx={{ color: "#9E9E9E" }}>
                No pending responses
              </Typography>
            )}
          </Grid>

          {/* Declined */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ color: "#f44336", fontWeight: "bold", mb: 2 }}
            >
              ❌ Declined ({declined.length})
            </Typography>
            {declined.length > 0 ? (
              declined.map((user, index) => (
                <UserCard key={index} user={user} status="declined" />
              ))
            ) : (
              <Typography sx={{ color: "#9E9E9E" }}>
                No one has declined
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default JobOfferDetails;
