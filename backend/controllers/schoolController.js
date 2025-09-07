const School = require('../models/School');
const Teacher = require('../models/Teacher');

// Create a new school
exports.createSchool = async (req, res) => {
  try {
    const { name, code, district, province } = req.body;
    const existing = await School.findOne({ code });
    if (existing) return res.status(400).json({ message: 'School code already exists' });

    const school = new School({ name, code, district, province });
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all schools
exports.getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single school
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update school
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete school
exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json({ message: 'School deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
