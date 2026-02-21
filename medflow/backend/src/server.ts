import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get All Products (Storefront)
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Create Order (Verification Logic)
app.post('/api/orders', async (req, res) => {
  const { userId, items, prescriptionUrl } = req.body;
  
  // Logic: Check if any item needs Rx
  const needsRx = items.some((item: any) => item.isPrescriptionRequired);
  if (needsRx && !prescriptionUrl) {
    return res.status(400).json({ error: "Prescription required for these items." });
  }

  const order = await prisma.order.create({
    data: { userId, status: 'PENDING', prescriptionUrl, items: { create: items } }
  });
  res.json(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));