import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../../redux/Services/admin";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const AdminRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAdminAuthenticated } = useSelector(
    (state) => state.admin
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [pin, setPin] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const ADMIN_PIN = "4444";

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const verifyPin = () => {
    if (pin === ADMIN_PIN) {
      setPinVerified(true);
      toast.success("PIN verified successfully!");
    } else {
      toast.error("Invalid PIN");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(registerAdmin(formData))
      .unwrap()
      .then(() => {
        toast.success("Admin registered successfully!");
        navigate("/admin/login");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  if (!pinVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex justify-center items-center">
        <div className="bg-black/80 p-8 rounded-lg shadow-lg border border-[#C2A04C]/20 w-full max-w-md">
          <h2 className="text-[#C2A04C] text-2xl font-bold mb-6 text-center">
            Admin Access
          </h2>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Access PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="Enter admin PIN"
            />
          </div>

          <button
            onClick={verifyPin}
            className="w-full bg-[#C2A04C] text-black font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-[#A78A40] transition-colors"
          >
            Verify PIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex justify-center items-center">
      <div className="bg-black/80 p-8 rounded-lg shadow-lg border border-[#C2A04C]/20 w-full max-w-md">
        <h2 className="text-[#C2A04C] text-2xl font-bold mb-6 text-center">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="ZICO"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="Aamer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C2A04C] text-black font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-[#A78A40] transition-colors flex justify-center items-center"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin/login")}
            className="text-[#C2A04C] hover:text-white transition-colors"
          >
            Already registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
