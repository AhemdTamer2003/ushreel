import { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { uploadProfilePicture } from "../../redux/Services/company";

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
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();
  const { updateStatus, updateError } = useSelector((state) => state.company);
  const isLoading = updateStatus === "loading";

  useEffect(() => {
    if (companyData && open) {
      setFormData({
        name: companyData.name || "",
        phone: companyData.phone || "",
        address: companyData.address || "",
      });
    }
  }, [companyData, open]);

  useEffect(() => {
    if (updateError) {
      setError(updateError);
    }
  }, [updateError]);

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

      // Upload the profile picture
      dispatch(uploadProfilePicture(file));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Company name is required");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setError(null);
    onSave(formData);
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
              src={companyData.profilePicture}
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
              disabled={isLoading}
            />
            <label htmlFor="company-logo-upload">
              <IconButton
                component="span"
                sx={{
                  color: "#C2A04C",
                  "&:hover": { backgroundColor: "rgba(194, 160, 76, 0.1)" },
                }}
                disabled={isLoading}
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
          disabled={isLoading}
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          disabled={isLoading}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
          margin="normal"
          disabled={isLoading}
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
