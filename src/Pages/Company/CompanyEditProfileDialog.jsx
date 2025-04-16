import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddAPhotoOutlined } from "@mui/icons-material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#151515",
    border: "1px solid rgba(194, 160, 76, 0.2)",
    borderRadius: "16px",
    color: "#fff",
    maxWidth: "600px",
    width: "100%",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#151515",
    color: "#C2A04C",
    borderBottom: "1px solid rgba(194, 160, 76, 0.2)",
    padding: "16px 24px",
  },
  "& .MuiDialogContent-root": {
    padding: "24px",
    backgroundColor: "#151515",
  },
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "rgba(194, 160, 76, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "#C2A04C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C2A04C",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#C2A04C",
      "&.Mui-focused": {
        color: "#C2A04C",
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#C2A04C",
  color: "#151515",
  padding: "8px 24px",
  "&:hover": {
    backgroundColor: "rgba(194, 160, 76, 0.8)",
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(194, 160, 76, 0.3)",
    color: "#151515",
  },
}));

function CompanyEditProfileDialog({ open, handleClose, companyData, onSave }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: companyData?.name || "",
    email: companyData?.email || "",
    phone: companyData?.phone || "",
    location: companyData?.location || "",
    website: companyData?.website || "",
    industry: companyData?.industry || "",
    profileImage: companyData?.profileImage || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
        setError(null);
      };
      reader.onerror = () => {
        setError("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSave(formData);
      handleClose();
    } catch (err) {
      setError(err.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Company Profile</DialogTitle>

      <DialogContent>
        {error && (
          <Box
            sx={{
              color: "#ff4444",
              mb: 2,
              p: 1,
              bgcolor: "rgba(255,68,68,0.1)",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            {error}
          </Box>
        )}

        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar
              src={formData.profileImage}
              sx={{
                width: 100,
                height: 100,
                border: "2px solid #C2A04C",
                "&:hover": { opacity: 0.8 },
              }}
            />
            <input
              accept="image/*"
              id="company-logo-upload"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="company-logo-upload">
              <IconButton
                component="span"
                sx={{
                  color: "#C2A04C",
                  "&:hover": { backgroundColor: "rgba(194, 160, 76, 0.1)" },
                }}
              >
                <AddAPhotoOutlined />
              </IconButton>
            </label>
          </Stack>
        </Box>

        <TextField
          fullWidth
          label="Company Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>

      <DialogActions
        sx={{
          padding: 3,
          borderTop: "1px solid rgba(194, 160, 76, 0.2)",
          backgroundColor: "#151515",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#C2A04C",
            "&:hover": { backgroundColor: "rgba(194, 160, 76, 0.1)" },
          }}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <StyledButton
          onClick={handleSave}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#151515" }} />
          ) : (
            "Save Changes"
          )}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}

export default CompanyEditProfileDialog;
