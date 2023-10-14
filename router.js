// Import the necessary modules
const express = require('express');
const router = express.Router();
const controller = require('./controller')
// Define routes
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post('/register', controller.register)

module.exports = router;
