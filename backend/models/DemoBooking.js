const mongoose = require('mongoose');

const TIME_PREFS = ['morning', 'afternoon', 'evening', 'flexible'];

const DemoBookingSchema = new mongoose.Schema({
  referenceId: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  workEmail: { type: String, required: true },
  organization: { type: String, required: true },
  jobTitle: { type: String, default: '' },
  phone: { type: String, default: '' },
  countryRegion: { type: String, required: true },
  productInterest: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  timePreference: { type: String, enum: TIME_PREFS, required: true },
  timezone: { type: String, default: '' },
  goals: { type: String, required: true },
  source: { type: String, default: 'demo-page' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DemoBooking', DemoBookingSchema);
