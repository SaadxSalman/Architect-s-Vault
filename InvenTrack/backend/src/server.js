import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// 1. Get Dashboard Stats
app.get('/api/stats', async (req, res) => {
    const { data: products } = await supabase.from('products').select('*');
    
    const totalValue = products.reduce((acc, p) => acc + (p.stock_quantity * p.cost_price), 0);
    const lowStock = products.filter(p => p.stock_quantity <= p.reorder_level).length;
    
    res.json({ totalValue, lowStock, totalProducts: products.length });
});

// 2. Log Transaction & Update Stock (Atomic Logic)
app.post('/api/transactions', async (req, res) => {
    const { product_id, type, quantity } = req.body;

    // 1. Create the transaction log
    const { error: txError } = await supabase.from('transactions').insert([{ product_id, type, quantity }]);
    
    if (txError) return res.status(400).json(txError);

    // 2. Adjust Stock
    const adjustment = type === 'OUT' ? -quantity : quantity;
    
    const { data: product } = await supabase.from('products').select('stock_quantity').eq('id', product_id).single();
    const newQty = (product.stock_quantity || 0) + adjustment;

    const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: newQty })
        .eq('id', product_id);

    res.json({ success: !updateError, newQty });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));