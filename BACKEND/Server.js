const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
