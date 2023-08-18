const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.js');
const authenticate = require('../middleware/authenticate.js');

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.get('/dashboard', authenticate, studentController.dashboard);
router.post('/assignments', authenticate, studentController.submitAssignment);
router.post('/fees', authenticate, studentController.submitFees);
router.post('/attendance', authenticate, studentController.markAttendance);

module.exports = router;
