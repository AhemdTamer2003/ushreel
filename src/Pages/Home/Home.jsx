import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";
import home from "../../assets/ushrealHome.png";

function Home() {
  const navigate = useNavigate();

  // Hidden admin access shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+Shift+A
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="h-screen" style={{ backgroundImage: `url(${home})` }}>
      <Navbar />
    </div>
  );
}

export default Home;
