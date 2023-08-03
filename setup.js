const express = require('express');
const app = express();
const port = 3000; // Choose the port you want to run your server on

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'your_db_username',
  password: 'your_db_password',
  database: 'your_db_name',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});


app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products'; // Replace 'products' with your table name
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Something went wrong' });
      return;
    }
    res.json(result);
  });
});
