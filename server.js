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
        "UPDATE A(n) Department, Role, and/or Employee",
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
        case "UPDATE A(n) Department, Role, and/or Employee":
          updateInformation();
          break;
      }
    });
}
// ====================FUNCTION ROUTE TO ADD INFORMATION TO THE DEPARTMENT, ROLE, AND EMPLOYEE=============//
function addInformation() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        Message: "WHAT INFORMATION WOULD YOU LIKE TO ADD?",
        choices:[
            "ADD department",
            "ADD role",
            "ADD employee"
        ]
    })
    //=======ADD TO THE DEPARTMENT========
    .then(function(answer){
        switch (answer.action){
            case "ADD department":
                addDepartment();
                break;
    //========ADD TO THE ROLE=============
            case "ADD role":
                addRole();
                break;
    //========ADD TO THE EMPLOYEE===========
            case "ADD employee":
                addEmployee();
                break;
        }
    });
}