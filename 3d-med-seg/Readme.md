

# 🏥 3D-UNet Medical Volume Segmenter

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

An end-to-end 3D Medical Imaging pipeline for segmenting volumetric structures (MRI/CT) from NIfTI files. This project utilizes a **3D-UNet** with **Deep Supervision** to capture complex spatial contexts across anatomical slices.

---

## 🚀 Features

* **Volumetric Analysis:** Handles `.nii` and `.nii.gz` files using `nibabel`.
* **3D-UNet Architecture:** Optimized for volumetric spatial context.
* **Deep Supervision:** Implements auxiliary loss branches at different decoder resolutions for better gradient flow and hierarchical feature learning.
* **Modern UI:** A clean, responsive dashboard built with Next.js 14 and Tailwind CSS.
* **Asynchronous Processing:** FastAPI backend for high-performance inference.

---

## 🧠 Model Architecture

The core of this project is a **3D-UNet**. Unlike standard 2D CNNs, this model uses 3D convolutions ($3 \times 3 \times 3$) to learn features across the $X$, $Y$, and $Z$ axes simultaneously.



### Deep Supervision
We compute loss not just at the final output, but also at lower resolutions in the decoder. This "forces" the earlier layers of the decoder to produce meaningful segmentation maps, leading to faster convergence and more robust features.

---

## 🛠️ Installation & Setup

### Backend (Python)
1. Navigate to the backend directory:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt

```

2. Start the FastAPI server:
```bash
uvicorn main:app --reload

```



### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
npm install

```


2. Run the development server:
```bash
npm run dev

```



---

## 📊 Dataset Reference

This model is designed to be trained on:

**[Dataset: Medical Decathlon](http://medicaldecathlon.com/dataaws/)**
---

## 👤 Author

Developed by **saadxsalman**

---

### 📂 Complete File Structure

```text
3d-med-seg/
├── backend/
│   ├── main.py            # FastAPI Logic
│   ├── model.py           # 3D-UNet Architecture
│   ├── utils.py           # NIfTI processing
│   └── .env               # Backend Config
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── .gitignore
│   └── .env               # Frontend Config
└── .gitignore

```