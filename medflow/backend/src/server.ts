import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';
import path from 'path';
import { fileURLToPath } from 'url';

// --- ESM path helpers ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (medflow/.env)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

// --- Middlewares ---
app.use(express.json());

// Strict CORS: Allows the Next.js frontend to communicate without browser blocks
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// --- Mock Database ---
let orders = [
  { 
    id: 'ORD-7721', 
    customer: 'saadxsalman', 
    items: 'Amoxicillin 500mg (x2)', 
    status: 'Pending', 
    total: 90.00, 
    hasRx: true, 
    date: new Date().toLocaleDateString() 
  },
  { 
    id: 'ORD-1042', 
    customer: 'Guest User', 
    items: 'Stethoscope Pro V3', 
    status: 'Shipped', 
    total: 89.90, 
    hasRx: false, 
    date: new Date().toLocaleDateString() 
  },
];

// --- API Endpoints ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Operational', 
    user: 'saadxsalman', 
    timestamp: new Date().toISOString() 
  });
});

// 2. Get all orders
app.get('/api/orders', (req, res) => {
  res.status(200).json(orders);
});

// 3. Update Order Status (Admin Dashboard Logic)
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex > -1) {
    orders[orderIndex].status = status;
    console.log(`[LOG] Order ${id} updated to: ${status}`);
    return res.status(200).json(orders[orderIndex]);
  }
  res.status(404).json({ message: "Order not found" });
});

// 4. Create New Order (Checkout Logic)
app.post('/api/orders', (req, res) => {
  try {
    const { items, total, hasRx } = req.body;

    if (!items || total === undefined) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: 'saadxsalman', // Verified User
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      items,
      total,
      hasRx
    };

    orders.unshift(newOrder);
    console.log(`[SUCCESS] New Order Created: ${newOrder.id}`);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("[ERROR] Checkout failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 5. Payment Webhook (Lemon Squeezy Integration)
app.post('/api/webhook', (req, res) => {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || 'secret';
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
  const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    console.warn('[SECURITY] Invalid webhook signature received');
    return res.status(401).send('Invalid signature');
  }

  console.log('💰 Payment Webhook Processed Successfully');
  res.status(200).send('Webhook Processed');
});

// 6. Professional PDF Invoice Generator
app.get('/api/invoice/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).send("Invoice not found");
  }

  const doc = new jsPDF();
  
  // Header Design
  doc.setFillColor(2, 132, 199); // Sky-600
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('MEDFLOW', 20, 25);
  doc.setFontSize(10);
  doc.text('OFFICIAL MEDICAL INVOICE', 20, 32);

  // Patient Info
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.text(`Invoice ID: ${orderId}`, 20, 60);
  doc.text(`Patient: ${order.customer}`, 20, 70);
  doc.text(`Date: ${order.date}`, 20, 80);

  // Table
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 90, 190, 90);
  doc.setFont("helvetica", "bold");
  doc.text('Description', 20, 100);
  doc.text('Amount', 160, 100);
  doc.setFont("helvetica", "normal");
  doc.line(20, 105, 190, 105);
  
  doc.text(`${order.items}`, 20, 115);
  doc.text(`$${Number(order.total).toFixed(2)}`, 160, 115);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a digitally generated medical receipt for MedFlow Ecosystem.', 20, 280);

  const pdfOutput = Buffer.from(doc.output('arraybuffer'));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${orderId}.pdf`);
  res.send(pdfOutput);
});

// --- Server Startup ---
const PORT = 5000;

app.listen(PORT, 'localhost', () => {
  console.log(`
  🚀 MedFlow Backend Operational
  👤 User Context: saadxsalman
  📡 API: http://localhost:${PORT}/api/orders
  🌍 Health: http://localhost:${PORT}/api/health
  `);
});