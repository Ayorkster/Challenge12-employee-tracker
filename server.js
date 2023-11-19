const express = require('express');
const { default: inquirer } = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
  );
  
  const init = () => {
    inquirer
        .prompt([
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  