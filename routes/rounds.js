// Hakan

// routes/rounds.js
const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const Player = require('../models/Player');


// GET /rounds/new/:playerId - Add round for a specific player
router.get('/new/:playerId', async (req, res) => {
  try {
    const players = await Player.find().sort({ name: 1 });
    const preselectedPlayer = req.params.playerId;

    res.render('rounds/new', { players, preselectedPlayer });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading pre-filled round form");
  }
});

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

    res.redirect(`/players/${player}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating round');
  }
});

// GET /rounds/:id/edit - show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const round = await Round.findById(req.params.id);
    const players = await Player.find().sort({ name: 1 });

    if (!round) return res.status(404).send("Round not found");

    res.render('rounds/edit', { round, players });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading round edit form");
  }
});

// PUT /rounds/:id - update round
router.put('/:id', async (req, res) => {
  try {
    const { player, date, course, score, notes } = req.body;

    await Round.findByIdAndUpdate(req.params.id, {
      player,
      date,
      course,
      score,
      notes
    });

    res.redirect(`/players/${player}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating round");
  }
});

// DELETE /rounds/:id - delete round
router.delete('/:id', async (req, res) => {
  try {
    const round = await Round.findById(req.params.id);
    const playerId = round.player;

    await Round.findByIdAndDelete(req.params.id);

    res.redirect(`/players/${playerId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting round");
  }
});


module.exports = router;
