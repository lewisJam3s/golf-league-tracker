// routes/players.js
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /players - List all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ name: 1 });
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
    const rounds = await require('../models/Round')
      .find({ player: playerId })
      .sort({ date: -1 });

    // ⭐ STEP 1: Adjust 9-hole rounds, compute net
    rounds.forEach(r => {
      let adjScore = r.score;
      let adjPar = r.par;

      if (r.holes === 9) {
        adjScore *= 2;
        adjPar *= 2;
      }

      r.adjustedScore = adjScore;
      r.adjustedPar = adjPar;
      r.net = adjScore - adjPar;
    });

    // ⭐ STEP 2: Get all net scores (lower is better)
    const netScores = rounds.map(r => r.net).sort((a, b) => a - b);

    // ⭐ STEP 3: Use best 50% only
    let handicapIndex = null;

    if (netScores.length > 0) {
      const countToUse = Math.ceil(netScores.length / 2);
      const bestHalf = netScores.slice(0, countToUse);
      const total = bestHalf.reduce((a, b) => a + b, 0);
      handicapIndex = total / bestHalf.length;
    }

    // ⭐ STEP 4: Golf-style formatting (+8, -1, E)
    let handicapDisplay = "N/A";

    if (handicapIndex !== null) {
      if (Math.abs(handicapIndex) < 0.5) {
        handicapDisplay = "E";
      } else if (handicapIndex > 0) {
        handicapDisplay = `+${Math.round(handicapIndex)}`;
      } else {
        handicapDisplay = `${Math.round(handicapIndex)}`;
      }
    }

    // ⭐ Old stats (still useful)
    let averageScore = null;
    let bestScore = null;

    if (rounds.length > 0) {
      const scores = rounds.map(r => r.score);
      const sum = scores.reduce((a, b) => a + b, 0);

      averageScore = (sum / scores.length).toFixed(1);
      bestScore = Math.min(...scores);
    }

    // ⭐ IMPORTANT: SEND HANDICAP TO THE VIEW!
    res.render('players/show', {
      player,
      rounds,
      averageScore,
      bestScore,
      handicapDisplay
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

