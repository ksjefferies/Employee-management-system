const mysql = require('mysql2');

// Establishes connection with 'employee_db'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'employee_db'
});

// View functions
const getDept = connection.query(' SELECT * FROM department', (error, result) => {
    return (result);
});

const getRoles = connection.query(' SELECT * FROM role', (error, result) => {
    // const sqlRole = connection.query(' SELECT * FROM role', (error, result) => {
    return (result);
});

const getEmployee = connection.query(' SELECT * FROM employee', (error, result) => {
    return (result);
});

// Add functions

const addDept = async () => {

};

const addRole = async () => {

};

const addEmployee = async () => {

};

const updateEmployee = async () => {

};

// Update Employee function
const dbInfo = {
    department: {
        get: getDept,
        add: addDept,
    },
    employee: {
        get: getEmployee,
        add: addEmployee,
        update: updateEmployee,
    },
    roles: {
        get: getRoles,
        add: addRole
    }
};

// Export dbInfo Object
module.exports = dbInfo;




// const example = {
//     e: {
//         get: getEmployees,
//     },
//     roles: {
//         get: getRoles
//     },
//     department: {
//         get: getDepartment,
//         add: addDept
//     }
// }

// example.department.add()
// example.department.get()


// const sqlRole = connection.query(' SELECT * FROM role', (error, result) => {
//     console.table(result);
// });