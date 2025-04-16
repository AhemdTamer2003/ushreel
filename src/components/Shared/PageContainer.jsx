import PropTypes from "prop-types";
import { Paper } from "@mui/material";

export const PageContainer = ({
  children,
  backgroundImage,
  className = "",
  paperSx = {},
}) => {
  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 py-8 bg-black ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      <Paper
        elevation={24}
        className="p-8 rounded-xl w-full max-w-md"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          ...paperSx,
        }}
      >
        {children}
      </Paper>
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
  paperSx: PropTypes.object,
};

export default PageContainer;
