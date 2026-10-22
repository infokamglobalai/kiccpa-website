const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    jobTitle: { type: String, required: true },
    jobReference: { type: String, required: true },
    department: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    currentTitle: { type: String, default: '' },
    currentCompany: { type: String, default: '' },
    experienceYears: { type: Number, required: true, min: 0 },
    noticePeriod: { type: String, default: '' },
    educationLevel: { type: String, required: true },
    institution: { type: String, required: true },
    graduationYear: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    coverNote: { type: String, required: true },
    resumePath: { type: String, required: true },
    resumeName: { type: String, required: true },
    extraPath: { type: String, default: '' },
    extraName: { type: String, default: '' },
    documents: {
      type: [{ kind: String, path: String, name: String }],
      default: [],
    },
    interviews: {
      type: [{
        round: String,
        when: String,
        mode: String,
        link: String,
        place: String,
        interviewer: String,
        interviewerEmail: String,
        managerEmail: String,
        sent: Boolean,
        error: String,
        author: String,
        at: Date,
      }],
      default: [],
    },
    assignments: {
      type: [{
        round: String,
        managerName: String,
        managerEmail: String,
        sent: Boolean,
        error: String,
        author: String,
        at: Date,
      }],
      default: [],
    },
    onboarding: { type: mongoose.Schema.Types.Mixed, default: null },
    consent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['submitted', 'screening', 'interview', 'offer', 'hired', 'rejected', 'on-hold'],
      default: 'submitted',
    },
    notes: {
      type: [
        {
          author: String,
          text: String,
          status: String,
          at: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    scores: {
      type: [
        {
          role: Number,
          problem: Number,
          communication: Number,
          experience: Number,
          fit: Number,
          average: Number,
          recommendation: String,
          interviewer: String,
          comment: String,
          author: String,
          at: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    scoreAverage: { type: Number, default: 0 },
    mails: {
      type: [
        {
          to: String,
          subject: String,
          body: String,
          status: String,
          sent: Boolean,
          error: String,
          author: String,
          at: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

JobApplicationSchema.index({ job: 1, email: 1 }, { unique: true });

module.exports = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
