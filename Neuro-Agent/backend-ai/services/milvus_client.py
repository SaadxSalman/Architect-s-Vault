from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType

def create_neurological_collection():
    connections.connect("default", host="localhost", port="19533")
    
    fields = [
        FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="patient_id", dtype=DataType.VARCHAR, max_length=100),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=512) # For BiomedCLIP
    ]
    
    schema = CollectionSchema(fields, "Neurological pattern storage")
    return Collection("neuro_embeddings", schema)

def check_connection():
    try:
        connections.connect("default", host="localhost", port="19530")
        print("✅ Successfully connected to Neuro-Agent Milvus Cluster")
    except Exception as e:
        print(f"❌ Connection failed: {e}")

if __name__ == "__main__":
    check_connection()