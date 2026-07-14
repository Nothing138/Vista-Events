const express = require('express');
const Review = require('../../models/Review');

const router = express.Router();

// PUBLIC 
router.post('/', async (req, res) => {
  const { name, eventType, rating, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, error: 'Name and message are required' });
  }

  try {
    const review = await Review.create({ name, eventType, rating, message, status: 'pending' });
    res.json({ success: true, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Could not submit review' });
  }
});

// PUBLIC 
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not fetch reviews' });
  }
});

module.exports = router;