const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'books.json');

// Middleware to parse JSON bodies
app.use(express.json());

// --- Helper Functions ---

const readBooks = () => {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const writeBooks = (books) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
};

// --- Routes ---

// 1. GET all books
app.get('/books', (req, res) => {
    const books = readBooks();
    res.json(books);
});

// 2. GET a single book by ID
app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// 3. POST a new book (Create)
app.post('/books', (req, res) => {
    const books = readBooks();
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author
    };

    if (!newBook.title || !newBook.author) {
        return res.status(400).send('Title and Author are required');
    }

    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

// 4. PUT update a book
app.put('/books/:id', (req, res) => {
    let books = readBooks();
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (index === -1) return res.status(404).send('Book not found');

    books[index] = { ...books[index], ...req.body, id: books[index].id }; // Keep original ID
    writeBooks(books);
    res.json(books[index]);
});

// 5. DELETE a book
app.delete('/books/:id', (req, res) => {
    let books = readBooks();
    const filteredBooks = books.filter(b => b.id !== parseInt(req.params.id));
    
    if (books.length === filteredBooks.length) {
        return res.status(404).send('Book not found');
    }

    writeBooks(filteredBooks);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});