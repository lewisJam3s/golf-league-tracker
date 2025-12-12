// James
// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

// MongoDB connection
const connectDB = require('./config/db');

// Routes
const playerRoutes = require('./routes/players');
const roundRoutes = require('./routes/rounds');

const app = express();

// Connect to database
connectDB();

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override to allow PUT/DELETE in forms
app.use(methodOverride('_method'));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', (req, res) => {
  res.render('home');
});

// Register routes
app.use('/players', playerRoutes);
app.use('/rounds', roundRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
