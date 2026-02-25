from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel
from tools import fetch_cdc_data  # We will define this next

# Initialize the fine-tuned Gemma-3 model via Hugging Face
model = HfApiModel(model_id="google/gemma-3-7b-it") # Replace with your fine-tuned ID

# Define the Data Retrieval Agent
data_retrieval_agent = CodeAgent(
    tools=[DuckDuckGoSearchTool(), fetch_cdc_data],
    model=model,
    add_base_tools=True
)

def run_research_query(user_query):
    prompt = f"Find public health data relevant to: {user_query}. Provide a summary of available datasets and their sources."
    return data_retrieval_agent.run(prompt)