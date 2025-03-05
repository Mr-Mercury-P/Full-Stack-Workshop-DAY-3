const express = require('express');
const Patient = require('../models/patient');
const router = express.Router();

router.post('/register', async (req, res) =>
{
    try
    {
        const { name, email, password, disease, mobile } = req.body;
        let patient = await Patient.findOne({ email });
        if(patient)
        {
            return res.status(400).json({ message: 'Patient already exists' });
        }
        patient = new Patient({ name, email, password, disease, mobile });
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', async (req, res) =>
{
    try
    {
        const patients = await Patient.find();
        res.status(200).json(patients);
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const patient = await Patient.findById(req.params.id);
        if(!patient)
        {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
