const {prompt} = require('inquirer');
// const express = require('express');
const db = require('../db/connection');
// const router = express.Router();
require('console.table');





// Update manager
const managerUpdate = [
  {
    name: "title",
    type: "rawlist",
    message: "Whose manager do you want to update?",
    choices:  function (){
      let employeesArr = [];
      for (let i = 0; i < res.length; i++) {
        employeesArr.push(res[i].role_id);
      };
      return employeesArr;
    }
  },
    {
      name: "title",
      type: "rawlist",
      message: "Who should their new manager be?",
      choices: function(answer) {
      let employeesArr;
        for (let j = 0; j < res.length; j++) {
          if (res[j].full_name == answer.manager_id);
            managerArr = res[j].full_name;
        };
        return employeesArr;
    }
  }
];

// Delete an employee
const employeeDelete = [
  {
    name: "title",
    type: "rawlist",
    message: "What employee would you like to delete?",
    choices: function (){
      let employeesArr = results[0].map(employees => employees.id);
      return employeesArr;
    }
  }
];

// Add a role
const roleAdd = [
  {
    name: "title",
    type: "input",
    message: "What role would you like to add?"
  },
  {
    name: "salary",
    type: "input",
    message: "How much does this role pay?"
  }
];

// Update role
const roleUpdate = [
  {
    name: "title",
    type: "rawlist",
    message: "Whose role do you want to update?",
    choices:  function (){
      let employeesArr = [];
      for (let i = 0; i < res.length; i++) {
        employeesArr.push(res[i].role_id);
      };
      return employeesArr;
    }
  },
    {
      name: "title",
      type: "rawlist",
      message: "What should their new role be?",
      choices: function(answer) {
      let rolesArr;
        for (let j = 0; j < res.length; j++) {
          if (res[j].title == answer.role_id);
            roleArr = res[j].title;
        };
        return rolesArr;
    }
  }
];

// Delete a role
const roleDelete = [
  {
    name: "title",
    type: "rawlist",
    message: "What role would you like to delete?",
    choices: function (){
      let rolesArr = results[0].map(roles => roles.title);
      return rolesArr;
    }
  }
];

// Add a department
const departmentAdd = [
  {
    name: "name",
    type: "input",
    message: "What department would you like to add?"
  }
];

// Delete a department
const departmentDelete = [
  {
    name: "name",
    type: "rawlist",
    message: "What department would you like to delete?",
    choices: function (){
      let departmentsArr = results[0].map(departments => departments.name);
      return departmentsArr;
    }
  }
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
        'Exit'
      ]
    }])
  .then( answer => {
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
  }).catch((err) => {
    console.log(err);
  })
};

function viewAllEmployees() {
  db.query(`SELECT employees.id AS "ID#", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewAllByRole() {
  db.query(`SELECT roles.id AS "Position ID#", roles.title AS "Position", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewAllByDepartment() {
  db.query(`SELECT departments.id AS "Department ID#", departments.name AS "Department", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.salary AS "Salary", roles.title AS "Position" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewAllByManager() {
  db.query(`SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id WHERE employees.manager_id <> "null" GROUP BY employees.manager_id
  `,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewAllRoles() {
  db.query(`SELECT roles.id AS "Position ID#", title AS "Position", departments.name AS "Department" FROM roles JOIN departments ON roles.department_id = departments.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewAllDepartments() {
  db.query(`SELECT departments.id AS "Position ID#", name AS "Department" FROM departments`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function viewTotalBudgets() {
  db.query(`SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id GROUP BY departments.id`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function addEmployee() {
  const sql = `SELECT * FROM roles JOIN ALL SELECT * FROM employees`;

  db.query(sql, function(err, res) {
    if (err) throw err;
  
    prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
      },
      {
        type: 'rawlist',
        name: 'role_id',
        message: "What is the employee's role?",
        choices: function() {
          let rolesArr = [];
          for (let i = 0; i < res.length; i++) {
            rolesArr.push(res[i].title);
          }
          return rolesArr;
        }
      },
      {
        type: 'rawlist',
        name: 'manager_id',
        message: "What is the id number of the employee's manager?",
        choices: function() {
          let employeesArr = [];
          for (let j = 1; j < res.length; j++) {
            employeesArr.push(res[j].manager_id);
          }
          return employeesArr;
        }
      }
    ])
    
    .then( answer => {
    db.query(`INSERT INTO employees (first_name, last_name, role_id , manager_id) VALUES (?,?,?,?)`,
      (err, res) => {
        console.table(res, answer);
        startPrompt();
      });
    })
  })
};

function addRole(roleAdd) {
  db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function addDepartment() {
  db.query(`INSERT INTO departments (name) VALUE (?)`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function updateEmployeeRole() {
  db.query(`UPDATE employees SET role = ? WHERE id = ?`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function updateEmployeeManager() {
  db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function deleteEmployee() {
  db.query(`DELETE FROM employees WHERE employees.id = ?`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function deleteRole() {
  db.query(`DELETE FROM roles WHERE roles.id = ?`,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};

function deleteDepartment() {
  db.query(`DELETE FROM departments WHERE departments.id = `,
    (err, res) => {
      console.table(res);
      startPrompt();
    });
};


/*const addEmployee = () => {
  db.query(`SELECT title FROM roles`, function(err, res) {
    if (err) throw err;

    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?"
      },
      {
        type: "list",
        name: "role",
        message: "what role does this employee have?",
        choices: function() {
          let rolesArr = [];
          for (let i = 0; i < res.length; i++) {
            rolesArr.push(res[i].title);
          }
          return rolesArr;
        }
      },
      {
        type: "rawlist",
        name: "manager",
        message: "What is the id number of the manager?",
        choices: function (){
          let employeesArr = [];
          for (let i = 0; i < res.length; i++) {
            employeesArr.push(res[i].role_id);
          }
          return new Promise;
        }
        .then(function(answers) {
          let roleArr;
            for (let j = 0; j < dres.length; j++) {
              if (res[j].title == answers.role_id) {
                roleArr = res[j].title;
              }
            } 
            return employeesArr;
        })
      }
    ])

    .then(function(answers) {
      let roleID;
      for (let j = 0; j < res.length; j++) {
        if (res[j].title == answers.role) {
          roleID = res[j].id;
        }
      }
      db.query(
        `INSERT INTO employees SET?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: roleID,
          manager_id: answers.manager
        },
        function(err, res) {
          if (err) throw err;
          console.log("Here are all current employees: ");

          viewAllEmployees();
          startPrompt();
        }
      );
    });
  });
};

const addRole = (res) => {
  db.query(`SELECT name FROM departments`, function(err, dres) {
    if (err) throw err;
      console.log(dres);

      inquirer.prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role you would like to add?"
        },
        {
          type: "input",
          name: "salary",
          message: "How much does this role pay?"
        },
        {
          type: "list",
          name: "departmentName",
          message: "Which department would you like to add the role to?",
          choices: function() {
            let departmentsArr = [];
            for (let i = 0; i < dres.length; i++) {
              departmentsArr.push(dres[i].name);
            }
            return departmentsArr;
          }
        }
      ]).then(function(answers) {

      let departmentID;
        for (let j = 0; j < dres.length; j++) {
          if (dres[j].name == answers.departmentName) {
            departmentID = dres[j].id;
          }
        }

        db.query(
          `INSERT INTO roles SET ?`,
          {
            title: answers.roleName,
            salary: parseInt(answers.salary),
            department_id:parseInt(departmentID)
          },
          function(err, res) {
            if (err) throw err;
              console.log("Here are all current roles: ");

              viewAllRoles();
              startPrompt();
          }
        );
    });
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the department?"
    }
  ])
  .then((res) => {
    db.query(
      `INSERT INTO departments SET ?`,
        {
          name: res.newDep
        },
        function(err, res) {
          if (err) throw err;
            console.log("Here are all current departments: ");

            viewAllDepartments();
            startPrompt();
        }
    );
  });
};

const updateEmployeeRole = (res) => {
  const query = `SELECT * FROM roles`;
  db.query(query, (err, results)=> {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: function (){
          let employeesArr = results[0].map(employees => (employees.first_name, employees.last_name));
            return employeesArr;
        },
        message: "Select a Employee to update their Role."
      },
      {
        name: "newRole",
        type: "rawlist",
        choices: function () {
          let rolesArr = results[1].map(roles => roles.title);
            return rolesArr;
        },
      }
    ]).then((answer) => {
      db.query(`UPDATE employee
        SET role_id = (SELECT id FROM role WHERE title = ?)
        WHERE id = (SELECT id FROM(SELECT id  FROM employees WHERE CONCAT(first_name, " ", last_name)=?)AS tmptable)`, [answer.newRole, answer.employee], (err, results) => {
          if (err) throw err;

          viewEmployeeRole();
          startPrompt();
        });
    });
  })
};*/

// module.exports = { router, startPrompt, menu, employeeAdd, managerUpdate, employeeDelete, roleAdd, roleUpdate, roleDelete, departmentAdd, departmentDelete, viewAllEmployees, viewAllRoles, viewAllDepartments, viewAllByRole, viewAllByDepartment, viewAllByManager, viewTotalBudgets, addEmployee, addRole, addDepartment, updateEmployeeRole, updateEmployeeManager, deleteEmployee, deleteRole, deleteDepartment, exit };
module.exports = { startPrompt };