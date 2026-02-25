import numpy as np
from pymongo import MongoClient

# 1. Connect to your Brain-API Database
client = MongoClient("mongodb://localhost:27017/")
db = client['gemini_game']
collection = db['decisions']

def calculate_grpo_reward(session_id: str):
    """
    Groups actions by timeframe and calculates relative rewards.
    """
    # Fetch recent logs for a specific session
    logs = list(collection.find({"sessionId": session_id}).sort("timestamp", -1).limit(50))
    
    if len(logs) < 5: return None

    # 2. Extract Rewards (Example: Health remaining - deaths)
    # In a real game, you'd pull this from OCR or Game Memory
    rewards = np.array([log['perception']['health'] for log in logs])
    
    # 3. Calculate Relative Advantage
    # GRPO core: (Reward - Group Mean) / Group Std Dev
    mean_reward = np.mean(rewards)
    std_reward = np.std(rewards) + 1e-8
    
    advantages = (rewards - mean_reward) / std_reward

    return advantages

def update_model_weights(advantages, logs):
    """
    This is where you would call model.backward() or use a trainer
    to nudge Gemma-3 toward the actions with positive advantages.
    """
    print(f"Updating model. Top performing action: {logs[0]['strategy']['chosenAction']}")