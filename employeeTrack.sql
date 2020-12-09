-- ============COMMAND TO CREATE A DATABASE AND REMOVE A DATABASE OF THE SAME NAME========== --
DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;
-- ============COMMAND TO USE THE PREVIOUSLY CREATED DATABASE==============
USE employee_trackerdb;
-- =============CREATE A TABLE TO HOLD THE DEPARTMENT==================
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    _name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);
-- =============CREATE A TABLE TO HOLD THE ROLE================
CREATE TABLE current_role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    -- "FOREIGN KEY" LINKS THE DEPARTMENT ID TO THE ROLE TABLE--
    -- "ON DELETE CASCADE" REMOVES THE CHILD LINKS FROM THIS ID IF IT IS REMOVED--
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
-- ===============CREATE A TABLE TO HOLD THE EMPLOYEE====================
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT ,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES current_role(id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE CASCADE
);
