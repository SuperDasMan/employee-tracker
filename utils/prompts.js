const inquirer = require('inquirer');
const connection = require('../../mysql2/typings/mysql/lib/Connection');

// Start the prompt functions
function startPrompt() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Update An Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee'],
  }).then( answer => {
    switch (answer.menu) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add A Department':
        addDepartment();
        break;
      case 'Add A Role':
        addRole();
        break;
      case 'Add An Employee':
        addEmployee();
        break;
      case 'Update An Employee Role':
        updateEmployeeRole();
        break;
      case 'Update An Employee Manager':
        updateEmployeeManager();
        break;
      case 'Delete Department':
        deleteDepartment();
        break;
      case 'Delete Role':
        deleteRole();
        break;
      case 'Delete Employee':
        deleteEmployee();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${res.choose}`);
        break;
    }
  })
};

module.exports = startPrompt;