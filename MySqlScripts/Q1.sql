DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  manager_id INT,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO departments (name)
VALUES
  ('Legal'),
  ('Finance'),
  ('Enginerring'),
  ('Sales');
INSERT INTO departments (name) VALUE ('Custodial');

INSERT INTO roles (title, salary, department_id)
VALUES
	('Legal Team Lead', 250000, 1),
  ('Lawyer', 190000, 1),
  ('Account Manager', 160000, 2),
  ('Accountant', 125000, 2),
  ('Lead Engineer', 150000, 3),
  ('Software Engineer', 120000, 3),
  ('Sales Manager', 95000, 4),
  ('Salesperson', 80000, 4);
INSERT INTO roles (title, salary, department_id) 
	VALUES ('Lead Custodian', 35000, 5),
				 ('Janitor', 30000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, null),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 3, null),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 5, null),
  ('Paolo', 'Pasolini', 6, 5),
  ('Heathcote', 'Williams', 7, null),
  ('Sandy', 'Powell', 8, 7);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Candy', 9, null),
       ('Steven', 'Universe', 10, 9);  

SHOW DATABASES;
SHOW TABLES;

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT name FROM departments;
SELECT title, salary FROM roles;
SELECT first_name, last_name FROM employees;

SELECT first_name, manager_id
FROM employees
WHERE manager_id = 3;

SELECT title AS "Position", departments.name AS "Department" FROM roles JOIN departments ON roles.department_id = departments.id;

SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id WHERE employees.id = 4;
SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id WHERE employees.id = 4;
SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id GROUP BY employees.manager_id;


SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY departments.id;
SELECT departments.name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE departments.id = 2;

SELECT CONCAT(first_name, ' ' ,last_name) AS "Full Name" FROM employees;

DELETE FROM employees WHERE employees.id = 9;
INSERT INTO employees (first_name, last_name, roles.title, manager_id) VALUES ('Peter', 'Greenway', 9, null);
DELETE FROM roles WHERE roles.id = 9;
INSERT INTO roles (title, salary, department_id) VALUES ('Janitor', 30000, 5);
DELETE FROM departments WHERE departments.id = 5;
INSERT INTO departments (name) VALUE ('Janitorial');


SELECT first_name, last_name FROM employees JOIN roles ON employees.role_id = roles.id;
SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;

SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id GROUP BY departments.id;
SELECT departments.name AS "Department", SUM(roles.salary) AS "Total Budget" FROM roles JOIN employees ON roles.id= employees.role_id JOIN departments ON roles.department_id = departments.id WHERE departments.id = 2;

SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;
SELECT CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;

SELECT roles.title AS "Position", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id;
SELECT departments.name AS "Department", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.salary AS "Salary", roles.title AS "Position" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY employees.role_id;
SELECT departments.name AS "Department", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.salary AS "Salary", roles.title AS "Position" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id GROUP BY roles.department_id;

SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id WHERE employees.manager_id <> "null" GROUP BY employees.manager_id;

SELECT * FROM roles JOIN employees ON role_id = roles.id LEFT JOIN employees e ON e.manager_id = employees.id;

SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Full Name", roles.title AS "Position", departments.name AS "Department" FROM employees JOIN roles ON roles.id = role_id JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id WHERE employees.id <> e.id GROUP BY employees.manager_id;

SELECT employees.id AS "EmpID", CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", employees.manager_id AS "ManID", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees LEFT JOIN employees e on employees.manager_id = e.id;

SELECT title AS "Position", salary AS "Salary", departments.name AS "Department" FROM roles JOIN departments ON department_id = departments.id;
SELECT roles.id, roles.title AS "Position" FROM roles JOIN employees ON roles.id = employees.role_id;
SELECT employees.id, CONCAT(employees.first_name, ' ' ,employees.last_name) AS "Employee", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees RIGHT JOIN employees e on employees.manager_id = e.id WHERE employees.manager_id <> "null";

SELECT departments.id AS "Dept. ID#", departments.name AS "Department" FROM departments JOIN roles ON departments.id = department_id GROUP BY name;

SELECT departments.id AS "Dept", departments.name AS "Department" FROM departments LEFT JOIN roles ON departments.id = department_id GROUP BY name;
SELECT departments.id AS "Dept", departments.name AS "Department" FROM roles RIGHT JOIN departments ON department_id = departments.id GROUP BY name;
SELECT department_id, departments.id, departments.name AS "Department" FROM roles RIGHT JOIN departments ON department_id = departments.id GROUP BY name;

SELECT roles.id AS "RoleID", roles.title AS "Position", role_id FROM roles JOIN employees ON role_id = roles.id;

UPDATE employees SET role_id = 10 WHERE id = 10;
UPDATE employees SET manager_id = 7 WHERE employees.id = 9;

