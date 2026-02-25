import torch
from transformers import AutoProcessor, LiquidVisionLanguageModelTrainer

# 1. Load the base LiquidAI model
model_id = "liquid/vlm-agri-base"
processor = AutoProcessor.from_pretrained(model_id)

# 2. Define the training arguments
training_args = {
    "output_dir": "./agri-agent-v1",
    "per_device_train_batch_size": 4,
    "learning_rate": 2e-5,
    "num_train_epochs": 3,
    "save_steps": 100,
}

# 3. Initialize Trainer
# Note: This assumes a LiquidAI-compatible training wrapper
trainer = LiquidVisionLanguageModelTrainer(
    model_id=model_id,
    train_dataset="path/to/your/metadata.jsonl",
    args=training_args,
)

trainer.train()
trainer.save_model("./agri-agent-finetuned")