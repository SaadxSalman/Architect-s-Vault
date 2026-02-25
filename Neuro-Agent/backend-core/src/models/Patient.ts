import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessment extends Document {
  date: Date;
  gaitScore: number;      // Derived from VideoMAE-v2
  cognitiveScore: number; // Derived from Speech patterns
  imagingRef: string;     // Reference to BiomedCLIP embedding ID in Milvus
  notes: string;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  dateOfBirth: Date,
  history: [
    {
      date: { type: Date, default: Date.now },
      diagnosisResult: Object, // Store the JSON summary from the Diagnostic Agent
      riskLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'] }
    }
  ]
});

export default mongoose.model<IAssessment>('Patient', PatientSchema);