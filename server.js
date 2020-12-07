// ============DECLARE THE NPM PACKAGES USED IN THE APPLICATION ================//
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sequelize = require("sequelize");
//=============DECLARE THE CONNECTION TO INITIATE THE SQL DATABASE================//
var connection = mysql.createConnection({
    host:"localhost",
    //======PORT NUMBER=======//
    port: 3306,
    //=========USERNAME========//
    user:"root",
    //========PASSWORD & DATABASE BEING USED=========//
    password: "J0rd4n@(*&^%$#2814",
    database: "employee_trackerdb"
});
//===============COMMAND TO THROW ERROR OR INITIATE INQUIRER UPON STARTUP============//
connection.connect(function(err){
    if (err) throw err;
    runSearch();
});
//===============INQUIRER COMMAND PATH QUESTION 1====================//
function runSearch(){
    inquirer
    .prompt({
        name:"action",
        type: "rawlist",
        message: "GREETINGS! WHAT WOULD YOU LIKE TO DO?",
        choices:[
            "ADD Department, Role, and/or Employee",
            "VIEW CURRENT Department, Role, and/or Employee's",
            "UPDATE A(n) Department, Role, and/or Employee"
        ]
    })
}