import nibabel as nib
import numpy as np
import torch
import torch.nn.functional as F
import os

def process_nifti(file_path, target_shape=(64, 64, 64)):
    """Loads, normalizes, and resizes 3D volume."""
    img = nib.load(file_path)
    data = img.get_fdata()
    
    # 1. Intensity Normalization (Z-score)
    data = (data - np.mean(data)) / (np.std(data) + 1e-8)
    
    # 2. Convert to Tensor [Batch, Channel, D, H, W]
    tensor = torch.from_numpy(data).float()
    
    # Add dimensions if necessary
    if len(tensor.shape) == 3:
        tensor = tensor.unsqueeze(0).unsqueeze(0)
    elif len(tensor.shape) == 4:
        tensor = tensor.unsqueeze(0)
        
    # 3. Spatial Resizing
    tensor = F.interpolate(tensor, size=target_shape, mode='trilinear', align_corners=False)
    
    return tensor, img.affine, data.shape

def cleanup_temp(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)