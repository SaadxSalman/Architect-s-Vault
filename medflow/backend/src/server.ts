import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { jsPDF } from 'jspdf';
import { v2 as cloudinary } from 'cloudinary';
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

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

// --- 📄 PDF INVOICE ENDPOINT ---
app.get('/api/orders/:id/invoice', async (req, res) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).send("Order not found");

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.text("MEDFLOW PHARMACY INVOICE", 10, 20);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order.id}`, 10, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 50);
  doc.text(`Total Paid: $${order.totalPrice.toFixed(2)}`, 10, 60);
  doc.text("Status: Verified & Processed", 10, 70);

  const pdfBuffer = doc.output('arraybuffer');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdfBuffer));
});

// --- 🛒 STOREFRONT API ---
app.get('/api/products', async (req, res) => {
  res.json(await prisma.product.findMany());
});

app.post('/api/orders', async (req, res) => {
  const { userId, totalPrice, prescriptionUrl } = req.body;
  const order = await prisma.order.create({
    data: { userId, totalPrice, prescriptionUrl, status: 'PENDING' }
  });
  res.json(order);
});

// --- 🛡️ ADMIN API ---
app.get('/api/admin/orders', async (req, res) => {
  res.json(await prisma.order.findMany({ orderBy: { createdAt: 'desc' } }));
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
      to: "saadxsalman@example.com",
      subject: "Your Prescription is on the way!",
      html: `<b>Order #${order.id.slice(-6)}</b> has been shipped.`
    });
  }
  res.json(order);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));