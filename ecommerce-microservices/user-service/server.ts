import express from 'express';
const app = express();
app.use(express.json());

const users = [{ id: '1', name: 'Saad Salman', email: 'saad@example.com' }];

app.get('/users/profile/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    res.json(user || { error: 'User not found' });
});

app.listen(3001, () => console.log('👤 User Service on port 3001'));