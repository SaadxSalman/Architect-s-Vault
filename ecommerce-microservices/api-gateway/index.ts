import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const SERVICES = {
    user: 'http://localhost:5001',
    product: 'http://localhost:5002',
    order: 'http://localhost:5003'
};

// Public Route
app.post('/login', async (req, res) => {
    const response = await axios.post(`${SERVICES.user}/auth/login`, req.body);
    res.json(response.data);
});

// Proxy Product Service
app.get('/products', async (req, res) => {
    const response = await axios.get(`${SERVICES.product}/products`);
    res.json(response.data);
});

// Protected Order Route
app.post('/orders', async (req, res) => {
    // In a real app, verify JWT here first
    try {
        const response = await axios.post(`${SERVICES.order}/orders`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(5000, () => console.log("API Gateway running on 5000"));