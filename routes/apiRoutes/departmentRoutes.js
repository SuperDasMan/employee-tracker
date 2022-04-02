const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all departments
router.get('/departments', (req, res) => {
  const sql = `SELECT name FROM departments`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Get a single department
router.get('/departments/:id', (req, res) => {
  const sql = `SELECT name FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// View all employees by department
router.get('/departments', (req, res) => {
  const sql = `SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY departments.id`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// View all employees in a single department
router.get('/departments/:id', (req, res) => {
  const sql = `SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// View total budgets by department
router.get('/departments', (req, res) => {
  const sql = `SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id GROUP BY departments.id`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// View total budget of a department
router.get('/departments/:id', (req, res) => {
  const sql = `SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Delete a department
router.delete('/departments/:id', (req, res) => {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(500).json({ error: res.message });
      startPrompt();
    }
    res.json({
      message: 'deleted',
      changes: result.affectedRows,
      id: req.params.id,
    });
  });
});

// Create a department
router.post('/departments', ({ body }, res) => {
  const errors = inputCheck(body, 'name');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO departments (name)
    VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, body) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

module.exports = router;
