import mongoose, { Schema, Document } from 'mongoose';

export interface IDecision extends Document {
  sessionId: string;
  timestamp: Date;
  perception: {
    enemyDetected: boolean;
    health: number;
  };
  strategy: {
    rawThought: string; // The full text from Gemma-3
    chosenAction: string;
  };
  reward?: number; // For GRPO learning feedback
}

const DecisionSchema: Schema = new Schema({
  sessionId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  perception: {
    enemyDetected: { type: Boolean, default: false },
    health: { type: Number },
  },
  strategy: {
    rawThought: { type: String },
    chosenAction: { type: String },
  },
  reward: { type: Number },
});

export default mongoose.model<IDecision>('Decision', DecisionSchema);