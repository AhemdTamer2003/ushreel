import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLogout,
  getAllUsers,
  getPendingJobs,
  approveJob,
  rejectJob,
} from "../../redux/Services/admin";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import {
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaUser,
  FaBuilding,
  FaVideo,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdminAuthenticated, admin, users, pendingJobs } = useSelector(
    (state) => state.admin
  );

  const [activeTab, setActiveTab] = useState("users");
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    jobId: null,
  });
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    // Fetch initial data
    if (isAdminAuthenticated) {
      if (activeTab === "users") {
        dispatch(getAllUsers());
      } else if (activeTab === "jobs") {
        dispatch(getPendingJobs());
      }
    }
  }, [dispatch, isAdminAuthenticated, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  const handleApproveJob = (jobId) => {
    dispatch(approveJob(jobId))
      .unwrap()
      .then(() => {
        toast.success("Job approved successfully");
      })
      .catch((err) => {
        toast.error("Failed to approve job");
        console.error(err);
      });
  };

  const openRejectDialog = (jobId) => {
    setRejectDialog({ open: true, jobId });
  };

  const closeRejectDialog = () => {
    setRejectDialog({ open: false, jobId: null });
    setRejectReason("");
  };

  const handleRejectJob = () => {
    if (!rejectReason) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    dispatch(rejectJob({ jobId: rejectDialog.jobId, comment: rejectReason }))
      .unwrap()
      .then(() => {
        toast.success("Job rejected successfully");
        closeRejectDialog();
      })
      .catch((err) => {
        toast.error("Failed to reject job");
        console.error(err);
      });
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderUsers = () => {
    if (users.loading) {
      return (
        <div className="flex justify-center my-10">
          <CircularProgress sx={{ color: "#D4A537" }} />
        </div>
      );
    }

    // Check if all user categories are empty
    if (
      users.ushers.length === 0 &&
      users.contentCreators.length === 0 &&
      users.companies.length === 0
    ) {
      return (
        <div className="bg-black/80 rounded-lg shadow-lg p-8 border border-[#C2A04C]/20 text-center mt-6">
          <FaUsers className="mx-auto text-[#C2A04C] text-4xl mb-4 opacity-50" />
          <p className="text-gray-300 text-lg">No users found</p>
          <p className="text-gray-400 text-sm mt-2">
            The application doesn&apos;t have any registered users yet
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Ushers */}
        <div className="bg-black/80 rounded-lg shadow-lg p-6 border border-[#C2A04C]/20">
          <h3 className="text-white text-xl font-bold mb-4 flex items-center">
            <FaUser className="text-[#C2A04C] mr-2" /> Ushers (
            {users.ushers.length})
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {users.ushers.length > 0 ? (
              users.ushers.map((usher) => (
                <div key={usher._id} className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-[#C2A04C] font-bold">
                    {usher.firstName} {usher.lastName}
                  </p>
                  <p className="text-gray-300 text-sm">{usher.email}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Joined: {formatDate(usher.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No ushers found</p>
            )}
          </div>
        </div>

        {/* Content Creators */}
        <div className="bg-black/80 rounded-lg shadow-lg p-6 border border-[#C2A04C]/20">
          <h3 className="text-white text-xl font-bold mb-4 flex items-center">
            <FaVideo className="text-[#C2A04C] mr-2" /> Content Creators (
            {users.contentCreators.length})
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {users.contentCreators.length > 0 ? (
              users.contentCreators.map((creator) => (
                <div key={creator._id} className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-[#C2A04C] font-bold">
                    {creator.firstName} {creator.lastName}
                  </p>
                  <p className="text-gray-300 text-sm">{creator.email}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Joined: {formatDate(creator.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No content creators found</p>
            )}
          </div>
        </div>

        {/* Companies */}
        <div className="bg-black/80 rounded-lg shadow-lg p-6 border border-[#C2A04C]/20">
          <h3 className="text-white text-xl font-bold mb-4 flex items-center">
            <FaBuilding className="text-[#C2A04C] mr-2" /> Companies (
            {users.companies.length})
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {users.companies.length > 0 ? (
              users.companies.map((company) => (
                <div key={company._id} className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-[#C2A04C] font-bold">{company.name}</p>
                  <p className="text-gray-300 text-sm">{company.email}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Joined: {formatDate(company.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No companies found</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPendingJobs = () => {
    if (pendingJobs.loading) {
      return (
        <div className="flex justify-center my-10">
          <CircularProgress sx={{ color: "#D4A537" }} />
        </div>
      );
    }

    if (pendingJobs.data.length === 0) {
      return (
        <div className="bg-black/80 rounded-lg shadow-lg p-8 border border-[#C2A04C]/20 text-center mt-6">
          <FaBriefcase className="mx-auto text-[#C2A04C] text-4xl mb-4 opacity-50" />
          <p className="text-gray-300 text-lg">No pending jobs to review</p>
          <p className="text-gray-400 text-sm mt-2">
            All job requests have been processed
          </p>
        </div>
      );
    }

    return (
      <div className="bg-black/80 rounded-lg shadow-lg p-6 border border-[#C2A04C]/20 mt-6">
        <h3 className="text-white text-xl font-bold mb-4">
          Pending Jobs ({pendingJobs.data.length})
        </h3>

        <div className="space-y-6">
          {pendingJobs.data.map((job) => (
            <div key={job._id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#C2A04C] font-bold text-lg">
                    {job.title}
                  </h4>
                  <p className="text-gray-300 mt-1">{job.description}</p>

                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-400">Company:</p>
                      <p className="text-white">
                        {job.company?.name || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Location:</p>
                      <p className="text-white">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date:</p>
                      <p className="text-white">
                        {formatDate(job.startDate)} - {formatDate(job.endDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Number of Ushers:</p>
                      <p className="text-white">{job.numOfUshers}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproveJob(job._id)}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => openRejectDialog(job._id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
      {/* Header */}
      <header className="bg-black p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#C2A04C]">Admin Dashboard</h1>
          {admin && (
            <span className="ml-4 text-gray-300">
              Welcome, {admin.firstName} {admin.lastName}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </header>

      {/* Navigation */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-black/80 rounded-lg shadow-lg p-4 border border-[#C2A04C]/20">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabChange("users")}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-[#C2A04C] text-black"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              <FaUsers className="mr-2" /> Users
            </button>
            <button
              onClick={() => handleTabChange("jobs")}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === "jobs"
                  ? "bg-[#C2A04C] text-black"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              <FaBriefcase className="mr-2" /> Pending Jobs
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === "users" ? renderUsers() : renderPendingJobs()}
        </div>
      </div>

      {/* Reject Job Dialog */}
      <Dialog open={rejectDialog.open} onClose={closeRejectDialog}>
        <DialogTitle>Reject Job</DialogTitle>
        <DialogContent>
          <p className="mb-4">Please provide a reason for rejection:</p>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRejectDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRejectJob} color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
