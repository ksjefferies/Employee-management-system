const mysql = require('mysql2');


// Establishes connection with 'employee_db'
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'employee_db'
});

async function closeConnection() {
    pdb.end()
};

const pdb = db.promise();

// View functions
const getDept = async () => {
    const [result] = await pdb.query('SELECT id, name FROM department;')
    return result
};

const getRoles = async () => {
    const [result] = await pdb.query(' SELECT id, title, salary, department_id FROM role')
    return result;
};

const getEmployee = async () => {
    const [result] = await pdb.query(' SELECT id, first_name, last_name, role_id, manager_id FROM employee')
    return result;
};

// Add functions
const addDepartment = async (addDept) => {
    db.query("INSERT INTO department SET ?", {
        name: addDept
    });
};

const addRole = async (title, salary, department_id) => {
    db.query("INSERT INTO role set?", {
        title: title,
        salary: salary,
        department_id: department_id
    });
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    db.query("INSERT INTO employee set?", {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        manager_id: manager_id
    })
};

const updateEmployee = async (id, role_id) => {
    const [result] = await pdb.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${id}`);
    return result;
};

// Update Employee function
const dbInfo = {
    department: {
        get: getDept,
        add: addDepartment,
    },
    employee: {
        get: getEmployee,
        add: addEmployee,
        update: updateEmployee,
    },
    roles: {
        get: getRoles,
        add: addRole
    },
    close: closeConnection
};

// Export dbInfo Object
module.exports = dbInfo;