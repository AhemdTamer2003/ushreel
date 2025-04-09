import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

function ExperienceEditDialog({ open, handleClose, experience, onSave, loading }) {
  const [experienceText, setExperienceText] = useState('');

  useEffect(() => {
    setExperienceText(experience || '');
  }, [experience]);

  const handleSubmit = () => {
    onSave(experienceText);
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Experience</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Experience"
          value={experienceText}
          onChange={(e) => setExperienceText(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="Describe your experience..."
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
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Save Changes'
          )}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}

export default ExperienceEditDialog;