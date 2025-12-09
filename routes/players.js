// routes/players.js
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /players - List all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ name: 1 }); // sort alphabetically
    res.render('players/index', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading players');
  }
});

// GET /players/new - Show form to create a new player
router.get('/new', (req, res) => {
  res.render('players/new');
});

// POST /players - Create a new player
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    await Player.create({ name, email });
    res.redirect('/players');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating player');
  }
});

// Export router
module.exports = router;
