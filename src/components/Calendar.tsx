import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Box, Grid, Typography, Paper } from '@mui/material';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    onDateSelect(date);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <Box>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
            Previous
          </button>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
            Next
          </button>
        </Box>
      </Box>
      
      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs key={day}>
            <Paper sx={{ p: 1, textAlign: 'center', bgcolor: '#e0f2f1' }}>
              <Typography variant="subtitle2">{day}</Typography>
            </Paper>
          </Grid>
        ))}
        
        {days.map((day, index) => (
          <Grid item xs key={index}>
            <Paper
              sx={{
                p: 1,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isSameDay(day, selectedDate || new Date()) ? '#e0f2f1' : 'white',
                '&:hover': {
                  bgcolor: '#e0f2f1',
                },
              }}
              onClick={() => handleDateClick(day)}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isSameMonth(day, currentMonth) ? 'text.primary' : 'text.secondary',
                }}
              >
                {format(day, 'd')}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar; 