import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  sessionId: { type: String, required: true, index: true },
  role: { type: String, enum: ['human', 'ai'], required: true },
  content: { type: String, required: true },
  intent: { type: String }, // Storing detected intent for analytics
  timestamp: { type: Date, default: Date.now },
});

const SessionSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, default: 'saadsalmanakram' },
  title: { type: String, default: 'New Conversation' },
  lastActive: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', MessageSchema);
export const Session = mongoose.model('Session', SessionSchema);