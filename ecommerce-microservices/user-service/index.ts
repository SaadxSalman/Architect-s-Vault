import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const USERS = [{ id: "1", email: "saad@example.com", password: "password123" }];

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
});

app.listen(5001, () => console.log("User Service on 5001"));