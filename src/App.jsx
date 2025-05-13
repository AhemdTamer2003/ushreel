import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { routes } from "./utils/routes.jsx";
import { theme } from "./utils/theme";

function App() {
  const renderRoutes = () => {
    const allRoutes = [
      ...routes.main,
      ...routes.auth,
      ...routes.passwordReset,
      ...routes.profile,
      ...routes.admin,
      ...routes.notFound,
    ];

    return allRoutes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C]">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={3}
          toastStyle={{
            backgroundColor: "rgba(26, 26, 26, 0.9)",
            borderRadius: "8px",
          }}
        />

        <Routes>{renderRoutes()}</Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
