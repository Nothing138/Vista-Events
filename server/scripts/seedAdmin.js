require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists with this email.');
    process.exit(0);
  }

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, 
  });

  console.log('Admin account created:', process.env.ADMIN_EMAIL);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});