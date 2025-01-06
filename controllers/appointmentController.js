const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');
const Customer = require('../models/Customer');

const appointmentController = {
    createAppointment: async (request, response) => {
        try {
            const { customerId, date, time } = request.body;

            const newAppointment = new Appointment({
                customerId,
                date,
                time
            });

            const savedAppointment = await newAppointment.save();

            const customer = await Customer.findById(customerId);

            // send email to customer
            await sendEmail({
                to: customer.email,
                subject: 'Appointment Confirmation',
                text: `Your appointment is confirmed on ${date} at ${time}`
            });

            response.status(201).json(savedAppointment);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getAllAppointments: async (request, response) => {
        try {
            const appointments = await Appointment.find().select('-__v');

            response.status(200).json(appointments);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = appointmentController;