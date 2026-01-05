require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Required for directory path resolving

const app = express();

// --- Middleware & View Engine Setup ---
app.use(express.urlencoded({ extended: true }));

// Explicitly tell Express where your views folder is
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- MongoDB Connection ---
// It's good practice to check if the URI exists first
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in your .env file.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ Connection error:', err));

// --- Post Schema ---
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// --- ROUTES ---

// 1. Home Page: Get all posts and render index.ejs
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('index', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading posts");
    }
});

// 2. Create Post: Handles the form submission
app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.create({ title, content });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving post");
    }
});

// 3. Delete Post: Handles the delete button click
app.post('/posts/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting post");
    }
});

// --- Server Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});