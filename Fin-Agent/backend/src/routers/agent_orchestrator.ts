export const orchestratorRouter = router({
  generateFullAnalysis: publicProcedure
    .input(z.object({ ticker: z.string() }))
    .mutation(async ({ input }) => {
      // 1. Get Sentiment
      const sentiment = await runPythonAgent('sentiment_analysis.py', input.ticker);
      
      // 2. Get Memory Context from Qdrant
      const context = await runPythonAgent('vector_storage.py', `--query ${input.ticker}`);
      
      // 3. Get Prediction
      const prediction = await runPythonAgent('modeling_agent.py', input.ticker);
      
      // 4. Return Final Report
      return {
        ticker: input.ticker,
        report: `Full report for ${input.ticker} based on ${sentiment}...`,
        prediction: prediction
      };
    }),
});