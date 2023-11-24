const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // for parsing application/json

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase'
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT password FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        res.status(500).send('Server error');
      } else if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid credentials');
        }
      } else {
        res.status(404).send('User not found');
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
