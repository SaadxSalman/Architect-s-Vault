app.post("/api/research/query", async (req, res) => {
  const { prompt } = req.body;

  // 1. Natural Language -> Structured Plan (Query Agent)
  const plan = await queryAgent.translate(prompt);

  // 2. Structured Plan -> Encrypted Result (Computation Agent + Rust)
  const rawResult = await computationAgent.execute(plan);

  // 3. Encrypted Result -> Validated Result (Validation Agent)
  const finalOutput = await validationAgent.validate(rawResult);

  // 4. Log to Solana (Decentralized Index)
  await solanaService.logQuery(prompt, finalOutput.is_valid);

  res.json(finalOutput);
});