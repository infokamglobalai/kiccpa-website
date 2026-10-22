const mongoose = require('mongoose');

const StaffUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'hr', 'manager', 'seo', 'marketing'], required: true },
    phone: { type: String, default: '' },
    title: { type: String, default: '' },
    department: { type: String, default: '' },
    active: { type: Boolean, default: true },
    lastSeen: { type: Date },
    resetTokenHash: { type: String, default: '' },
    resetExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.models.StaffUser || mongoose.model('StaffUser', StaffUserSchema);
