
const dotenv = require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');


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
    const query = "SELECT * FROM roles";
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

  const addRole = () => {
    inquirer
        .prompt([
           { 
            type: 'input',
            message: 'What is the role CALLED?',
            name: 'role_title',
           },
           { 
            type: 'input',
            message: 'What DEPARTMENT is the role in?',
            name: 'department_name',
           },
           {
            type: 'input',
            message: 'What is this roles SALARY',
            name: 'role_salary'
           }
        ])
        .then((answers) => {
            addNewRole(
                answers.role_title,
                answers.department_name,
                answers.role_salary
                );
        });
  };

  const addNewRole = (role_title, department_name, role_salary) => {
    const query = "INSERT INTO roles (role_title, department_name, role_salary) VALUES (?, ?, ?)";
    db.query(query, [role_title, department_name, role_salary], (err, results) => {
        if (err) {
            console.log("Unable to add role", err);
            return;
        }
        console.table(results);
        viewRole()
      
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
            name: 'roles',
           },
           {
            type: 'input',
            message: 'what DEPARTMENT does this employee work in?',
            name: 'emp_dep',
           }
        ])
        .then((answers) => {
            addNewEmp(
                answers.first_name,
                answers.last_name,
                answers.roles,
                answers.emp_dep
                );
        });
  };

  const addNewEmp = (first_Name, last_Name, roles, emp_dep) => {
    const query = "INSERT INTO employee (first_name, last_name, roles, emp_dep) VALUES (?, ?, ?, ?)";
    db.query(query, [first_Name, last_Name, roles, emp_dep], (err,results) => {
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
  