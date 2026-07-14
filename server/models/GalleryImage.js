const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventType: { type: String },
  imageUrl: { type: String, required: true }, 
  cloudinaryId: { type: String, required: true }, 
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);