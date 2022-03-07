DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test';
flush privileges;