import torch
from torch_geometric.nn import GCNConv, global_mean_pool
import torch.nn.functional as F

class MolecularRewardGNN(torch.nn.Module):
    def __init__(self, num_node_features):
        super(MolecularRewardGNN, self).__init__()
        # Layer 1: Learns local atomic environments
        self.conv1 = GCNConv(num_node_features, 64)
        # Layer 2: Learns larger functional groups
        self.conv2 = GCNConv(64, 128)
        # Final layers to predict a scalar reward
        self.fc1 = torch.nn.Linear(128, 64)
        self.fc2 = torch.nn.Linear(64, 1)

    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch
        
        # 1. Graph Convolutions
        x = F.relu(self.conv1(x, edge_index))
        x = F.relu(self.conv2(x, edge_index))
        
        # 2. Global Pooling (Collapses the graph into a single vector)
        x = global_mean_pool(x, batch) 
        
        # 3. Reward Regression
        x = F.relu(self.fc1(x))
        return torch.sigmoid(self.fc2(x)) # Normalized reward between 0 and 1