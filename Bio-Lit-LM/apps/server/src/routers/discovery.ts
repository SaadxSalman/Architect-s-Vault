export const discoveryRouter = t.router({
  findBridges: t.procedure
    .input(z.object({ topicA: z.string(), topicB: z.string() }))
    .mutation(async ({ input }) => {
      // 1. Get raw connections from Rust
      const bridges = await discover_connections(input.topicA, input.topicB, "bio-lit");

      // 2. Ask LLM to synthesize the connection
      const prompt = `
        I found two research clusters that are mathematically related.
        Cluster A: ${input.topicA}
        Cluster B: ${input.topicB}
        Evidence: ${bridges.join(", ")}
        
        Task: Propose a new inter-disciplinary research hypothesis based on these connections.
      `;

      const aiResponse = await callLlama3(prompt); // Your LLM call wrapper
      return { hypothesis: aiResponse, evidence: bridges };
    }),
});