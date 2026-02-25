import mongoose, { Schema, model, models } from 'mongoose';

const ThreatSchema = new Schema({
  type: { type: String, required: true }, // e.g., "SQL Injection", "DDoS"
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
  sourceIp: { type: String },
  payloadSnippet: { type: String },
  status: { type: String, default: 'Detected' }, // Detected, Quarantined, Resolved
  createdAt: { type: Date, default: Date.now },
});

export const Threat = models.Threat || model('Threat', ThreatSchema);