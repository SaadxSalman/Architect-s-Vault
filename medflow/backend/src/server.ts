import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';

dotenv.config({ path: '../../.env' });

const app = express();
app.use(express.json());
app.use(cors());

const LEMON_SQUEEZY_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || 'secret';

// 1. Webhook: Listen for Payment Success
app.post('/api/webhook', (req, res) => {
  const hmac = crypto.createHmac('sha256', LEMON_SQUEEZY_SECRET);
  const digest = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
  const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    return res.status(401).send('Unauthorized');
  }

  const { meta, data } = req.body;
  if (meta.event_name === 'order_created') {
    console.log(`✅ Order ${data.id} Paid. Ready for Invoice Generation.`);
    // Here you would typically update your Supabase 'orders' table status to 'paid'
  }
  res.status(200).send('OK');
});

// 2. PDF Invoice Generator
app.get('/api/invoice/:orderId', (req, res) => {
  const { orderId } = req.params;
  const doc = new jsPDF();

  // Simple Professional Template
  doc.setFontSize(22);
  doc.text('MEDFLOW RECEIPT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Customer: saadxsalman`, 20, 50);
  
  doc.line(20, 55, 190, 55);
  doc.text('Item: Medical Supplies Bundle', 20, 65);
  doc.text('Total: $146.40', 150, 65);
  
  doc.setFontSize(10);
  doc.text('Thank you for choosing MedFlow. Stay healthy.', 20, 280);

  const pdfOutput = Buffer.from(doc.output('arraybuffer'));
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${orderId}.pdf`);
  res.send(pdfOutput);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));