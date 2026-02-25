import mongoose from 'mongoose';

const MoleculeSchema = new mongoose.Schema({
  smiles: { type: String, required: true, unique: true }, // Simplified chemical string
  iupacName: String,
  molecularWeight: Number,
  properties: {
    solubility: Number,
    toxicityScore: Number,
    bindingAffinity: Number,
  },
  designAgentNotes: String,
  synthesisPathways: [{
    steps: [String],
    feasibilityScore: Number,
    reagents: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Molecule = mongoose.model('Molecule', MoleculeSchema);