const express = require('express');
const Package = require('../../models/Package');
const requireAdmin = require('../../middleware/auth');
const { upload, uploadBufferToCloudinary } = require('../../config/cloudinary');

const router = express.Router();
router.use(requireAdmin);

// POST 
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, inclusions, featured, order } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'vista-events-packages');
      imageUrl = result.secure_url;
    }

    const pkg = await Package.create({
      name,
      price,
      description,
      inclusions: inclusions ? JSON.parse(inclusions) : [],
      featured: featured === 'true',
      order: order || 0,
      image: imageUrl,
    });

    res.json({ success: true, package: pkg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Could not create package' });
  }
});

// PUT 
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, inclusions, featured, order } = req.body;
    const updateData = { name, price, description, featured: featured === 'true', order };

    if (inclusions) updateData.inclusions = JSON.parse(inclusions);

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'vista-events-packages');
      updateData.image = result.secure_url;
    }

    const pkg = await Package.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!pkg) return res.status(404).json({ success: false, error: 'Package not found' });

    res.json({ success: true, package: pkg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Could not update package' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not delete package' });
  }
});

module.exports = router;