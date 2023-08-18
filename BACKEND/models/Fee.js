const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
