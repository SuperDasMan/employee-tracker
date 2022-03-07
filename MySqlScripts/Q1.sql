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
  INDEX dep_ind (department_id),
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
  INDEX manager_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO departments (name)
VALUES
  ('Legal'),
  ('Finance'),
  ('Enginerring'),
  ('Sales');
  
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

SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Position", roles.salary AS "Salary", departments.name AS "Department", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id WHERE employees.id = 4;

SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", departments.name AS "Department" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id;

DELETE FROM employees WHERE id = 4;
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Peter', 'Greenway', 4, null);

SELECT first_name, last_name FROM employees JOIN roles ON employees.role_id = roles.id;
SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;

SELECT departments.name AS "Departments", SUM(salary) AS "Total salaries" FROM roles JOIN departments WHERE department_id = departments.id;
             
SELECT salary, departments.name GROUP_CONCAT ([DISTINCT] salary) FROM roles GROUP BY departments.name;
             
SELECT first_name, last_name, roles.title, departments.name, salary, manager_id 
FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments 
ON roles.department_id = departments.id JOIN employees ON employees.manager_id = employees.id;

FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
 
FOREIGN KEY (title) REFERENCES role(id) ON DELETE SET NULL
FOREIGN KEY (manager) REFERENCES manager(id) ON DELETE SET NULL

SELECT COUNT(candidate_id) FROM votes GROUP BY candidate_id;