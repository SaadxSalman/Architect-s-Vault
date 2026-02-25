from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer

# 1. Initialize Clients
client = QdrantClient("localhost", port=6333)
model = SentenceTransformer('all-MiniLM-L6-v2') 

COLLECTION_NAME = "agri_knowledge"

# 2. Define Agricultural Knowledge Base
knowledge_base = [
    {
        "issue": "Nitrogen Deficiency",
        "symptoms": "Older leaves turn pale green or yellow (chlorosis), starting at the tips.",
        "recommendation": "Apply nitrogen-rich fertilizer or dispatch drone for urea spraying."
    },
    {
        "issue": "Spider Mites",
        "symptoms": "Fine webbing on leaves, yellow spotting, and leaf curling.",
        "recommendation": "Increase humidity and dispatch drone for targeted miticide application."
    },
    {
        "issue": "Water Stress (Drought)",
        "symptoms": "Wilting during the day, dark blue-green foliage, leaf rolling.",
        "recommendation": "Trigger Irrigation Zone X immediately for 20 minutes."
    }
]

def seed():
    # Create Collection
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    )

    points = []
    for i, item in enumerate(knowledge_base):
        # Create a vector from the symptoms
        vector = model.encode(item["symptoms"]).tolist()
        
        points.append(PointStruct(
            id=i,
            vector=vector,
            payload=item
        ))

    client.upsert(collection_name=COLLECTION_NAME, points=points)
    print(f"✅ Successfully seeded {len(points)} agricultural facts into Qdrant.")

if __name__ == "__main__":
    seed()