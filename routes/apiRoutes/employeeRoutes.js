const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const startPrompt = require('../../server')

// Get all employees
router.get('/employees', (req, res) => {
  const sql = `SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Get single employee
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id WHERE employees.id = 4;`;
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

// Get all employees by manager
router.get('/employees', (req, res) => {
  const sql = `SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id GROUP BY employees.manager_id`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Get all employees under a single manager
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id WHERE employees.id = 4;
  `;
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

// Create a employee
router.post('/employee', ({ body }, res) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  // Data validation
  const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Update an employee role
router.put('/employee/:id', (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, 'role');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employees SET role = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

// Update an employee manager
router.put('/employee/:id', (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, 'role');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: res.message });
      startPrompt();
    }
    console.table(result);
    startPrompt();
  });
});

module.exports = router;