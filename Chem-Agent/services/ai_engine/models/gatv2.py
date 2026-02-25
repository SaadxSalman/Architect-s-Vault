import torch
import torch.nn.functional as F
from torch_geometric.nn import GATv2Conv, global_mean_pool

class ChemGATv2(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, heads=8):
        super(ChemGATv2, self).__init__()
        # Layer 1: Captures local atom environments
        self.conv1 = GATv2Conv(input_dim, hidden_dim, heads=heads)
        # Layer 2: Captures broader molecular context
        self.conv2 = GATv2Conv(hidden_dim * heads, hidden_dim, heads=1)
        
        self.classifier = torch.nn.Linear(hidden_dim, output_dim)

    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch
        
        # 1. Node embeddings
        x = self.conv1(x, edge_index)
        x = F.elu(x)
        x = self.conv2(x, edge_index)
        
        # 2. Readout: Aggregate node features into a single molecular vector
        x = global_mean_pool(x, batch) 
        
        # 3. Final prediction (e.g., toxicity or binding energy)
        return self.classifier(x)