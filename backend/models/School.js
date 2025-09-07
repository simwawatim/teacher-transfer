const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  district: { type: String },
  province: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
