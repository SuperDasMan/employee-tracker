const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all roles
router.get('/roles', (req, res) => {
  const sql = `SELECT title AS "Position", departments.name AS "Department" FROM roles JOIN departments ON roles.department_id = departments.id`;

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

// Get single role
router.get('/roles/:title', (req, res) => {
  const sql = `SELECT title, salary FROM roles WHERE id = ?`;
  const params = [req.params.title];

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

// Delete a role
router.delete('/roles/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: res.message });
      startPrompt();
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a role
router.post('/roles', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'salary');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO roles (title, salary)
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

// Update a role's salary
router.put('/roles/:id', (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, 'role');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE roles SET salary = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, body) => {
    if (err) {
      res.status(500).json({ error: err.message });
      startPrompt();
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// Update a role's department
router.put('/role/:department_id', (req, res) => {
  const errors = inputCheck(req.body, 'role');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE roles SET departments_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      startPrompt();
    } else {
      res.json({
        message: 'success',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;
