# services/ml-api/main.py
from fastapi import FastAPI, UploadFile, File
from pymilvus import connections, Collection
import torch
from pydantic import BaseModel
# from transformers import AutoModelForImageClassification 

app = FastAPI(title="Para-Master ML API")

# Connect to Milvus on Startup
@app.on_event("startup")
def connect_db():
    connections.connect("default", host="localhost", port="19533")
    print("Connected to Milvus")

@app.post("/identify/image")
async def identify_parasite(file: UploadFile = File(...)):
    # 1. Load fine-tuned Swin Transformer
    # 2. Process image
    # 3. Return classification and confidence
    return {"species": "Plasmodium falciparum", "confidence": 0.98}

@app.post("/identify/genomic")
async def search_genomic(sequence: str):
    # 1. Convert sequence to vector embedding
    # 2. Query Milvus collection
    # 3. Return top matches
    return {"matches": ["Strain_A", "Strain_B"]}


class GenomicQuery(BaseModel):
    sequence: str

@app.post("/identify/genomic")
async def search_genomic(query: GenomicQuery):
    # 1. Mock embedding (Replace with your DNABERT/ESM-2 model)
    # query_vector = model.encode(query.sequence)
    query_vector = [0.1] * 768  # Placeholder
    
    # 2. Search Milvus
    collection = Collection("parasite_genomics")
    collection.load()
    
    search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
    results = collection.search(
        data=[query_vector], 
        anns_field="genomic_embedding", 
        param=search_params, 
        limit=5,
        output_fields=["species_name", "strain_id"]
    )

    # 3. Format Response
    matches = []
    for hits in results:
        for hit in hits:
            matches.append({
                "species_name": hit.entity.get("species_name"),
                "strain_id": hit.entity.get("strain_id"),
                "score": hit.distance
            })
            
    return {"matches": matches}