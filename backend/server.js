require('dotenv').config();               // Load .env
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import DB connection
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
