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