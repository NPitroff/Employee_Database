// ============DECLARE THE NPM PACKAGES USED IN THE APPLICATION ================//
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sequelize = require("sequelize");
//=============DECLARE THE CONNECTION TO INITIATE THE SQL DATABASE================//
var connection = mysql.createConnection({
  host: "localhost",
  //======PORT NUMBER=======//
  port: 3306,
  //=========USERNAME========//
  user: "root",
  //========PASSWORD & DATABASE BEING USED=========//
  password: "J0rd4n@(*&^%$#2814",
  database: "employee_trackerdb",
});
//===============COMMAND TO THROW ERROR OR INITIATE INQUIRER UPON STARTUP============//
connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});
//===============INQUIRER COMMAND PATH QUESTION 1====================//
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "GREETINGS! WHAT WOULD YOU LIKE TO DO?",
      choices: [
        "ADD Department, Role, and/or Employee",
        "VIEW CURRENT Department, Role, and/or Employee's",
        "UPDATE An Employee Role",
      ],
    })
    //==============PATH TO THE 'ADD' SELECTOR============//
    .then(function (answer) {
      switch (answer.action) {
        case "ADD Department, Role, and/or Employee":
          addInformation();
          break;
        //===============PATH TO THE 'VIEW' SELECTOR==========//
        case "VIEW CURRENT Department, Role, and/or Employee's":
          viewInformation();
          break;
        //===============PATH TO THE 'UPDATE' SELECTOR========//
        case "UPDATE An Employee Role":
          updateInformation();
          break;
      }
    });
}
// ====================FUNCTION ROUTE's TO ADD INFORMATION TO THE DEPARTMENT, ROLE, AND EMPLOYEE=============//
function addInformation() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      Message: "WHAT INFORMATION WOULD YOU LIKE TO ADD?",
      choices: ["ADD department", "ADD role", "ADD employee"],
    })
    //=======IF YOU WANT TO ADD TO THE DEPARTMENT========
    .then(function (answer) {
      switch (answer.action) {
        case "ADD department":
          addDepartment();
          break;
        //========IF YOU WANT TO ADD TO THE ROLE=============
        case "ADD role":
          addRole();
          break;
        //========IF YOU WANT TO ADD TO THE EMPLOYEE===========
        case "ADD employee":
          addEmployee();
          break;
      }
    });
}

//=============ADD INFORMATION TO THE DEPARTMENT================//
function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "PLEASE INPUT THE NAME OF THE NEW DEPARTMENT",
    })
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          _name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("NEW DEPARTMENT ADDED");
          //======RESET TO BEGINNING OF PROMPT====
          runSearch();
        }
      );
    });
}
//======================ADD INFORMATION TO THE ROLE==================//
function addRole() {
  connection.query(
    "SELECT * FROM department",
    function (err, departmentResponse) {
      if (err) throw err;
      console.log(departmentResponse);
      inquirer
        .prompt([
          {
            name: "role",
            type: "input",
            message: "PLEASE INPUT THE NAME OF THE NEW ROLE",
          },
          {
            name: "salary",
            type: "input",
            message: "PLEASE INPUT THE SALARY OF THE NEW ROLE",
          },
          {
            name: "department_id",
            type: "rawlist",
            message: "PLEASE INPUT THE DEPARTMENT ID OF THE NEW ROLE",
            choices:
              // function(){
              //     let choiceArray = [];
              //     departmentResponse.forEach((depart)=>{
              //         let name = depart.name;
              //         let value = depart.id;
              //         choiceArray.push({name, value})
              //     });
              //     return choiceArray;
              // }
              departmentResponse.map((department) => {
                return {
                  name: department._name,
                  value: department.id,
                };
              }),
          },
        ])
        .then(function (answer) {
          console.log(answer);
          var query = connection.query(
            "INSERT INTO current_role SET ?",
            {
              title: answer.role,
              salary: answer.salary,
              department_id: answer.department_id,
            },
            function (err) {
              if (err) throw err;
              console.log("NEW ROLE ADDED");
              //======RESET TO BEGINNING OF PROMPT====
              runSearch();
            }
          );
        });
    }
  );
}
//===============================FUNCTION FOR ADD EMPLOYEE=================================//
function addEmployee() {
  connection.query("SELECT * FROM current_role", function (err, roleResp) {
    if (err) throw err;
    console.log(roleResp);
    //
    connection.query("SELECT * FROM employee", function (err, empResp) {
      if (err) throw err;
      console.log(empResp);
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "PLEASE INPUT THE FIRST NAME OF THE NEW EMPLOYEE",
          },
          {
            name: "last_name",
            type: "input",
            message: "PLEASE INPUT THE LAST NAME OF THE NEW EMPLOYEE",
          },
          {
            name: "role_id",
            type: "rawlist",
            message: "PLEASE INPUT THE ROLE ID OF THE NEW EMPLOYEE",
            choices: roleResp.map((role) => {
              return {
                name: role.title,
                value: role.id,
              };
            }),
          },
          {
            name: "manager_id",
            type: "rawlist",
            message: "PLEASE INPUT THE MANAGER NAME",
            choices: function () {
              let choiceArray = [];

              empResp.map((employee) => {
                let name = employee.first_name + " " + employee.last_name;
                let value = employee.id;
                choiceArray.push({ name, value });
              });
              let name = "N/A";
              let value = 0;
              choiceArray.push({ name, value });
              return choiceArray;
            },
          },
        ])
        .then(function (answer) {
          console.log(answer);
          //IN CASE MANAGER IS IF THE MANAGER NAME IS "N/A"
          if (answer.manager_id === 0) {
            answer.manager_id = null;
          }
          var query = connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id,
            },
            function (err) {
              if (err) throw err;
              console.log("NEW ROLE ADDED");
              //======RESET TO BEGINNING OF PROMPT====
              runSearch();
            }
          );
        });
    });
  });
}
//====================FUNCTION ROUTE FOR VIEWING DEPT, ROLE, AND/OR EMPLOYEE================//
function viewInformation() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      Message: "WHAT INFORMATION WOULD YOU LIKE TO DISPLAY?",
      choices: ["VIEW department", "VIEW role", "VIEW employee"],
    })
    //==================IF YOU WANT TO VIEW THE DEPARTMENT===========
    .then(function (answer) {
      switch (answer.action) {
        case "VIEW department":
          viewDepartment();
          break;
        //========IF YOU WANT TO VIEW THE ROLE=============
        case "VIEW role":
          viewRole();
          break;
        //========IF YOU WANT TO VIEW THE EMPLOYEE===========
        case "VIEW employee":
          viewEmployee();
          break;
      }
    });
}
//======================VIEW DEPARTMENT========================================//
function viewDepartment() {
  connection.query(
    "SELECT department.id, department._name FROM department",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      runSearch();
    }
  );
}
//=====================VIEW ROLES===========================================//
function viewRole() {
  connection.query(
    "SELECT current_role.id, current_role.title, current_role.salary, current_role.department_id FROM current_role",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      runSearch();
    }
  );
}
//======================VIEW EMPLOYEE'S========================//
function viewEmployee() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      runSearch();
    }
  );
}
//========================FUNCTION ROUTE TO UPDATE THE EMPLOYEE ROLE=============================//
function updateInformation() {
  connection.query("SELECT * FROM employee", function (err, employeeResponse) {
    if (err) throw err;
    inquirer.prompt({
      name: "action",
      type: "rawlist",
      message: "WHICH EMPLOYEE WOULD YOU LIKE TO UPDATE?",
      choices: employeeResponse.map((employee) => {
        return {
          value: employee.id,
          name: employee.first_name + " " + employee.last_name,
          role: employee.role_id,
        };
      }),
    });
  });
}
