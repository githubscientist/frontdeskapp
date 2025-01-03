const express = require('express');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use('/auth', authRouter);

module.exports = app;