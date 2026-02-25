export interface GenomicMetadata {
  variant_id: string;
  chromosome: number;
  position: number;
  reference_allele: string;
  observed_allele: string;
}

export interface PrivacyQuery {
  id: string;
  researcher_id: string;
  natural_language_input: string; // e.g., "Find Alzheimer's variants"
  privacy_threshold: number;      // Epsilon value for Differential Privacy
  status: 'PENDING' | 'COMPUTING' | 'VALIDATING' | 'COMPLETED' | 'FAILED';
}

export interface AgentResponse {
  agent_name: 'Query' | 'Computation' | 'Validation';
  timestamp: number;
  payload: string; // Encrypted result or log
  signature: string; // Verification from the agent
}