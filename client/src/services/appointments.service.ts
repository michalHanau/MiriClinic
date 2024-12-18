import { Appointment } from '../models/appointments.model';
import api from './httpService';

class AppointmentService {

  BASE_URL: string = "/appointments";

  getAvailableAppointments(treatmentId: number , selectedDate: string) {
    return api.get(`${this.BASE_URL}/available/${treatmentId}`,{params: { date: selectedDate }})
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching available appointments:', error);
        throw error;
      });
  }

  addNewAppointment(newAppointment: Appointment) {
    return api.post(this.BASE_URL, newAppointment)
      .then(res => res.data)
      .catch(error => {
        console.error('Error creating appointment:', error);
        throw error;
      });
  }
}

export default new AppointmentService();
