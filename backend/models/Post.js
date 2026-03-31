const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  author: { type: String, default: 'KICCPA Team' },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String },
  videoUrl: { type: String },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
