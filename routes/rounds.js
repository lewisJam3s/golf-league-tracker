// routes/rounds.js
const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const Player = require('../models/Player');

// GET /rounds/new - Show form to create a new round
router.get('/new', async (req, res) => {
  try {
    const players = await Player.find().sort({ name: 1 });
    res.render('rounds/new', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading form');
  }
});

// POST /rounds - Create a new round
router.post('/', async (req, res) => {
  try {
    const { player, date, course, score, notes } = req.body;

    await Round.create({
      player,
      date,
      course,
      score,
      notes
    });

    res.redirect('/players');  // redirect to player list (we'll improve this later)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating round');
  }
});

module.exports = router;
