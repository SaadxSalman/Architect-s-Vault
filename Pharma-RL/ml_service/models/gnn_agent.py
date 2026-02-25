# ml_service/models/gnn_agent.py
import torch
from torch_geometric.nn import GCNConv

class MolecularGNN(torch.nn.Module):
    def __init__(self, feature_size):
        super(MolecularGNN, self).__init__()
        self.conv1 = GCNConv(feature_size, 64)
        self.conv2 = GCNConv(64, 128)
        self.fc = torch.nn.Linear(128, 1) # Predicts action values (Q-values)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index
        x = torch.relu(self.conv1(x, edge_index))
        x = torch.relu(self.conv2(x, edge_index))
        return self.fc(x)