const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student.js');
const Assignment = require('../models/Assignment.js');
const Fee = require('../models/Fee.js');
const Attendance = require('../models/Attendance.js');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student object
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
    });

    // Save the student in the database
    await newStudent.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ studentId: student._id }, 'your_secret_key');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const dashboard = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.studentId });

    // Fetch student's fees
    const fees = await Fee.find({ student: req.studentId });

    // Fetch student's attendance records
    const attendance = await Attendance.find({ student: req.studentId });

    // Construct the dashboard data object
    const dashboardData = {
      assignments,
      fees,
      attendance,
    };

    res.json({ data: dashboardData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new assignment object
    const newAssignment = new Assignment({
      title,
      description,
      student: req.studentId, // Assuming you have the studentId in the request object after authentication
    });

    // Save the assignment in the database
    await newAssignment.save();

    res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitFees = async (req, res) => {
  try {
    const { amount, date } = req.body;

    // Create a new fee object
    const newFee = new Fee({
      amount,
      date,
      student: req.studentId, // Assuming you have the studentId in the request object after authentication
    });

    // Save the fee in the database
    await newFee.save();

    res.status(201).json({ message: 'Fees submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { date } = req.body;

    // Create a new attendance object
    const newAttendance = new Attendance({
      date,
      student: req.studentId, // Assuming you have the studentId in the request object after authentication
    });

    // Save the attendance in the database
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login, dashboard, submitAssignment, submitFees, markAttendance };
