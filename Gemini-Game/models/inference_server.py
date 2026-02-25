import base64
import io
import torch
from fastapi import FastAPI, Request
from PIL import Image
from transformers import AutoModelForCausalLM, AutoProcessor

app = FastAPI()

# 1. Load Models (Gemma-3 for strategy + Vision for perception)
# Note: Using 4-bit quantization helps run this on consumer GPUs
model_id = "google/gemma-3-4b-it" # or your specific vision model
processor = AutoProcessor.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    device_map="auto", 
    trust_remote_code=True,
    torch_dtype=torch.float16
)

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    
    # 2. Decode the image sent by Rust
    img_bytes = base64.b64decode(data['image'])
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    
    # 3. Create a prompt for Gemma-3
    # We ask the model to analyze the image and provide a game action
    prompt = "Analyze this game frame. Detect enemies and suggest the next best move (shoot, move_forward, or idle)."
    
    inputs = processor(text=prompt, images=image, return_tensors="pt").to("cuda")
    
    # 4. Generate Strategy
    with torch.no_grad():
        output = model.generate(**inputs, max_new_tokens=50)
        response_text = processor.decode(output[0], skip_special_tokens=True)

    # 5. Logic to parse response (Simplified for this guide)
    action = "idle"
    if "shoot" in response_text.lower(): action = "shoot"
    elif "move" in response_text.lower(): action = "move_forward"

    return {
        "action": action,
        "enemy_found": "enemy" in response_text.lower(),
        "raw_thought": response_text,
        "stats": {"health": 100} # You can add OCR here to read health bars
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)