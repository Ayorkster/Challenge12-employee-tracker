// const express = require('express');
const dotenv = require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
  );
  
  const init = () => {
    inquirer.prompt([
            {
                type: 'list',
                message:'What can I help you with today?',
                choices: [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                ],
                name:'options'
            }

        ])
        .then((answers) => {
            switch (answers.options){
                case 'View all Departments':
                    viewDept();
                    break;
                
                case 'View all Roles':
                    viewRole();
                    break;
                
                case 'View all Employees':
                    viewEmp();
                    break;

                case 'Add a Department':
                    addDept();
                    break;

                case 'Add a Role':
                    addRole();
                    break;

                case 'Add an Employee':
                    addEmp();
                    break;

                case 'Update an Employee Role':
                    updateEmpRole();
                    break;
            }
        });
  };

  const viewDept = ()=> {
    const query = "SELECT * FROM department";
    db.query(query, (err,results) => {
        if(err){
            console.log("unable to retrieve departments", err);
            return;
        }
        console.table(results);
        init();
    }); 
  };

  const viewRole = ()=> {
    const query = "SELECT * FROM role";
    db.query(query, (err,results) => {
        if(err){
            console.log("unable to view roles", err);
            return;
        }
        console.table(results);
        init();
    }); 
  };

  const viewEmp = ()=> {
    const query = "SELECT * FROM employee";
    db.query(query, (err,results) => {
        if(err){
            console.log("unable to retrieve employees", err);
            return;
        }
        console.table(results);
        init();
    }); 
  };

  const addDept = () => {
    inquirer
        .prompt([
           { 
            type: 'input',
            message: 'What would you like to call your new department?',
            name: 'add_dept',
           }
        ])
        .then((answers) => {
            addNewDept(answers.add_dept);
        });
  };

  const addNewDept = (newDept) => {
    const query = "INSERT INTO department (department_name) VALUES (?)";
    db.query(query, [newDept], (err, results) => {
      if (err) {
        console.log("Unable to add department", err);
        return;
      }
      console.table(results);
      viewDept();
    });
  };

  const addEmp = () => {
    inquirer
        .prompt([
           { 
            type: 'input',
            message: 'What is the Employees FIRST NAME?',
            name: 'first_name',
           },
           { 
            type: 'input',
            message: 'What is the Employees LAST NAME?',
            name: 'last_name',
           },
           { 
            type: 'input',
            message: 'What is the Employees ROLE?',
            name: 'role',
           },
           { 
            type: 'input',
            message: 'Who is the Employees MANAGER?',
            name: 'manager',
           }
        ])
        .then((answers) => {
            addNewEmp(answers.first_name,
                answers.last_name,
                answers.role,
                answers.manager);
        });
  };

  const addNewEmp = (first_name, last_name, role, manager) => {
    const query = "INSERT INTO employee (first_name, last_name, role, manager) VALUES (?, ?, ?, ?)";
    db.query(query, [firstName, lastName, role, manager], (err,results) => {
        if(err){
            console.log("unable to add employee", err);
            return;
        }
        console.table(results);
        viewEmp();
    }); 
  };
  
 init();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  