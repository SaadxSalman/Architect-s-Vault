// apps/admin-next/src/lib/models/Parasite.ts
import mongoose from 'mongoose';

const ParasiteSchema = new mongoose.Schema({
  species_name: { type: String, required: true, unique: true },
  description: String,
  morphology_details: String, // To help with Vision Model training notes
  danger_level: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
  common_regions: [String],
  genomic_reference_id: String, // Foreign key to Milvus strain_id
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Parasite || mongoose.model('Parasite', ParasiteSchema);