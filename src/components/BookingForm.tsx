import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';

interface BookingFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSubmit: (formData: BookingFormData) => void;
}

interface BookingFormData {
  name: string;
  email: string;
  budget: string;
  goals: string;
}

const BookingForm = ({ selectedDate, selectedTime, onSubmit }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    budget: '',
    goals: '',
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget is required';
    }
    
    if (!formData.goals.trim()) {
      newErrors.goals = 'Campaign goals are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="subtitle1" gutterBottom>
          Selected Appointment:
        </Typography>
        <Typography variant="body1">
          Date: {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Not selected'}
        </Typography>
        <Typography variant="body1">
          Time: {selectedTime ? formatTime(selectedTime) : 'Not selected'}
        </Typography>
      </Paper>

      <TextField
        fullWidth
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Budget"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        error={!!errors.budget}
        helperText={errors.budget}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Campaign Goals"
        multiline
        rows={4}
        value={formData.goals}
        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
        error={!!errors.goals}
        helperText={errors.goals}
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!selectedDate || !selectedTime}
      >
        Book Appointment
      </Button>
    </Box>
  );
};

export default BookingForm; 