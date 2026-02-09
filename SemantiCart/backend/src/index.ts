import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { stripe, supabase } from './lib/clients';
import { appRouter } from './trpc/router';
import type Stripe from 'stripe';

const app = express();
app.use(cors());

// --- STRIPE WEBHOOK HANDLER ---
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { error } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      total_amount: session.amount_total! / 100,
      status: 'completed'
    });
    if (error) console.error("Supabase Order Insert Error:", error);
  }

  res.json({ received: true });
});

app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
      user: { id: 'test-user-uuid' } 
    }), 
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});