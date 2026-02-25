import torch
import torch.nn as nn
from dgl.nn import GATv2Conv

class GenomicGATv2(nn.Module):
    def __init__(self, in_feats, h_feats, num_classes, num_heads=4):
        super(GenomicGATv2, self).__init__()
        # Layer 1: Multi-head attention on genomic features
        self.conv1 = GATv2Conv(in_feats, h_feats, num_heads)
        # Layer 2: Aggregating heads for final classification/embedding
        self.conv2 = GATv2Conv(h_feats * num_heads, num_classes, 1)

    def forward(self, g, in_feat):
        # g is the DGL graph, in_feat is the genomic marker embeddings
        h = self.conv1(g, in_feat)
        h = h.view(-1, h.size(1) * h.size(2)) # Flatten heads
        h = torch.relu(h)
        h = self.conv2(g, h)
        return h.squeeze()