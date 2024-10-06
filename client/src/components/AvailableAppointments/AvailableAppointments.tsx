import React, { useEffect, useState } from 'react';
import AppointmentService from '../../services/appointments.service';
import { List, ListItem, Typography, CircularProgress, Button } from '@mui/material';
import { Appointment } from '../../models/appointments.model';
import { useLocation, useParams } from 'react-router-dom';

interface AvailableAppointmentsProps {
}

interface AvailableAppointment {
  start: string;
  end: string;
  date: Date;
}



const AvailableAppointments = (props: AvailableAppointmentsProps) => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;
  console.log('Selected Date:', selectedDate);
  console.log('Treatment ID:', treatmentId);

  const [appointments, setAppointments] = useState<AvailableAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AppointmentService.getAvailableAppointments(Number(treatmentId), selectedDate)
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch available appointments');
        setLoading(false);
      });
  }, []);

  const addNewAppointment = (slot: any) => {
    console.log(slot)
    const newAppointment = new Appointment(1, Number(treatmentId), slot.date, slot.start, slot.end)
    AppointmentService.addNewAppointment(newAppointment)
    console.log(newAppointment)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div>
      <Typography variant="h6">Available Appointments</Typography>
      <div>

        {appointments.map((slot, index) => (
          <Button key={index} onClick={() => addNewAppointment(slot)} variant="outlined">
            {slot.start.toString().split('T')[1].substring(0, 5)} -
            {slot.end.toString().split('T')[1].substring(0, 5)}
          </Button>
        ))}

      </div>

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
