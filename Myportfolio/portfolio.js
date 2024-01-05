const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3009;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sairam@2979',
    database: 'portfolio'
});

// Add error handling to the MySQL connection
connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // Exit the application if the connection fails
    }
    console.log('Connected to MySQL');
});

// Modify the POST endpoint to include more detailed error handling
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO port1 (name, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('MySQL insertion error:', err);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
            return;
        }

        console.log('Data inserted into MySQL');
        res.send('Message Sent Successfully!');
    });
});

// Add a generic error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

