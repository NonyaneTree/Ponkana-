const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ponkana_db'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

// Route to get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Route to add a new user
app.post('/users', (req, res) => {
    const { full_name, id_type, id_number, house_number, street_name, town, province, email, phone_number, policies_accepted } = req.body;
    const query = `INSERT INTO users (full_name, id_type, id_number, house_number, street_name, town, province, email, phone_number, policies_accepted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [full_name, id_type, id_number, house_number, street_name, town, province, email, phone_number, policies_accepted || false];

    db.query(query, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'User added successfully', userId: result.insertId });
        }
    });
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(result[0]);
        }
    });
});

// Route to update a user
app.put('/users/:id', (req, res) => {
    const { full_name, id_type, id_number, house_number, street_name, town, province, email, phone_number, policies_accepted } = req.body;
    const query = `UPDATE users SET full_name = ?, id_type = ?, id_number = ?, house_number = ?, street_name = ?, town = ?, province = ?, email = ?, phone_number = ?, policies_accepted = ? WHERE id = ?`;
    const values = [full_name, id_type, id_number, house_number, street_name, town, province, email, phone_number, policies_accepted, req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
});

// Route to delete a user
app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
