const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const register = require('./routes/register');
const doctorRoutes = require('./routes/doctor');
const appointment = require('./routes/appointment');

const app = express();
const login = require('./routes/login');

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send("hi raja");
});
app.use('/login', login);
app.use('/patients', register);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointment);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
