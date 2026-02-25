from smolagents import tool
import requests
import pandas as pd

@tool
def fetch_cdc_data(dataset_id: str, limit: int = 100) -> str:
    """
    Fetches data from the CDC Socrata API given a dataset ID.
    Args:
        dataset_id: The unique identifier for the CDC dataset (e.g., '9mfq-cb36' for COVID cases).
        limit: Number of records to fetch.
    """
    base_url = f"https://data.cdc.gov/resource/{dataset_id}.json"
    params = {"$limit": limit}
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        df = pd.DataFrame(response.json())
        return df.head(10).to_string() # Return a snippet for the agent to analyze
    except Exception as e:
        return f"Error fetching data: {str(e)}"