const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String },
  coordinates: {
    type: { String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  clue1: { type: String },
  clue2: { type: String },
  clue3: { type: String },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
