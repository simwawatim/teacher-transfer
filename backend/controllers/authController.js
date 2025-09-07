const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { username, password, role, teacherData } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) 
      return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let teacherProfile = null;

    // Create teacher profile only for teacher/headteacher
    if (role === 'teacher' || role === 'headteacher') {
      if (!teacherData) {
        return res.status(400).json({ message: 'Teacher data is required for teacher/headteacher' });
      }

      // Validate that currentSchool exists
      const school = await School.findById(teacherData.currentSchool);
      if (!school) {
        return res.status(400).json({ message: 'Current school does not exist' });
      }

      teacherProfile = new Teacher({
        ...teacherData,
        designation: role === 'headteacher' ? 'Head Teacher' : 'Teacher'
      });

      await teacherProfile.save();
    }

    // Create user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'teacher',
      teacherProfile: teacherProfile ? teacherProfile._id : null
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: newUser._id,
      teacherProfileId: teacherProfile ? teacherProfile._id : null
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
