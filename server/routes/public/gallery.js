const express = require('express');
const GalleryImage = require('../../models/GalleryImage');

const router = express.Router();

// PUBLIC 
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, images });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not fetch gallery' });
  }
});

module.exports = router;