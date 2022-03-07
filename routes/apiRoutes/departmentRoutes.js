const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const startPrompt = require('../../server')

// Get all departments
router.get('/departments', (req, res) => {
  const sql = `SELECT name FROM departments`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Get a single department
router.get('/department/:id', (req, res) => {
  const sql = `SELECT name FROM departments WHERE id = ?`;
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

// View all employees by department
router.get('/department/:id', (req, res) => {
  const sql = `SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY departments.id`;
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

// View all employees in a single department
router.get('/department/:id', (req, res) => {
  const sql = `SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?`;
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

// View total budgets by department
router.get('/department/:id', (req, res) => {
  const sql = `SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id GROUP BY departments.id`;
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

// Delete a department
router.delete('/department/:id', (req, res) => {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(500).json({ error: res.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

// Create a department
router.post('/department', ({ body }, res) => {
  const errors = inputCheck(body, 'name');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO departments (name)
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

// Update a department's role
router.put('/department/:id', (req, res) => {
  const errors = inputCheck(req.body, 'role_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE departments SET role_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

module.exports = router;