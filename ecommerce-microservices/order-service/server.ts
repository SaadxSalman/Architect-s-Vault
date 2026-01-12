import express from 'express';
import axios from 'axios';
import { verifyToken } from '../shared/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

app.post('/orders', verifyToken, async (req: any, res: any) => {
    const { productId, quantity } = req.body;

    try {
        // 1. Inter-service call: Order -> Product Service
        const productRes = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
        const product = productRes.data.find((p: any) => p.id === productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // 2. Logic: Calculate total
        const total = product.price * quantity;

        // 3. Response: Mock order confirmation
        res.json({
            orderId: Math.floor(Math.random() * 10000),
            user: req.user.user,
            product: product.name,
            total: `$${total}`,
            status: 'Confirmed'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reach Product Service' });
    }
});

app.listen(3003, () => console.log('🛒 Order Service on port 3003'));