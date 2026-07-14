require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');

// Public routes 
const publicReviewRoutes = require('./routes/public/reviews');
const publicPackageRoutes = require('./routes/public/packages');
const publicGalleryRoutes = require('./routes/public/gallery');

// Admin routes 
const adminAuthRoutes = require('./routes/admin/auth');
const adminReviewRoutes = require('./routes/admin/reviews');
const adminPackageRoutes = require('./routes/admin/packages');
const adminGalleryRoutes = require('./routes/admin/gallery');

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  try {
    await transporter.sendMail({
      from: `"Vista Events Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <h3>New Consultation Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || '—'}</p>
      `,
    });

    res.json({ success: true, message: 'Inquiry sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

//Public API
app.use('/api/reviews', publicReviewRoutes);
app.use('/api/packages', publicPackageRoutes);
app.use('/api/gallery', publicGalleryRoutes);

// Admin API
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/reviews', adminReviewRoutes);
app.use('/api/admin/packages', adminPackageRoutes);
app.use('/api/admin/gallery', adminGalleryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});