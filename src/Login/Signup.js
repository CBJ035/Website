const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // for parsing application/json

// MySQL connection setup (adjust with your credentials)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'CBJADMIN',
    password: 'fbpq7q3gg1pbd9+3g19373gdvcye882vfvdh',
    database: 'CBJ_Database'
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email],
            (error, results) => {
                if (error) {
                    return res.status(500).send('Error during registration');
                }
                res.status(201).send('User registered successfully');
            }
        );
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

