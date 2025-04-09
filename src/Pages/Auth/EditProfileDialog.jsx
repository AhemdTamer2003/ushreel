import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit as EditIcon, AddAPhotoOutlined } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#151515',
    border: '1px solid rgba(194, 160, 76, 0.2)',
    borderRadius: '16px',
    color: '#fff',
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: '#151515',
    color: '#C2A04C',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(194, 160, 76, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: '#C2A04C',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#C2A04C',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#C2A04C',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#C2A04C',
  color: '#151515',
  '&:hover': {
    backgroundColor: 'rgba(194, 160, 76, 0.8)',
  },
}));

const EditProfileDialog = ({ open, handleClose, profileData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    userName: profileData?.userName || '',
    phone: profileData?.phone || '',
    address: profileData?.address || '',
    profileImage: profileData?.profileImage || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar
              src={formData.profileImage}
              sx={{ width: 100, height: 100, border: '2px solid #C2A04C' }}
            />
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                component="span"
                sx={{
                  color: '#C2A04C',
                  '&:hover': { backgroundColor: 'rgba(194, 160, 76, 0.1)' }
                }}
              >
                <AddAPhotoOutlined />
              </IconButton>
            </label>
          </Stack>
        </Box>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          variant="outlined"
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
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={handleClose}
          sx={{ color: '#C2A04C' }}
        >
          Cancel
        </Button>
        <StyledButton
          onClick={handleSubmit}
          variant="contained"
        >
          Save Changes
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default EditProfileDialog;