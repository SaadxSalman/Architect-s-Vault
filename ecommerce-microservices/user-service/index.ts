import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const USERS = [{ id: "1", name: "Saad", email: "saad@example.com" }];

app.post('/login', (req, res) => {
    const { email } = req.body;
    const user = USERS.find(u => u.email === email);
    if (!user) return res.status(404).send("User not found");
    
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET!);
    res.json({ token });
});

app.listen(3001, () => console.log("User Service on :3001"));