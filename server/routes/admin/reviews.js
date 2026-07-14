const express = require('express');
const Review = require('../../models/Review');
const requireAdmin = require('../../middleware/auth');

const router = express.Router();
router.use(requireAdmin); 

// GET 
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not fetch reviews' });
  }
});

// PATCH  
router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }

  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ success: false, error: 'Review not found' });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not update review' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not delete review' });
  }
});

module.exports = router;