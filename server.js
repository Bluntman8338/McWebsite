const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3757295',
    password: 'your_password_here', // Replace with your actual password
    database: 'sql3757295',
});

// Connect to database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Route: Home
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome</h1>
        <a href="/login">Login</a> | <a href="/register">Register</a>
    `);
});

// Route: Register
app.get('/register', (req, res) => {
    res.send(`
        <h2>Register</h2>
        <form method="POST" action="/register">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Register</button>
        </form>
    `);
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Insert user into the database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.send('Error: ' + err.message);
        } else {
            res.send('Registration successful! <a href="/login">Login here</a>');
        }
    });
});

// Route: Login
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check user in the database
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.send('Error: ' + err.message);
        } else if (results.length > 0) {
            res.send(`Welcome, ${username}! <a href="/">Home</a>`);
        } else {
            res.send('Invalid credentials! <a href="/login">Try again</a>');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});