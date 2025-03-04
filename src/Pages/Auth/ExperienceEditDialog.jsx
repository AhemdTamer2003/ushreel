import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

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

function ExperienceEditDialog({ open, handleClose, experiences, onSave }) {
  const [experiencesList, setExperiencesList] = useState(experiences);
  const [newExperience, setNewExperience] = useState({
    description: '',
    date: ''
  });

  const handleAddExperience = () => {
    if (newExperience.description && newExperience.date) {
      const newId = experiencesList.length > 0 
        ? Math.max(...experiencesList.map(exp => exp.id)) + 1 
        : 1;
      
      setExperiencesList([
        ...experiencesList,
        {
          id: newId,
          description: newExperience.description,
          date: newExperience.date
        }
      ]);
      setNewExperience({ description: '', date: '' });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiencesList(experiencesList.filter(exp => exp.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiencesList(experiencesList.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleSave = () => {
    onSave(experiencesList);
    handleClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Experiences</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="New Experience"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date"
            value={newExperience.date}
            onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
            placeholder="(2024 - 2025)"
            margin="normal"
          />
          <StyledButton
            onClick={handleAddExperience}
            startIcon={<AddIcon />}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Experience
          </StyledButton>
        </Box>

        <Box sx={{ mt: 3 }}>
          {experiencesList.map((exp) => (
            <Box key={exp.id} sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                value={exp.description}
                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
              />
              <TextField
                sx={{ width: '30%' }}
                value={exp.date}
                onChange={(e) => handleExperienceChange(exp.id, 'date', e.target.value)}
              />
              <IconButton
                onClick={() => handleDeleteExperience(exp.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
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
}

export default ExperienceEditDialog;