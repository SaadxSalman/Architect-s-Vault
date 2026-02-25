from fastapi import FastAPI
from pydantic import BaseModel
from rdkit import Chem
from utils.llm_wrapper import ChemAgentWrapper
from models.gatv2 import ChemGATv2

app = FastAPI()
agent = ChemAgentWrapper()

class MoleculeRequest(BaseModel):
    smiles: str

@app.post("/analyze")
async def analyze_molecule(req: MoleculeRequest):
    mol = Chem.MolFromSmiles(req.smiles)
    # Here you would pass 'mol' into your GATv2 model
    num_atoms = mol.GetNumAtoms()
    return {"status": "success", "atoms": num_atoms, "message": "Graph processed via GATv2"}


@app.post("/propose-synthesis")
async def propose(smiles: str):
    # 1. Get structural analysis from Graph Neural Network
    # gat_results = model.predict(smiles) 
    gat_results = {"affinity": 0.85, "vulnerabilities": "ortho-position oxidation"}
    
    # 2. Use LLM to reason over the results
    prompt = agent.design_prompt(smiles, "low toxicity", gat_results)
    
    # 3. Call your Core Model (LLM)
    # response = llm.generate(prompt)
    
    return {"agent_proposal": "Example response based on GATv2 insights..."}