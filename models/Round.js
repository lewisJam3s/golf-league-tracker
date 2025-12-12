// Hakan 
// models/Round.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const roundSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    min: 18,
    max: 200
  },
  holes: {
  type: Number,
  enum: [9, 18],
  required: true
  },
  par: {
  type: Number,
  required: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Round', roundSchema);
