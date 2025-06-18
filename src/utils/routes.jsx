import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import UsherRegister from "../Pages/Usher/UsherRegister";
import ContentCreatorRegister from "../Pages/ContentCreator/ContentCreatorRegister";
import CompanyRegister from "../Pages/Company/CompanyRegister";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ContactUs from "../Pages/General/ContactForm";
import AboutUs from "../Pages/General/AboutUs";
import Team from "../Pages/General/Team";
import AddExperience from "../Pages/Experience/AddExperience";
import UsherProfile from "../Pages/Usher/UsherProfile";
import ContentCreatorProfile from "../Pages/ContentCreator/ContentCreatorProfile";
import ContentCreatorEditProfile from "../Pages/ContentCreator/ContentCreatorEditProfile";
import CompanyProfile from "../Pages/Company/CompanyProfile";
import MarketingSelectionPages from "../Pages/Marketing/MarketingSelectionPages";
import FormDescription from "../Pages/General/FormDescription";
import Recommendations from "../Pages/General/Recommendations";
import ContentCreatorRecommendations from "../Pages/General/ContentCreatorRecommendations";
import ResetOtp from "../Pages/Auth/ResetOtp";
import { NotFound } from "../components/Shared/NotFound";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminRegister from "../Pages/Admin/AdminRegister";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import JobOfferDetails from "../Pages/Company/JobOfferDetails";

export const routes = {
  // Main public routes
  main: [
    { path: "/", element: <Home />, label: "Home" },
    { path: "/about", element: <AboutUs />, label: "About Us" },
    { path: "/team", element: <Team />, label: "Team" },
    { path: "/contact", element: <ContactUs />, label: "Contact Us" },
  ],

  // Authentication routes
  auth: [
    { path: "/login", element: <Login />, label: "Login" },
    { path: "/register", element: <Register />, label: "Register" },
    {
      path: "/usherregister",
      element: <UsherRegister />,
      label: "Usher Register",
    },
    {
      path: "/contentcreatorregister",
      element: <ContentCreatorRegister />,
      label: "Content Creator Register",
    },
    {
      path: "/companyregister",
      element: <CompanyRegister />,
      label: "Company Register",
    },
  ],

  // Password reset flow
  passwordReset: [
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
      label: "Forgot Password",
    },
    { path: "/verify-email", element: <VerifyOtp />, label: "Verify Email" },
    { path: "/verify-otp", element: <ResetOtp />, label: "Verify OTP" },
    {
      path: "/ResetPassword",
      element: <ResetPassword />,
      label: "Reset Password",
    },
  ],

  // User profile and experience routes
  profile: [
    {
      path: "/add-experience",
      element: <AddExperience />,
      label: "Add Experience",
    },
    {
      path: "/usher-profile",
      element: <UsherProfile />,
      label: "Usher Profile",
    },
    {
      path: "/content-creator-profile",
      element: <ContentCreatorProfile />,
      label: "Content Creator Profile",
    },
    {
      path: "/content-creator-edit",
      element: <ContentCreatorEditProfile />,
      label: "Edit Content Creator Profile",
    },
    {
      path: "/company-profile",
      element: <CompanyProfile />,
      label: "Company Profile",
    },
    {
      path: "/marketing-selection",
      element: <MarketingSelectionPages />,
      label: "Marketing Selection",
    },
    {
      path: "/form-description",
      element: <FormDescription />,
      label: "Form Description",
    },
    {
      path: "/recommendations",
      element: <Recommendations />,
      label: "Recommendations",
    },
    {
      path: "/content-creator-recommendations",
      element: <ContentCreatorRecommendations />,
      label: "Content Creator Recommendations",
    },
    {
      path: "/job-details/:jobId",
      element: <JobOfferDetails />,
      label: "Job Offer Details",
    },
  ],

  // Admin routes
  admin: [
    { path: "/admin/login", element: <AdminLogin />, label: "Admin Login" },
    {
      path: "/admin/register",
      element: <AdminRegister />,
      label: "Admin Register",
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
      label: "Admin Dashboard",
    },
  ],

  // 404 route
  notFound: [{ path: "*", element: <NotFound />, label: "404 Not Found" }],
};
