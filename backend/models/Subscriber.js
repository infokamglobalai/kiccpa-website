const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  status: { type: String, enum: ['pending', 'active', 'unsubscribed'], default: 'pending' },
  confirmHash: { type: String, default: '' },
  unsubHash: { type: String, default: '' },
  confirmExpires: { type: Date, default: null },
  confirmedAt: { type: Date, default: null },
  unsubscribedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', SubscriberSchema);
