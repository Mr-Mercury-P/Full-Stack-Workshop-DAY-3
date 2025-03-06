const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "ibuibweuvbwub"); // Replace with your actual secret key
        req.userId = decoded.userId; // Attach userId to request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

router.post("/add", authenticateUser, async (req, res) => {
    console.log("hi from add");

    try {
        const { doctorId, date, time, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ error: "Invalid doctor ID" });
        }

        const appointment = new Appointment({
            patientId: req.userId, // Extracted from token
            doctorId,
            date,
            time,
            status
        });
        console.log(appointment);

        await appointment.save();
        res.status(201).json({ message: "Appointment created successfully", appointment });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/add", async (req, res) => {
    res.send("Hi from appointments");
});

module.exports = router;
