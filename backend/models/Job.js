const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    reference: { type: String, required: true, unique: true },
    department: {
      type: String,
      required: true,
      enum: ['it-digital', 'cloud-devops', 'bot', 'bpo', 'hr', 'platforms', 'corporate'],
    },
    location: { type: String, required: true, trim: true },
    workplace: { type: String, enum: ['onsite', 'hybrid', 'remote'], default: 'hybrid' },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    experienceMin: { type: Number, default: 0 },
    experienceMax: { type: Number, default: 0 },
    openings: { type: Number, default: 1, min: 1 },
    summary: { type: String, required: true },
    about: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    niceToHave: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    salaryCurrency: { type: String, default: 'KWD' },
    salaryMin: { type: Number, default: 0 },
    salaryMax: { type: Number, default: 0 },
    salaryPeriod: { type: String, enum: ['yearly', 'monthly'], default: 'yearly' },
    managerName: { type: String, default: '' },
    managerRole: { type: String, default: '' },
    hiringCountry: { type: String, enum: ['kuwait', 'uae', 'india', 'kenya', 'tunisia', 'other'], default: 'kuwait' },
    documents: { type: [String], default: [] },
    rounds: { type: [String], default: [] },
    deadline: { type: Date, default: null },
    status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
    createdBy: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
