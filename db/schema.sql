DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    role_title VARCHAR(30) NOT NULL, 
    role_salary DECIMAL,
    department_id INT,
    department_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT, 
    PRIMARY KEY (id), 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    roles VARCHAR(30) NOT NULL,
    emp_dep VARCHAR(30) NOT NULL,
    FOREIGN KEY (roles_id) 
    REFERENCES roles(id)
);