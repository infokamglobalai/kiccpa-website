const mongoose = require('mongoose');

const SchoolSurveySchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },
    schoolName: { type: String, required: true, trim: true },
    curriculum: [{ type: String, trim: true }],
    curriculumOther: { type: String, default: '' },
    contactName: { type: String, required: true, trim: true },
    designation: { type: String, default: '' },
    mobile: { type: String, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    challenges: [{ type: String, trim: true }],
    challengesOther: { type: String, default: '' },
    goals: [{ type: String, trim: true }],
    goalsOther: { type: String, default: '' },
    usingSystems: { type: String, enum: ['yes', 'no', 'unsure', ''], default: '' },
    currentSystemName: { type: String, default: '' },
    demoSolutions: [{ type: String, trim: true }],
    demoMode: { type: String, enum: ['online', 'onsite', 'hybrid', ''], default: '' },
    preferredDateTime: { type: String, default: '' },
    source: { type: String, default: 'resources-page' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SchoolSurvey', SchoolSurveySchema);
