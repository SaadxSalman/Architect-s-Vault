# services/ml-api/initialize_milvus.py
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

def init_milvus():
    # 1. Connect to the standalone Milvus instance
    connections.connect("default", host="localhost", port="19530")
    
    collection_name = "parasite_genomics"
    
    # 2. Check if collection exists and drop if necessary (for clean start)
    if utility.has_collection(collection_name):
        utility.drop_collection(collection_name)

    # 3. Define Schema
    # dim: 768 is common for BERT-based genomic models
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="species_name", dtype=DataType.VARCHAR, max_length=100),
        FieldSchema(name="strain_id", dtype=DataType.VARCHAR, max_length=50),
        FieldSchema(name="genomic_embedding", dtype=DataType.FLOAT_VECTOR, dim=768)
    ]
    
    schema = CollectionSchema(fields, "Collection for parasite genomic embeddings")
    collection = Collection(collection_name, schema)

    # 4. Create Index (IVF_FLAT is good for balance of speed and accuracy)
    index_params = {
        "metric_type": "L2",
        "index_type": "IVF_FLAT",
        "params": {"nlist": 128}
    }
    
    collection.create_index(field_name="genomic_embedding", index_params=index_params)
    print(f"✅ Collection '{collection_name}' initialized successfully.")

if __name__ == "__main__":
    init_milvus()