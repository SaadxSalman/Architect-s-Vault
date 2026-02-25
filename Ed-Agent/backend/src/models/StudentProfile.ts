import mongoose from 'mongoose';

const StudentProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  currentTopic: String,
  masteryLevels: {
    type: Map,
    of: Number, // 0 to 1 scale
  },
  knowledgeGaps: [String],
  preferredStyle: { type: String, default: "Socratic" }, // e.g., "Direct", "Visual", "Socratic"
  sessionHistory: [{
    timestamp: Date,
    topic: String,
    feedback: String
  }]
});

export const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);