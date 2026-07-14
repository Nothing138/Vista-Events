const express = require('express');
const GalleryImage = require('../../models/GalleryImage');
const requireAdmin = require('../../middleware/auth');
const { upload, cloudinary, uploadBufferToCloudinary } = require('../../config/cloudinary');

const router = express.Router();
router.use(requireAdmin);

// POST 
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'Image file is required' });
  }

  try {
    const { title, eventType, order } = req.body;

    const result = await uploadBufferToCloudinary(req.file.buffer, 'vista-events-gallery');

    const image = await GalleryImage.create({
      title,
      eventType,
      order: order || 0,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.json({ success: true, image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Could not upload image' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ success: false, error: 'Image not found' });

    await cloudinary.uploader.destroy(image.cloudinaryId);
    await GalleryImage.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Could not delete image' });
  }
});

module.exports = router;