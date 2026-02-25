import { secureComputeAgg } from "../../../packages/computation-engine"; 
import { WeaviateClient } from "../services/weaviateClient";

export class ComputationAgent {
  private weaviate: WeaviateClient;

  constructor() {
    this.weaviate = new WeaviateClient();
  }

  async execute(plan: any) {
    console.log("🚀 Starting secure computation for genes:", plan.target_genes);

    // 1. Fetch encrypted shards from Weaviate based on the Query Agent's plan
    const shards = await this.weaviate.getEncryptedShards(plan.target_genes);

    // 2. Call the Rust engine via the NAPI-RS bridge
    // This happens at native C++/Rust speed
    const secureResult = secureComputeAgg(shards);

    // 3. Log the operation to the Audit Trail (could be MongoDB or Solana)
    return {
      result: secureResult.encrypted_sum,
      metadata: {
        noise: secureResult.noise_level,
        shards_processed: shards.length
      }
    };
  }
}