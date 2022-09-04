// Importing the DotEnv library, for environments variables
require('dotenv').config();

// Setting up Express
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.json());

// Defining the routes
app.get('/', (req, res) => {
  res.json({message: 'Running!'});
});

app.get('/customers/:id?', (req, res) => {
  let sql;
  if (req.params.id) {
    sql = 'SELECT * FROM customers WHERE ID=?';
    dbQuery(sql, parseInt(req.params.id), res);
  }
  else dbQuery('SELECT * FROM customers', [], res);
});

app.delete('/customers/:id', (req, res) => {
  const sql = 'DELETE FROM customers WHERE id=?';
  const values = parseInt(req.params.id);

  dbQuery(sql, [values], res);
});

app.post('/customers', (req, res) => { 
  const name = req.body.name.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);

  const sql = 'INSERT INTO customers (name, cpf) VALUES (?)';
  const values = [name, cpf];

  dbQuery(sql, [values], res);
});

app.patch('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);

  const sql = 'UPDATE customers SET name=?, cpf=? WHERE id=?';
  const values = [name, cpf, id];

  dbQuery(sql, values, res);
});

// Start listen at specified port
app.listen(port);

// Defining the function of executing database queries
function dbQuery (sql, values = [], res) {
  const conn = mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  conn.query(sql, values, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results);
    conn.end();
    console.log('Query executed!')
  })
}
