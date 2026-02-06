import torch
import torch.nn as nn
import torch.nn.functional as F

class UNet3D(nn.Module):
    def __init__(self, in_channels=1, out_channels=1):
        super(UNet3D, self).__init__()
        
        # Encoder
        self.enc1 = self._conv_block(in_channels, 32)
        self.enc2 = self._conv_block(32, 64)
        self.pool = nn.MaxPool3d(2)
        
        # Bottleneck
        self.bottleneck = self._conv_block(64, 128)
        
        # Decoder
        self.up2 = nn.ConvTranspose3d(128, 64, kernel_size=2, stride=2)
        self.dec2 = self._conv_block(128, 64)
        
        self.up1 = nn.ConvTranspose3d(64, 32, kernel_size=2, stride=2)
        self.dec1 = self._conv_block(64, 32)
        
        # Final Outputs
        self.final = nn.Conv3d(32, out_channels, kernel_size=1)
        
        # Deep Supervision Head (Auxiliary output at lower resolution)
        self.ds_head = nn.Conv3d(64, out_channels, kernel_size=1)

    def _conv_block(self, in_c, out_c):
        return nn.Sequential(
            nn.Conv3d(in_c, out_c, kernel_size=3, padding=1),
            nn.BatchNorm3d(out_c),
            nn.ReLU(inplace=True),
            nn.Conv3d(out_c, out_c, kernel_size=3, padding=1),
            nn.BatchNorm3d(out_c),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        # Encoder
        s1 = self.enc1(x)
        p1 = self.pool(s1)
        s2 = self.enc2(p1)
        p2 = self.pool(s2)
        
        # Bottleneck
        b = self.bottleneck(p2)
        
        # Decoder
        d2 = self.up2(b)
        d2 = torch.cat([d2, s2], dim=1)
        d2 = self.dec2(d2)
        
        # Deep Supervision output (from d2 resolution)
        ds_out = self.ds_head(d2)
        
        d1 = self.up1(d2)
        d1 = torch.cat([d1, s1], dim=1)
        d1 = self.dec1(d1)
        
        final_out = self.final(d1)
        
        return final_out, ds_out