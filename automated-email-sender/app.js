require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// --- DATABASE SETUP ---
const dbPath = path.join(__dirname, 'data', 'database.sqlite');
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));

const db = new sqlite3.Database(dbPath);
db.run(`CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    email TEXT, 
    message TEXT, 
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// --- NODEMAILER SETUP ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- AUTH MIDDLEWARE FOR ADMIN ---
const basicAuth = (req, res, next) => {
    const auth = { login: process.env.ADMIN_USER, password: process.env.ADMIN_PASS };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login === auth.login && password === auth.password) return next();
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
};

// --- ROUTES ---

// Submit Inquiry
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // 1. Save to SQLite
    db.run(`INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)`, [name, email, message], function(err) {
        if (err) return res.status(500).send("Database Error");

        // 2. Load Email Template
        let emailHtml = fs.readFileSync(path.join(__dirname, 'templates', 'welcome.html'), 'utf8');
        emailHtml = emailHtml.replace('{{name}}', name).replace('{{message}}', message);

        // 3. Prepare Mail
        const mailOptions = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Inquiry Received & Welcome Guide',
            html: emailHtml,
            attachments: [{
                filename: 'welcome-guide.pdf',
                path: path.join(__dirname, 'assets', 'welcome-guide.pdf') // Ensure this file exists!
            }]
        };

        // 4. Send Email
        transporter.sendMail(mailOptions, (error) => {
            if (error) console.error("Email Error:", error);
            res.redirect('/success.html');
        });
    });
});

// Admin Dashboard
app.get('/admin', basicAuth, (req, res) => {
    db.all("SELECT * FROM inquiries ORDER BY sent_at DESC", [], (err, rows) => {
        let rowsHtml = rows.map(r => `
            <tr class="border-b hover:bg-gray-50 transition">
                <td class="p-4 font-medium">${r.name}</td>
                <td class="p-4 text-indigo-600">${r.email}</td>
                <td class="p-4 text-gray-600 text-sm">${r.message}</td>
                <td class="p-4 text-gray-400 text-xs">${new Date(r.sent_at).toLocaleString()}</td>
            </tr>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head><script src="https://cdn.tailwindcss.com"></script><title>Admin Panel</title></head>
            <body class="bg-gray-100 p-10">
                <div class="max-w-6xl mx-auto">
                    <div class="flex justify-between items-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-800">Inquiry Management</h1>
                        <span class="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">${rows.length} Total</span>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 border-b text-gray-500 uppercase text-xs font-bold">
                                <tr>
                                    <th class="p-4">Name</th><th class="p-4">Email</th>
                                    <th class="p-4">Message</th><th class="p-4">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">${rowsHtml}</tbody>
                        </table>
                    </div>
                </div>
            </body>
            </html>
        `);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running: http://localhost:${PORT}`));