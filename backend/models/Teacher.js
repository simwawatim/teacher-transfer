const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tpin: { type: String, required: true, unique: true },
  currentSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  designation: { type: String, enum: ['Teacher', 'Head Teacher'], default: 'Teacher' },
  dateOfJoining: { type: Date },
  status: { type: String, enum: ['active', 'transferred', 'retired'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
