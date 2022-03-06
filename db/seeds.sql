INSERT INTO departments (name)
VALUES
  ('Legal'),
  ('Finance'),
  ('Enginerring'),
  ('Sales');
  
INSERT INTO roles (name, description)
VALUES
  ('Lawyer', 190000, 1),
  ('Legal Team Lead', 250000, 1),
  ('Accountant', 125000, 2),
  ('Account Manager', 160000, 2),
  ('Software Engineer', 120000, 3),
  ('Lead Engineer', 150000, 3),
  ('Salesperson', 80000, 4),
  ('Sales Manager', 95000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 2),
  ('Jack', 'London', 2, null),
  ('Robert', 'Bruce', 3, 4),
  ('Peter', 'Greenaway', 4, null),
  ('Derek', 'Jarman', 5, 6),
  ('Paolo', 'Pasolini', 6, null),
  ('Heathcote', 'Williams', 7, 8),
  ('Sandy', 'Powell', 8, null);
  