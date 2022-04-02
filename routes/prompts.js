const { prompt } = require('inquirer');
const express = require('express');
const db = require('../db/connection');
const router = express.Router();
require('console.table');

// Update manager
const managerUpdate = [
  {
    name: 'title',
    type: 'rawlist',
    message: 'Whose manager do you want to update?',
    choices: function () {
      let employeesArr = [];
      for (let i = 0; i < res.length; i++) {
        employeesArr.push(res[i].role_id);
      }
      return employeesArr;
    },
  },
  {
    name: 'title',
    type: 'rawlist',
    message: 'Who should their new manager be?',
    choices: function (answer) {
      let employeesArr;
      for (let j = 0; j < res.length; j++) {
        if (res[j].full_name == answer.manager_id);
        managerArr = res[j].full_name;
      }
      return employeesArr;
    },
  },
];

// Delete an employee
const employeeDelete = [
  {
    name: 'title',
    type: 'rawlist',
    message: 'What employee would you like to delete?',
    choices: function () {
      let employeesArr = results[0].map((employees) => employees.id);
      return employeesArr;
    },
  },
];

// Update role
const roleUpdate = [
  {
    name: 'title',
    type: 'rawlist',
    message: 'Whose role do you want to update?',
    choices: function () {
      let employeesArr = [];
      for (let i = 0; i < res.length; i++) {
        employeesArr.push(res[i].role_id);
      }
      return employeesArr;
    },
  },
  {
    name: 'title',
    type: 'rawlist',
    message: 'What should their new role be?',
    choices: function (answer) {
      let rolesArr;
      for (let j = 0; j < res.length; j++) {
        if (res[j].title == answer.role_id);
        roleArr = res[j].title;
      }
      return rolesArr;
    },
  },
];

// Delete a role
const roleDelete = [
  {
    name: 'title',
    type: 'rawlist',
    message: 'What role would you like to delete?',
    choices: function () {
      let rolesArr = results[0].map((roles) => roles.title);
      return rolesArr;
    },
  },
];

// Delete a department
const departmentDelete = [
  {
    name: 'name',
    type: 'rawlist',
    message: 'What department would you like to delete?',
    choices: function () {
      let departmentsArr = results[0].map((departments) => departments.name);
      return departmentsArr;
    },
  },
];

function startPrompt() {
  prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'Welcome to Employee Tracker! What would you like to do?',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'View All Employees By Role',
        'View All Employees By Department',
        'View All Employees By Manager',
        'View Total Budgets By Department',
        'Add An Employee',
        'Add A Role',
        'Add A Department',
        'Update An Employee Role',
        'Update An Employee Manager',
        'Delete Employee',
        'Delete Role',
        'Delete Department',
        'Exit',
      ],
    },
  ])
    .then((answer) => {
      console.log(answer);
      switch (answer.menu) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Employees By Role':
          viewAllByRole();
          break;
        case 'View All Employees By Department':
          viewAllByDepartment();
          break;
        case 'View All Employees By Manager':
          viewAllByManager();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View Total Budgets By Department':
          viewTotalBudgets();
          break;
        case 'Add An Employee':
          addEmployee();
          break;
        case 'Add A Role':
          addRole();
          break;
        case 'Add A Department':
          addDepartment();
          break;
        case 'Update An Employee Role':
          updateEmployeeRole();
          break;
        case 'Update An Employee Manager':
          updateEmployeeManager();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case 'Exit':
          db.end();
          break;
        default:
          console.log(`Invalid action: ${menu}`);
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function viewAllEmployees() {
  db.query(
    `SELECT employees.id AS "ID#", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllByRole() {
  db.query(
    `SELECT roles.id AS "Position ID#", roles.title AS "Position", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllByDepartment() {
  db.query(
    `SELECT departments.id AS "Department ID#", departments.name AS "Department", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", roles.salary AS "Salary", roles.title AS "Position" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllByManager() {
  db.query(
    `SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id WHERE employees.manager_id <> "null" GROUP BY employees.manager_id
  `,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllRoles() {
  db.query(
    `SELECT roles.id AS "Position ID#", title AS "Position", departments.name AS "Department" FROM roles JOIN departments ON roles.department_id = departments.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllDepartments() {
  db.query(
    `SELECT departments.id AS "Department ID#", name AS "Department" FROM departments`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function viewTotalBudgets() {
  db.query(
    `SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id GROUP BY departments.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    }
  );
}

function addEmployee() {
  const sql1 = `SELECT roles.id, roles.title AS "Position" FROM roles JOIN employees ON roles.id = employees.role_id`;
  const sql2 = `SELECT employees.id, CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees LEFT JOIN employees e on employees.manager_id = e.id WHERE employees.manager_id <> "null"`;
  db.query(sql1, function (err, res1) {
    if (err) throw err;
    db.query(sql2, function (err, res2) {
      if (err) throw err;

      prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?",
        },
        {
          type: 'rawlist',
          name: 'role_id',
          message: "What is the employee's position?",
          choices: function () {
            let rolesArr = [];
            for (let i = 0; i < res1.length; i++) {
              rolesArr.push({ name: res1[i].Position, value: res1[i].id });
            }

            return rolesArr;
          },
        },
        {
          type: 'rawlist',
          name: 'manager_id',
          message: "Who is this employee's manager?",
          choices: function () {
            let managerArr = [];
            for (let i = 0; i < res2.length; i++) {
              managerArr.push({ name: res2[i].Manager, value: res2[i].id });
            }
            return managerArr;
          },
        },
      ]).then((answer) => {
        db.query(
          `INSERT INTO employees (first_name, last_name, role_id , manager_id) VALUES (?,?,?,?)`,
          [
            answer.first_name,
            answer.last_name,
            answer.role_id,
            answer.manager_id,
          ],
          (err, res) => {
            console.table(res, 'Employee successfully added!');
            startPrompt();
          }
        );
      });
    });
  });
}

function addRole() {
  const sql = `SELECT departments.id AS "Dept", departments.name AS "Department" FROM departments LEFT JOIN roles ON departments.id = department_id GROUP BY name`;
  db.query(sql, function (err, res) {
    if (err) throw err;

    prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What role would you like to add?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'How much does this role pay?',
      },
      {
        name: 'department_id',
        type: 'rawlist',
        message: 'In what department is this role?',
        choices: function () {
          let departmentsArr = [];
          for (let i = 0; i < res.length; i++) {
            departmentsArr.push({
              name: res[i].Department,
              value: res[i].Dept,
            });
            console.log(departmentsArr);
          }
          return departmentsArr;
        },
      },
    ]).then((answer) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
        [answer.title, answer.salary, answer.department_id],
        (err, answer) => {
          console.table(res, 'Position successfully added!');
          startPrompt();
        }
      );
    });
  });
}

function addDepartment() {
  const sql = `SELECT departments.id, name AS "Department" FROM departments`;
  db.query(sql, function (err, res) {
    if (err) throw err;

    prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What department would you like to add?',
      },
    ]).then((answer) => {
      db.query(
        `INSERT INTO departments (name) VALUE (?)`,
        [answer.name],
        (err, res) => {
          console.table(res, 'Department successfully added!');
          startPrompt();
        }
      );
    });
  });
}

function updateEmployeeRole() {
  const sql1 = `SELECT employees.id, CONCAT(first_name, ' ' ,last_name) AS "Employee" FROM employees`;
  const sql2 = `SELECT roles.id, roles.title AS "Position" FROM roles`;
  db.query(sql1, function (err, res1) {
    if (err) throw err;
    db.query(sql2, function (err, res2) {
      if (err) throw err;

      prompt([
        {
          type: 'rawlist',
          name: 'employeeId',
          message: 'Which employee would you like to update?',
          choices: function () {
            let employeesArr = [];
            for (let i = 0; i < res1.length; i++) {
              employeesArr.push({ name: res1[i].Employee, value: res1[i].id });
            }
            return employeesArr;
          },
        },
        {
          type: 'rawlist',
          name: 'roleId',
          message: "What is this employee's new position?",
          choices: function () {
            let rolesArr = [];
            for (let j = 0; j < res2.length; j++) {
              rolesArr.push({ name: res2[j].Position, value: res2[j].id });
            }
            return rolesArr;
          },
        },
      ]).then((answer) => {
        console.log(answer);

        db.query(
          `UPDATE employees SET ? WHERE ?`,
          [{ role_id: answer.roleId }, { id: answer.employeeId }],
          (err, res) => {
            console.table(res, "Employee's Position successfully updated!");
            startPrompt();
          }
        );
      });
    });
  });
}

function updateEmployeeManager() {
  const sql1 = `SELECT employees.id, CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee" FROM employees`;
  const sql2 = `SELECT employees.id, CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", employees.manager_id, e.id AS 'ManID', CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees RIGHT JOIN employees e on employees.manager_id = e.id`;
  db.query(sql1, function (err, res1) {
    if (err) throw err;
    db.query(sql2, function (err, res2) {
      if (err) throw err;

      prompt([
        {
          type: 'rawlist',
          name: 'employeeId',
          message: 'Which employee would you like to update?',
          choices: function () {
            let employeesArr = [];
            for (let i = 0; i < res1.length; i++) {
              employeesArr.push({ name: res1[i].Employee, value: res1[i].id });
            }
            return employeesArr;
          },
        },
        {
          type: 'rawlist',
          name: 'ManID',
          message: "Who is this employee's new manager?",
          choices: function () {
            let managerArr = [];
            for (let i = 0; i < res1.length; i++) {
              managerArr.push({ name: res2[i].Manager, value: res2[i].ManID });
            }
            console.log(managerArr);
            return managerArr;
          },
        },
      ]).then((answer) => {
        console.log(answer, 'Hopefully going to the SQL call!');

        db.query(
          `UPDATE employees SET ? WHERE ?`,
          [{ manager_id: answer.ManID }, { id: answer.employeeId }],
          (err, res) => {
            console.log(res, "Employee's Manager successfully updated!");
            startPrompt();
          }
        );
      });
    });
  });
}

function deleteEmployee() {
  const sql = `SELECT employees.id AS "EmpID", CONCAT(first_name, ' ' ,last_name) AS "Employee" FROM employees`;
  db.query(sql, function (err, res) {
    if (err) throw err;

    prompt([
      {
        type: 'rawlist',
        name: 'Employee',
        message: 'Which employee would you like to delete?',
        choices: function () {
          let employeesArr = [];
          for (let i = 0; i < res.length; i++) {
            employeesArr.push({
              name: res[i].Employee,
              value: res[i].EmpID,
            });
          }
          return employeesArr;
        },
      },
    ]).then((answer) => {
      db.query(
        `DELETE FROM employees WHERE employees.id = ?`,
        [answer.EmpID],
        (err, res) => {
          console.table(res);
          startPrompt();
        }
      );
    });
  });
}

function deleteRole() {
  const sql = `SELECT roles.id AS "RoleID", title AS "Position" FROM roles`;
  db.query(sql, function (err, res) {
    if (err) throw err;

    prompt([
      {
        type: 'rawlist',
        name: 'Position',
        message: 'Which position would you like to delete?',
        choices: function () {
          let rolesArr = [];
          for (let i = 0; i < res.length; i++) {
            rolesArr.push({
              name: res[i].Position,
              value: res[i].RoleID,
            });
          }
          return rolesArr;
        },
      },
    ]).then((answer) => {
      db.query(
        `DELETE FROM roles WHERE roles.id = ?`,
        [answer.RoleID],
        (err, res) => {
          console.table(res);
          startPrompt();
        }
      );
    });
  });
}

function deleteDepartment() {
  const sql = `SELECT departments.id AS "DeptID", departments.name AS "Department" FROM departments`;
  db.query(sql, function (err, res) {
    if (err) throw err;

    prompt([
      {
        type: 'rawlist',
        name: 'Department',
        message: 'Which department would you like to delete?',
        choices: function () {
          let departmentsArr = [];
          for (let i = 0; i < res.length; i++) {
            departmentsArr.push({
              name: res[i].Department,
              value: res[i].DeptID,
            });
          }
          return departmentsArr;
        },
      },
    ]).then((answer) => {
      db.query(
        `DELETE FROM departments WHERE departments.id = ?`,
        [answer.DeptID],
        (err, res) => {
          console.table(res);
          startPrompt();
        }
      );
    });
  });
}

module.exports = { startPrompt };
