import mongoose from 'mongoose';

const PlaySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  timestamp: { type: Number, required: true }, // Game clock time
  playType: { type: String, required: true },  // e.g., "Pick and Roll", "Corner Kick"
  
  // The 'Knowledge' part: A 768-dimension vector from your ViT model
  situationVector: {
    type: [Number],
    required: true,
  },
  
  metadata: {
    playersInvolved: [String],
    locationOnField: { x: Number, y: Number },
    outcome: String, // e.g., "Score", "Turnover"
  },
  createdAt: { type: Date, default: Date.now },
});

export const Play = mongoose.models.Play || mongoose.model('Play', PlaySchema);