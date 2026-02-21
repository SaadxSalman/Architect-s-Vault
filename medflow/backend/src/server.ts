import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

const app = express();
const prisma = new PrismaClient();

// Configuration
lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY as string });
app.use(cors());
app.use(express.json());

// --- STOREFRONT ENDPOINTS ---

app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post('/api/orders', async (req, res) => {
  const { userId, items, prescriptionUrl, totalPrice } = req.body;
  const order = await prisma.order.create({
    data: { 
      userId, 
      status: 'PENDING', 
      prescriptionUrl, 
      totalPrice 
    }
  });
  res.json(order);
});

// --- LEMON SQUEEZY INTEGRATION ---

app.post('/api/checkout', async (req, res) => {
  const { variantId, userEmail, orderId } = req.body;
  
  const { data, error } = await createCheckout(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutData: { email: userEmail, custom: { orderId } },
      productOptions: { redirectUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success` }
    }
  );

  if (error) return res.status(500).json(error);
  res.json({ url: data?.data.attributes.url });
});

// --- ADMIN KANBAN ENDPOINTS ---

app.get('/api/admin/orders', async (req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(orders);
});

app.patch('/api/admin/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // e.g., 'VERIFIED', 'SHIPPED'
  const updated = await prisma.order.update({
    where: { id },
    data: { status }
  });
  res.json(updated);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 MedFlow Backend on port ${PORT}`));