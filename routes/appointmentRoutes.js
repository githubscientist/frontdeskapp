const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const appointmentRouter = express.Router();

appointmentRouter.post('/', appointmentController.createAppointment);
appointmentRouter.get('/', appointmentController.getAllAppointments);

module.exports = appointmentRouter;