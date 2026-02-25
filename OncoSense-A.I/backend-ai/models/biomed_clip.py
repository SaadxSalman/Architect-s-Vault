# backend-ai/models/biomed_clip.py
from transformers import AutoProcessor, AutoModel
from PIL import Image
import torch

class BiomedCLIPProcessor:
    def __init__(self, model_name="microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224"):
        self.processor = AutoProcessor.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    def get_image_embedding(self, image_path_or_pil_image):
        """Generates a vector embedding for a pathology image."""
        if isinstance(image_path_or_pil_image, str):
            image = Image.open(image_path_or_pil_image).convert("RGB")
        else: # Assume PIL Image object
            image = image_path_or_pil_image

        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            image_features = self.model.get_image_features(**inputs)
        return image_features.cpu().numpy() # Return numpy array for easier use

    def get_text_embedding(self, text):
        """Generates a vector embedding for medical text."""
        inputs = self.processor(text=text, return_tensors="pt", padding=True, truncation=True).to(self.device)
        with torch.no_grad():
            text_features = self.model.get_text_features(**inputs)
        return text_features.cpu().numpy()

# Initialize globally or as needed
# biomed_clip_model = BiomedCLIPProcessor()