import { Box, Grid, Paper, Typography } from '@mui/material';

interface TimeSlotProps {
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSlot = ({ selectedTime, onTimeSelect }: TimeSlotProps) => {
  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9; // Start from 9 AM
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour.toString().padStart(2, '0')}:${minute}`,
      display: `${displayHour}:${minute} ${period}`
    };
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1}>
        {timeSlots.map((time) => (
          <Grid item xs={6} sm={4} key={time.value}>
            <Paper
              sx={{
                p: 1,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: selectedTime === time.value ? '#e0f2f1' : 'white',
                '&:hover': {
                  bgcolor: '#e0f2f1',
                },
              }}
              onClick={() => onTimeSelect(time.value)}
            >
              <Typography variant="body2">
                {time.display}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TimeSlot; 