import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SERVICES = {
    user: 'http://localhost:3001',
    product: 'http://localhost:3002',
    order: 'http://localhost:3003',
};

// Route to User Service
app.all('/users*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${SERVICES.user}${req.url}`,
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service Unavailable' });
    }
});

// Route to Product Service
app.all('/products*', async (req, res) => {
    try {
        const response = await axios({ method: req.method, url: `${SERVICES.product}${req.url}`, data: req.body });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Product Service Down' });
    }
});

app.listen(3000, () => console.log('🚀 Gateway running on http://localhost:3000'));