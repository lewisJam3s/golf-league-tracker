// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');

// Connect to the database (MongoDB)
const connectDB = require('./config/db');
const { connect } = require('http2');

// Import routes
const playerRoutes = require('./routes/players');
const roundRoutes = require('./routes/rounds');


const app = express();

connectDB();

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static folder (for CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Temporary home route
app.get('/', (req, res) => {
  res.render('home');
});


// Port from .env (or fallback)
const PORT = process.env.PORT || 3000;

// TEMP TEST ROUTES (delete later)
const Player = require('./models/Player');

app.get('/test-create-player', async (req, res) => {
  try {
    const p = await Player.create({ name: "Test Player", email: "test@example.com" });
    res.send(`Created test player with id: ${p._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating test player");
  }
});

// Use routes
app.use('/players', playerRoutes);
app.use('/rounds', roundRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
