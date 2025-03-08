import { useState } from 'react'
import './App.css'
import Calendar from './components/Calendar'
import TimeSlot from './components/TimeSlot'
import BookingForm from './components/BookingForm'
import { format } from 'date-fns'

interface BookingFormData {
  name: string;
  email: string;
  budget: string;
  goals: string;
}

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookingSubmit = (formData: BookingFormData) => {
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', {
      date: selectedDate,
      time: selectedTime,
      ...formData
    });
    setBookingSubmitted(true);
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${period}`
  }

  return (
    <div className="scheduler-container">
      <h1>Schedule an Appointment</h1>
      <div className="scheduler-content">
        <div className="calendar-section">
          <h2>Select Date</h2>
          <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          {selectedDate && (
            <p>Selected date: {format(selectedDate, 'MMMM d, yyyy')}</p>
          )}
        </div>
        <div className="time-section">
          <h2>Select Time</h2>
          {selectedDate ? (
            <TimeSlot selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
          ) : (
            <p>Please select a date first</p>
          )}
          {selectedTime && (
            <p>Selected time: {formatTime(selectedTime)}</p>
          )}
        </div>
        <div className="booking-section">
          <h2>Booking Details</h2>
          {bookingSubmitted ? (
            <div className="success-message">
              <h3>Booking Submitted Successfully!</h3>
              <p>Thank you for scheduling an appointment. We'll be in touch soon.</p>
              <button onClick={() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setBookingSubmitted(false);
              }}>
                Schedule Another Appointment
              </button>
            </div>
          ) : (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleBookingSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App 