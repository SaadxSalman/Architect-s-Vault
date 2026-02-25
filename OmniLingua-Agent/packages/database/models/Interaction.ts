import mongoose, { Schema, Document } from 'mongoose';

export interface IInteraction extends Document {
  userId: string;
  originalContent: {
    text?: string;
    mediaUrl?: string; // For audio/video inputs
    type: 'text' | 'audio' | 'video';
  };
  analysis: {
    detectedEmotion: string; // From vision model
    culturalNuances: string[]; // From Cultural Context Agent
    sentimentScore: number;
  };
  generatedOutput: {
    translatedText: string;
    mediaUrl?: string; // For generated audio/video
    language: string;
  };
  createdAt: Date;
}

const InteractionSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  originalContent: {
    text: String,
    mediaUrl: String,
    type: { type: String, enum: ['text', 'audio', 'video'], required: true }
  },
  analysis: {
    detectedEmotion: String,
    culturalNuances: [String],
    sentimentScore: Number
  },
  generatedOutput: {
    translatedText: { type: String, required: true },
    mediaUrl: String,
    language: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Interaction = mongoose.model<IInteraction>('Interaction', InteractionSchema);