const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Brochure', 'Product Guide', 'Case Study', 'Whitepaper', 'Technical Document', 'Investor Document', 'Institutional Document', 'Video', 'Other'],
    default: 'Brochure'
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: false
  },
  fileType: {
    type: String,
    required: true // e.g., 'pdf', 'image', 'doc'
  },
  fileSize: {
    type: Number, // In bytes
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);
