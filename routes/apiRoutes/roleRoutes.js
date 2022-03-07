const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const startPrompt = require('../../server')

// Get all roles
router.get('/roles', (req, res) => {
  const sql = `SELECT title AS "Position", departments.name AS "Department" FROM roles JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Get single role
router.get('/role/:id', (req, res) => {
  const sql = `SELECT title, salary FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Delete a role
router.delete('/role/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: res.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

// Create a role
router.post('/role', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'salary');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO roles (title, salary)
    VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

module.exports = router;