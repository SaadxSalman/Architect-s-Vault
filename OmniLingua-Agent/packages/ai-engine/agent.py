import chromadb
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel

# 1. Initialize Cross-Lingual Embeddings
# This model captures subtle linguistic differences across dozens of languages
embedder = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

# 2. Setup Vector Database (ChromaDB)
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="cultural_nuances")

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

def get_cultural_context(query: str):
    """Retrieves relevant cultural norms based on the input text."""
    query_vector = embedder.encode(query).tolist()
    
    results = collection.query(
        query_embeddings=[query_vector],
        n_results=2
    )
    # Extract documents/context metadata
    return results['documents']

def process_translation_with_context(req: TranslationRequest):
    # Step A: Get context
    context = get_cultural_context(req.text)
    
    # Step B: Construct a context-aware prompt
    # In a real scenario, you'd send this to your Multimodal Model (e.g., GPT-4o, Gemini, or Claude)
    refined_prompt = f"""
    Translate the following text from {req.source_lang} to {req.target_lang}.
    
    Cultural Context to consider: {context}
    
    Text: {req.text}
    Ensure the translation is culturally sensitive and nuances are preserved.
    """
    
    return {"prompt": refined_prompt, "context_used": context}