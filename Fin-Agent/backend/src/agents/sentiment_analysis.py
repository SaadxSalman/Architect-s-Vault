import base64
import requests
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def analyze_market_sentiment(text_content, chart_path=None):
    prompt = f"Analyze the following market news: {text_content}. Provide a sentiment score from -1 (Bearish) to 1 (Bullish)."
    
    messages = [
        {"role": "system", "content": "You are a senior financial analyst specializing in multi-modal data."},
        {"role": "user", "content": [
            {"type": "text", "text": prompt},
        ]}
    ]

    # Add vision capabilities if a chart is provided
    if chart_path:
        base64_image = encode_image(chart_path)
        messages[0]["content"] += " You must also interpret the attached stock chart for technical patterns."
        messages[1]["content"].append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
        })

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )
    
    return response.choices[0].message.content

# Example usage
# print(analyze_market_sentiment("NVIDIA exceeds earnings expectations", "chart.png"))