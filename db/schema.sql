DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    title
    salary
    
)

CREATE TABLE employee(
    id
    first_name
    last_name
    role_id
    manager_id
)