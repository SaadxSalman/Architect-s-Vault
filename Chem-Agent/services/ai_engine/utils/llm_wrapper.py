class ChemAgentWrapper:
    def __init__(self, model_name="gpt-4-turbo"): # Or your fine-tuned model
        self.model = model_name

    def design_prompt(self, smiles, target_property, gat_analysis):
        """
        Constructs a prompt for the Molecule Design Agent.
        """
        return f"""
        [SYSTEM: EXPERT CHEMIST AGENT]
        You are an autonomous chemical design agent. Your goal is to propose modifications 
        to a lead compound to optimize for: {target_property}.

        [INPUT COMPOUND]
        SMILES: {smiles}
        
        [GATv2 GRAPH ANALYSIS]
        Structural Vulnerabilities: {gat_analysis['vulnerabilities']}
        Predicted Binding Affinity: {gat_analysis['affinity']}

        [TASK]
        1. Propose 3 structural analogs.
        2. Explain the rationale using frontier molecular orbital theory or bioisosterism.
        3. Provide the predicted synthesis difficulty (1-10).

        [OUTPUT FORMAT]
        Return ONLY valid JSON.
        """

    def synthesis_prompt(self, target_smiles, available_reagents):
        """
        Constructs a prompt for the Reaction Prediction Agent.
        """
        return f"""
        [SYSTEM: SYNTHESIS PLANNING AGENT]
        Propose a multi-step synthesis pathway for the molecule: {target_smiles}.
        Available building blocks: {', '.join(available_reagents)}
        
        Focus on high-yield, atom-economical transformations. 
        Cite specific named reactions (e.g., Suzuki Coupling, Buchwald-Hartwig).
        """