-- ============COMMAND TO CREATE A DATABASE AND REMOVE A DATABASE OF THE SAME NAME========== --
DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;
-- ============COMMAND TO USE THE PREVIOUSLY CREATED DATABASE==============
USE employee_trackerdb;
-- =============CREATE A TABLE TO HOLD THE DEPARTMENT==================
CREATE TABLE department (
    id INT PRIMARY KEY,
    _name VARCHAR(45)
);
-- =============CREATE A TABLE TO HOLD THE EMPLOYEE ROLE================
CREATE TABLE current _role(
    id INT PRIMARY KEY,
    title VARCHAR(45),
    salary DECIMAL(10,4),
    department_id INT
);
-- ===============CREATE A TABLE TO HOLD THE EMPLOYEE====================
CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    role_id INT,
    manager_id INT
);
