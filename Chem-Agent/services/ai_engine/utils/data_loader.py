import torch
import pandas as pd
from rdkit import Chem
from torch_geometric.data import Data, Dataset

class MoleculeDataset(Dataset):
    def __init__(self, csv_file):
        super().__init__()
        self.df = pd.read_csv(csv_file) # Expects columns: 'smiles' and 'target'

    def _get_atom_features(self, mol):
        all_node_feats = []
        for atom in mol.GetAtoms():
            # Basic features: Atomic Number, Degree, and Formal Charge
            node_feats = [
                atom.GetAtomicNum(),
                atom.GetDegree(),
                atom.GetFormalCharge(),
                atom.GetIsAromatic() * 1.0
            ]
            all_node_feats.append(node_feats)
        return torch.tensor(all_node_feats, dtype=torch.float)

    def _get_edge_index(self, mol):
        adj_list = []
        for bond in mol.GetBonds():
            i = bond.GetBeginAtomIdx()
            j = bond.GetEndAtomIdx()
            # Graph is undirected, so we add both directions
            adj_list.append([i, j])
            adj_list.append([j, i])
        return torch.tensor(adj_list, dtype=torch.long).t().contiguous()

    def len(self):
        return len(self.df)

    def get(self, idx):
        smiles = self.df.iloc[idx]['smiles']
        target = self.df.iloc[idx]['target']
        
        mol = Chem.MolFromSmiles(smiles)
        
        x = self._get_atom_features(mol)
        edge_index = self._get_edge_index(mol)
        y = torch.tensor([target], dtype=torch.float)
        
        return Data(x=x, edge_index=edge_index, y=y)