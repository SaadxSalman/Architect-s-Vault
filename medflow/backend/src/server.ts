import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { jsPDF } from 'jspdf';
import { v2 as cloudinary } from 'cloudinary';
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

const app = express();
const prisma = new PrismaClient();

// Configuration
lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY as string });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors());
app.use(express.json());

// --- 📧 EMAIL SERVICE ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// --- 📄 UPDATED PDF INVOICE ENDPOINT ---
app.get('/api/orders/:id/invoice', async (req, res) => {
  const order = await prisma.order.findUnique({ 
    where: { id: req.params.id },
    include: { items: { include: { product: true } } } 
  });

  if (!order) return res.status(404).send("Order not found");

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.text("MEDFLOW PHARMACY INVOICE", 10, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order.id}`, 10, 35);
  doc.text(`Date: ${order.createdAt.toLocaleDateString()}`, 10, 42);
  doc.text(`Customer ID: ${order.userId}`, 10, 49);

  // Table Header
  doc.setFont("helvetica", "bold");
  doc.text("Product Description", 10, 65);
  doc.text("Qty", 130, 65);
  doc.text("Unit Price", 155, 65);
  doc.text("Total", 185, 65);
  doc.line(10, 67, 200, 67);

  let y = 75;
  doc.setFont("helvetica", "normal");
  order.items.forEach((item) => {
    doc.text(item.product.name, 10, y);
    doc.text(item.quantity.toString(), 130, y);
    doc.text(`$${item.priceAtPurchase.toFixed(2)}`, 155, y);
    doc.text(`$${(item.quantity * item.priceAtPurchase).toFixed(2)}`, 185, y);
    y += 10;
  });

  doc.line(140, y, 200, y);
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: $${order.totalPrice.toFixed(2)}`, 145, y + 10);

  const pdfBuffer = doc.output('arraybuffer');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdfBuffer));
});

// --- 🛒 STOREFRONT API ---
app.get('/api/products', async (req, res) => {
  res.json(await prisma.product.findMany());
});

app.post('/api/orders', async (req, res) => {
  const { userId, cart, prescriptionUrl } = req.body;
  
  // Backend calculation to ensure price integrity
  const total = cart.reduce((sum: number, p: any) => sum + p.price, 0);

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice: total,
        prescriptionUrl,
        status: 'PENDING',
        items: {
          create: cart.map((p: any) => ({
            productId: p.id,
            quantity: 1, 
            priceAtPurchase: p.price
          }))
        }
      }
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// --- 🛡️ ADMIN API ---
app.get('/api/admin/orders', async (req, res) => {
  res.json(await prisma.order.findMany({ 
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' } 
  }));
});

app.patch('/api/admin/orders/:id', async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });

  if (status === 'SHIPPED') {
    await transporter.sendMail({
      from: '"MedFlow" <orders@medflow.com>',
      to: "saadxsalman@example.com", // In production, use order.user.email
      subject: "Your Medical Order is on the way!",
      html: `<h3>Order #${order.id.slice(-6)} Shipped</h3><p>Your medicine is being delivered.</p>`
    });
  }
  res.json(order);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 MedFlow API running on http://localhost:${PORT}`));