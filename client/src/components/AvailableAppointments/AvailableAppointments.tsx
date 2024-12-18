import React, { useEffect, useState } from 'react';
import AppointmentService from '../../services/appointments.service';
import { Button, Typography, Grid, Box, TextField } from '@mui/material';
import { Appointment } from '../../models/appointments.model';
import './AvailableAppointments.scss';

interface AvailableAppointmentsProps {
  selectedDate: string;
  treatmentId: string | undefined;
}

interface AvailableAppointment {
  start: string;
  end: string;
  date: Date;
}

const AvailableAppointments = (props: AvailableAppointmentsProps) => {
  const [appointments, setAppointments] = useState<AvailableAppointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | null>(null);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    setSelectedAppointment(null)
    AppointmentService.getAvailableAppointments(Number(props.treatmentId), props.selectedDate)
      .then(data => setAppointments(data))
      .catch(() => console.error('Failed to fetch appointments'));
  }, [props.selectedDate]);

  const addNewAppointment = () => {
    if (selectedAppointment) {
      const newAppointment = new Appointment(
        14,
        Number(props.treatmentId),
        selectedAppointment.date,
        selectedAppointment.start,
        selectedAppointment.end,
        note
      );
      console.log(newAppointment)
      AppointmentService.addNewAppointment(newAppointment);
      alert('Appointment booked!');
    }
  };

  return (
    <div className="appointments-container" style={{ display: 'flex' }}>
      {/* <div style={{ marginTop: '80px', padding: '20px' }}>
      <div>
        {appointments.map((slot, index) => (
          <Button key={index} onClick={() => addNewAppointment(slot)} variant="outlined">
            {slot.end.toString().split('T')[1].substring(0, 5)} -  {slot.start.toString().split('T')[1].substring(0, 5)}     
          </Button>
        ))}
      </div>
      </div> */}
      <Box className="appointments-list" >
     <Grid container spacing={1} className="appointments-grid">
        {appointments.map((slot, index) => (
          <Grid item xs={12} sm={6} key={index} >
            <Box className="appointment-card">
              <Button
                onClick={() => setSelectedAppointment(slot)}
                variant="outlined"
                fullWidth
              >
                {slot.start.split('T')[1].substring(0, 5)} - {slot.end.split('T')[1].substring(0, 5)}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      </Box>

      {selectedAppointment && (
        <Box className="appointment-details" >
          <Typography variant="h6">פרטי התור:</Typography>
          <Typography>
            תאריך: {new Date(selectedAppointment.date).toLocaleDateString()}
          </Typography>
          <Typography>
            שעה: {selectedAppointment.start.split('T')[1].substring(0, 5)} - {selectedAppointment.end.split('T')[1].substring(0, 5)}
          </Typography>
          <TextField
            label="תרצי להגיד משהו למירי?"
            multiline
            rows={3}
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={addNewAppointment}
          >
            אישור הזמנת התור
          </Button>
        </Box>
      )}
    </div>
    //במקרה ובו רוצים להדפיס את כל השבוע
    // <div>
    //   <Typography variant="h6">Available Appointments</Typography>
    //   <div>
    //     {Object.keys(appointments).map((day, index) => (
    //       <div key={index}>
    //         <h2>{day}</h2>
    //         <ul>
    //           {appointments[day].map((slot, index) => (
    //             <Button key={index} onClick={() => addNewAppointment(slot)} variant="outlined">
    //               {slot.start.toString().split('T')[1].substring(0, 5)} -
    //               {slot.end.toString().split('T')[1].substring(0, 5)}
    //             </Button>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default AvailableAppointments;
