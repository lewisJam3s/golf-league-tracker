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

// GET /players/:id/edit - show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).send("Player not found");

    res.render('players/edit', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit form");
  }
});

// GET /players/:id - Show player detail + rounds + stats
router.get('/:id', async (req, res) => {
  try {
    const playerId = req.params.id;

    // find player
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).send("Player not found");

    // find rounds linked to this player
    const rounds = await require('../models/Round').find({ player: playerId })
      .sort({ date: -1 }); // newest first

    // Calculate stats
    let averageScore = null;
    let bestScore = null;

    if (rounds.length > 0) {
      const scores = rounds.map(r => r.score);
      const sum = scores.reduce((a, b) => a + b, 0);

      averageScore = (sum / scores.length).toFixed(1);
      bestScore = Math.min(...scores);
    }

    res.render('players/show', {
      player,
      rounds,
      averageScore,
      bestScore
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading player detail page");
  }
});

// PUT /players/:id - update player
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    await Player.findByIdAndUpdate(req.params.id, { name, email });
    res.redirect(`/players/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating player");
  }
});

// DELETE /players/:id - delete player
router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.redirect('/players');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting player");
  }
});

module.exports = router;