const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String },
  content: { type: String, required: true },
  image: { type: String }, // URL to uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
