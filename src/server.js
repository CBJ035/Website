require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('tiny')); // Logging HTTP requests

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust based on your application's needs
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query(
    'SELECT password FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Server error');
      }
      if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          // Implement session management or token generation here
          return res.status(200).send('Login successful');
        }
      }
      return res.status(401).send('Invalid credentials');
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
