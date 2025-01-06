const express = require('express');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const customerRouter = require('./routes/customerRoutes');
const appointmentRouter = require('./routes/appointmentRoutes');

const app = express();

app.use(express.json()); // parse the request body to json

app.use(cookieParser()); // parse the cookies

app.use('/auth', authRouter);
app.use('/customers', customerRouter);
app.use('/appointments', appointmentRouter);

module.exports = app;