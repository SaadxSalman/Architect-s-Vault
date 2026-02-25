import pandas as pd
from datetime import datetime
import numpy as np

class ModelingAgent:
    def __init__(self, ticker):
        self.ticker = ticker

    def fetch_historical_data(self):
        # In a real scenario, query your custom Time-Series DB here
        # For now, we simulate a DataFrame of historical prices
        data = {
            'timestamp': pd.date_range(end=datetime.now(), periods=10, freq='D'),
            'close': [150, 152, 151, 153, 155, 154, 156, 158, 157, 160]
        }
        return pd.DataFrame(data)

    def run_simulation(self, sentiment_score):
        df = self.fetch_historical_data()
        
        # Simple Predictive Logic: Historical Trend + Sentiment Weight
        last_price = df['close'].iloc[-1]
        trend = (df['close'].iloc[-1] - df['close'].iloc[0]) / len(df)
        
        # Prediction = Current Price + (Trend * weight) + (Sentiment * volatility)
        prediction = last_price + (trend * 1.5) + (sentiment_score * 2.0)
        
        return round(prediction, 2)

# Usage
# agent = ModelingAgent("AAPL")
# print(f"Predicted Price: ${agent.run_simulation(0.8)}") # 0.8 is Bullish sentiment