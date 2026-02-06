from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import os
import uuid
from model import UNet3D
from utils import process_nifti, cleanup_temp

app = FastAPI(title="3D Medical Segmentation API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = UNet3D(in_channels=1, out_channels=1).to(device)
model.eval()

@app.post("/segment")
async def segment_volume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.nii', '.nii.gz')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a NIfTI file.")

    temp_filename = f"temp_{uuid.uuid4()}_{file.filename}"
    
    try:
        # Save uploaded file
        with open(temp_filename, "wb") as buffer:
            buffer.write(await file.read())
        
        # Preprocess
        input_tensor, affine, original_shape = process_nifti(temp_filename)
        input_tensor = input_tensor.to(device)
        
        # Inference
        with torch.no_grad():
            # Deep supervision returns two outputs; we take the primary one (index 0)
            prediction, _ = model(input_tensor)
            prob_mask = torch.sigmoid(prediction)
            binary_mask = (prob_mask > 0.5).float()
            
        # Calculate Volume Metrics
        total_voxels = binary_mask.numel()
        detected_voxels = torch.sum(binary_mask).item()
        tumor_ratio = (detected_voxels / total_voxels) * 100

        return {
            "status": "success",
            "filename": file.filename,
            "original_resolution": list(original_shape),
            "tumor_volume_voxels": int(detected_voxels),
            "tumor_percentage": round(tumor_ratio, 4),
            "device_used": str(device)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cleanup_temp(temp_filename)

@app.get("/")
def health_check():
    return {"status": "online", "model": "3D-UNet with Deep Supervision"}