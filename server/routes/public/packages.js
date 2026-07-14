const express = require('express');
const Package = require('../../models/Package');

const router = express.Router();

// PUBLIC 
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, packages });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not fetch packages' });
  }
});

module.exports = router;