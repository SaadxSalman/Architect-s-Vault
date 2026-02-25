from smolagents import CodeAgent, HfApiModel

model = HfApiModel(model_id="google/gemma-3-7b-it")

hypothesis_agent = CodeAgent(
    tools=[], # This is a pure reasoning agent
    model=model
)

def formulate_hypothesis(research_goal: str):
    prompt = f"""
    You are a Senior Biostatistician. Convert the following research goal into a formal statistical hypothesis:
    "{research_goal}"
    
    Return a JSON object with:
    1. "null_hypothesis": (H0)
    2. "alt_hypothesis": (Ha)
    3. "recommended_test": (e.g., "Linear Regression", "Chi-Square")
    4. "variables": {{"independent": "...", "dependent": "..."}}
    """
    
    response = hypothesis_agent.run(prompt)
    return response