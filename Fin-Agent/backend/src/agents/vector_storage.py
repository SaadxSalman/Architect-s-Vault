import uuid
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from openai import OpenAI

# Initialize clients
client = QdrantClient(host="localhost", port=6333)
openai_client = OpenAI()

COLLECTION_NAME = "financial_knowledge"

def init_vector_db():
    # Create collection if it doesn't exist
    if not client.collection_exists(COLLECTION_NAME):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
        )
        print(f"Collection '{COLLECTION_NAME}' created.")

def upsert_financial_data(text, metadata):
    # 1. Generate specialized embedding
    response = openai_client.embeddings.create(
        input=text,
        model="text-embedding-3-small" # High-performance embedding model
    )
    vector = response.data[0].embedding

    # 2. Upsert into Qdrant with metadata (Source, Date, Sentiment)
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={
                    "content": text,
                    "source": metadata.get("source"),
                    "ticker": metadata.get("ticker"),
                    "timestamp": metadata.get("timestamp")
                }
            )
        ]
    )
    return "Data ingested successfully."

# Usage for SEC filings or News
# upsert_financial_data("Apple Q3 Revenue up 5%", {"source": "SEC-10Q", "ticker": "AAPL"})