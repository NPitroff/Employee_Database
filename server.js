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