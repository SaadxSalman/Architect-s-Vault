import pytest
from agents.sentiment_analysis import analyze_market_sentiment

def test_sentiment_format():
    # We mock or use a test key to ensure the function returns a string/score
    result = analyze_market_sentiment("Bitcoin hits all time high")
    assert isinstance(result, str)
    assert len(result) > 0

def test_modeling_logic():
    from agents.modeling_agent import ModelingAgent
    agent = ModelingAgent("TSLA")
    prediction = agent.run_simulation(sentiment_score=0.5)
    assert prediction > 0 # Ensure no negative pricing errors