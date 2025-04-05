import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

function ExperienceEditDialog({ open, handleClose, experiences, onSave, loading }) {
  const [editedExperiences, setEditedExperiences] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setEditedExperiences(experiences);
    setErrors(new Array(experiences.length).fill(''));
  }, [experiences]);

  const handleAddExperience = () => {
    setEditedExperiences([
      ...editedExperiences,
      {
        id: editedExperiences.length + 1,
        description: '',
        date: `(${new Date().getFullYear()})`
      }
    ]);
    setErrors([...errors, '']);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = editedExperiences.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setEditedExperiences(newExperiences);
    setErrors(newErrors);
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...editedExperiences];
    newExperiences[index] = {
      ...newExperiences[index],
      description: value
    };
    setEditedExperiences(newExperiences);

    // Clear error when user starts typing
    if (value.trim() !== '') {
      const newErrors = [...errors];
      newErrors[index] = '';
      setErrors(newErrors);
    }
  };

  const validateExperiences = () => {
    const newErrors = editedExperiences.map(exp => 
      exp.description.trim() === '' ? 'Experience description is required' : ''
    );
    setErrors(newErrors);
    return newErrors.every(error => error === '');
  };

  const handleSave = async () => {
    if (!validateExperiences()) {
      toast.error('Please fill in all experience descriptions');
      return;
    }

    try {
      await onSave(editedExperiences);
      handleClose();
      toast.success('Experiences updated successfully!');
    } catch (error) {
      console.error('Error saving experiences:', error);
      toast.error('Failed to save experiences');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1a1a1a',
          color: '#ffffff'
        }
      }}
    >
      <DialogTitle sx={{ color: '#C2A04C' }}>
        Edit Experiences
      </DialogTitle>
      
      <DialogContent>
        <div className="space-y-4 mt-4">
          {editedExperiences.map((experience, index) => (
            <div key={index} className="flex items-start space-x-2">
              <TextField
                fullWidth
                multiline
                rows={2}
                value={experience.description}
                onChange={(e) => handleExperienceChange(index, e.target.value)}
                error={!!errors[index]}
                helperText={errors[index]}
                placeholder="Describe your experience..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: '#C2A04C' },
                    '&:hover fieldset': { borderColor: '#C2A04C' },
                    '&.Mui-focused fieldset': { borderColor: '#C2A04C' },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336'
                  }
                }}
              />
              <IconButton
                onClick={() => handleRemoveExperience(index)}
                sx={{ color: '#C2A04C' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
        
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddExperience}
          sx={{
            color: '#C2A04C',
            borderColor: '#C2A04C',
            marginTop: 2,
            '&:hover': {
              borderColor: '#C2A04C',
              backgroundColor: 'rgba(194, 160, 76, 0.1)'
            }
          }}
          variant="outlined"
        >
          Add Experience
        </Button>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#C2A04C',
            '&:hover': {
              backgroundColor: 'rgba(194, 160, 76, 0.1)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          sx={{
            backgroundColor: '#C2A04C',
            color: 'black',
            '&:hover': {
              backgroundColor: '#9c8031'
            },
            '&.Mui-disabled': {
              backgroundColor: '#665420',
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExperienceEditDialog;