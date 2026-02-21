import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';

dotenv.config({ path: '../../.env' });

const app = express();
app.use(express.json());
app.use(cors());

// Webhook for Lemon Squeezy
app.post('/api/webhook', (req, res) => {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || 'secret';
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
  const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    return res.status(401).send('Invalid signature');
  }

  console.log('💰 Payment Webhook Received:', req.body.meta.event_name);
  res.status(200).send('Webhook Processed');
});

// Professional PDF Invoice
app.get('/api/invoice/:orderId', (req, res) => {
  const { orderId } = req.params;
  const doc = new jsPDF();

  // Header Styling
  doc.setFillColor(2, 132, 199); // Sky-600
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('MEDFLOW', 20, 25);
  doc.setFontSize(10);
  doc.text('OFFICIAL MEDICAL INVOICE', 20, 32);

  // Content
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.text(`Invoice ID: ${orderId}`, 20, 60);
  doc.text(`Patient: saadxsalman`, 20, 70);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);

  // Table Simulation
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 90, 190, 90);
  doc.text('Description', 20, 100);
  doc.text('Amount', 160, 100);
  doc.line(20, 105, 190, 105);
  
  doc.text('Prescription Bundle + Service Fee', 20, 115);
  doc.text('$146.40', 160, 115);

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a digitally generated medical receipt.', 20, 280);

  const pdfOutput = Buffer.from(doc.output('arraybuffer'));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${orderId}.pdf`);
  res.send(pdfOutput);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));