import json
import random
import asyncio
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB - Product Structure
# Features for ML: [Stock Level, Hour of Day, Competitor Price]
PRODUCTS_FILE = "products.json"

def load_products():
    try:
        with open(PRODUCTS_FILE, "r") as f:
            return json.load(f)
    except:
        # Initial Seed Data
        return [
            {"id": i, "name": f"Product {i}", "base_price": 100, "current_price": 100, "stock": random.randint(1, 100)}
            for i in range(1, 11)
        ]

def save_products(data):
    with open(PRODUCTS_FILE, "w") as f:
        json.dump(data, f, indent=4)

def train_and_update_prices():
    """ML Logic: Linear Regression to predict optimal price"""
    products = load_products()
    
    # Mock Training Data: Relationship between Stock/Time/Competitor and Price
    # X = [[Stock, Hour, CompetitorPrice]]
    X = np.array([[10, 9, 95], [50, 14, 105], [5, 20, 110], [100, 12, 90]])
    y = np.array([105, 98, 115, 85]) # The "Optimal" prices learned from past sales
    
    model = LinearRegression()
    model.fit(X, y)

    current_hour = 14 # Mock hour
    for p in products:
        competitor_price = p['base_price'] * random.uniform(0.9, 1.1)
        prediction = model.predict([[p['stock'], current_hour, competitor_price]])
        p['current_price'] = round(float(prediction[0]), 2)
    
    save_products(products)
    print("Optimization Complete: Prices updated via BackgroundTask.")

@app.on_event("startup")
async def startup_event():
    save_products(load_products())

@app.get("/products")
async def get_products(background_tasks: BackgroundTasks):
    # Trigger re-optimization in background so user doesn't wait
    background_tasks.add_task(train_and_update_prices)
    return load_products()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)