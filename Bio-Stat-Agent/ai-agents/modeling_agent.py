from smolagents import CodeAgent, HfApiModel

model = HfApiModel(model_id="google/gemma-3-7b-it")

# This agent can write and execute python code to perform stats
modeling_agent = CodeAgent(
    tools=[], 
    model=model,
    add_base_tools=True # Enables the python interpreter
)

def perform_analysis(hypothesis_data, data_path):
    prompt = f"""
    Using the hypothesis: {hypothesis_data['alt_hypothesis']}
    And the dataset located at: {data_path}
    
    1. Load the data using pandas.
    2. Perform a {hypothesis_data['recommended_test']}.
    3. Calculate the p-value and confidence intervals.
    4. Interpret the results (Reject or Fail to Reject H0).
    5. Save a plot of the results as 'result_plot.png'.
    
    Return the p-value and a brief summary.
    """
    
    analysis_result = modeling_agent.run(prompt)
    return analysis_result