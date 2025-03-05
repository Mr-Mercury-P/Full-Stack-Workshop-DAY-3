const express = require('express');
const User = require('../models/patient');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'ibuibweuvbwub', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/', (req, res) => {
    res.send("Login api bro");
})

module.exports = router;
