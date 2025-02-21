// EditProfileDialog.jsx
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
    name: profileData?.name || '',
    email: profileData?.email || '',
    phone: profileData?.phone || '',
    location: profileData?.location || '',
    gender: profileData?.gender || '',
    age: profileData?.age || '',
    profileImage: profileData?.profileImage || '',
  });

  const [newExperience, setNewExperience] = useState('');

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

  const handleAddExperience = () => {
    if (newExperience.trim()) {
      // Add logic to handle new experience
      setNewExperience('');
    }
  };

  const handleSave = () => {
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
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          variant="outlined"
        />

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Add New Experience"
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            variant="outlined"
          />
          <StyledButton
            onClick={handleAddExperience}
            sx={{ mt: 1 }}
          >
            Add Experience
          </StyledButton>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={handleClose}
          sx={{ color: '#C2A04C' }}
        >
          Cancel
        </Button>
        <StyledButton
          onClick={handleSave}
          variant="contained"
        >
          Save Changes
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default EditProfileDialog;