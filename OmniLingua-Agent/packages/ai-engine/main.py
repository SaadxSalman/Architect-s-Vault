from sentence_transformers import SentenceTransformer
import chromadb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agent import process_translation_with_context

app = FastAPI()

class AgentRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

@app.get("/health")
def health_check():
    return {"status": "AI Engine is online"}

@app.post("/process")
async def process_agent_request(req: AgentRequest):
    try:
        # Calls the logic from the Cultural Context Agent
        result = process_translation_with_context(req)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Initialize the cross-lingual embedding model
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
client = chromadb.Client()
collection = client.get_or_create_collection(name="cultural_context")

def get_contextual_response(query):
    query_embedding = model.encode(query).tolist()
    # Retrieval logic from ChromaDB
    results = collection.query(query_embeddings=[query_embedding], n_results=2)
    return results


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)