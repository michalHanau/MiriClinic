const Controller = require('./Controller');
const PariorityService = require('../services/AppointmentService')
const TreatmentService = require('../services/TreatmentService');
const OpeningHoursService = require('../services/OpeningHoursService')

class AppointmentController extends Controller {
    constructor() {
        super(PariorityService)
        this.treatmentService =  TreatmentService;
        this.openingHoursService = OpeningHoursService
    }

    async getAvailableDates(treatmentId){
        const date = await this.service.getAvailableDates(treatmentId);
        return date;
    }

    async getAvailableAppointment(treatmentId, date) {
        const treatmentDuration = await this.treatmentService.getTreatmentDuration(treatmentId);
        const dayOfWeek = new Date(date).getDay()
        const openingHours = await this.openingHoursService.getOpeningHours(dayOfWeek+1);
        const availableSlots = await this.service.getAvailableAppointment(treatmentDuration, openingHours,date);
        
        return availableSlots;
    }
}

let appointmentController = new AppointmentController();
module.exports = appointmentController;