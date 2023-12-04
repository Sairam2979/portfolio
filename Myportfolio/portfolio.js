const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3003;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sairam@2979',
    database: 'portfolio'
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});
app.use(express.static(__dirname + '/portfolio.html'));
app.use(express.static(__dirname + '/portfolio.css'));
app.use(express.static(__dirname + '/portfolio.js'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO port1 (name, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('MySQL insertion error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        console.log('Data inserted into MySQL');
        res.send('Message Sent Successfully!');
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});

