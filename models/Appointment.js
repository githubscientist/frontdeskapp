const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema, 'appointments');