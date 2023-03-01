const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  time: { type: String, required: true },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
});

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;
