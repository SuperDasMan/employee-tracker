const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all salaries by department
router.get('/salaries', (req, res) => {
  const sql = `SELECT salary FROM roles `;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    startPrompt();
  });
});

// Create a vote
router.post('/vote', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'employee_id', 'salary_id');
  if (errors) {
    res.status(500).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO salaries (employee_id, salary_id) VALUES (?,?)`;
  const params = [body.employee_id, body.salary_id];

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