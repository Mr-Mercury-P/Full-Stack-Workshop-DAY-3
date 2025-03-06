const express = require('express');
const Doctor = require('../models/doctor');
const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const patients = await Doctor.find();
        res.status(200).json(patients);
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
