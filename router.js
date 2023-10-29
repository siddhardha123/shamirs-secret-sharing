// Import the necessary modules
const express = require('express');
const router = express.Router();
const controller = require('./controller')
// Define routes
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/send-otp',controller.sendOtp)
// router.post('/validate-otp',controller.validateOtp)

module.exports = router;
