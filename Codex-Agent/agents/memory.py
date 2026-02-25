import lancedb
import pandas as pd
from sentence_transformers import SentenceTransformer

class CodeMemory:
    def __init__(self, db_path="data/codex_lancedb"):
        self.db = lancedb.connect(db_path)
        # Use a model specialized for code (like unixcoder or all-MiniLM-L6-v2)
        self.model = SentenceTransformer('flax-sentence-embeddings/all_distilroberta_v1')
        
    def index_code(self, snippets: list[dict]):
        """
        snippets: List of {'path': '...', 'content': '...'}
        """
        data = []
        for s in snippets:
            embedding = self.model.encode(s['content'])
            data.append({
                "vector": embedding,
                "text": s['content'],
                "path": s['path']
            })
        
        # Create or overwrite the table
        self.table = self.db.create_table("code_snippets", data=data, mode="overwrite")

    def search_context(self, query: str, limit=3):
        table = self.db.open_table("code_snippets")
        query_vector = self.model.encode(query)
        
        # Perform vector search
        results = table.search(query_vector).limit(limit).to_pandas()
        return results['text'].tolist()