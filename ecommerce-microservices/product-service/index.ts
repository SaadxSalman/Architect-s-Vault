import express from 'express';
const app = express();

const PRODUCTS = [
    { id: "p1", name: "Mechanical Keyboard", price: 100 },
    { id: "p2", name: "Gaming Mouse", price: 50 }
];

app.get('/products', (req, res) => res.json(PRODUCTS));

app.listen(3002, () => console.log("Product Service on :3002"));