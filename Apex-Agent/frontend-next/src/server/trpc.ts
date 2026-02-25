// Inside your tRPC router
getTacticalSuggestion: procedure
  .input(z.object({ currentVector: z.array(z.number()) }))
  .query(async ({ input }) => {
    const similarPlays = await Play.aggregate([
      {
        "$vectorSearch": {
          "index": "vector_index", // Created in MongoDB Atlas
          "path": "situationVector",
          "queryVector": input.currentVector,
          "numCandidates": 10,
          "limit": 3
        }
      }
    ]);

    // Analyze outcomes of similar plays to suggest a counter-move
    return {
      suggestion: "High probability of a cross-field pass. Shift defense to Zone 2.",
      historicalSuccessRate: "74%",
      matchedPlays: similarPlays
    };
  });