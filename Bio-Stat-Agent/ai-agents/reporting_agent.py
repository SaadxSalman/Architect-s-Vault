from smolagents import CodeAgent, HfApiModel

model = HfApiModel(model_id="google/gemma-3-7b-it")

reporting_agent = CodeAgent(
    tools=[], 
    model=model
)

def generate_report(hypothesis, analysis_results, data_summary):
    prompt = f"""
    You are a Public Health Communication Expert. Create a formal report based on:
    
    Hypothesis: {hypothesis}
    Statistical Results: {analysis_results}
    Data Context: {data_summary}
    
    The report must include:
    1. A clear 'Key Finding' section.
    2. An interpretation of the p-value (Statistical Significance).
    3. Potential policy recommendations.
    4. Limitations of the study (e.g., sample size, confounding variables).
    
    Format the output in clean Markdown.
    """
    
    report_markdown = reporting_agent.run(prompt)
    return report_markdown