const dbInfo = require('./dbModification');
const inquirer = require('inquirer');

const viewMenu = async () => {

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select action you wish to perform',
            choices:
                [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees'
                ]
        }
    ]);

    const { selection } = answer;

    if (selection === 'View all Departments') {
       console.table(dbInfo.department.get()) 
    }
    if (selection === 'View all Roles') {
        console.table(dbInfo.roles.get());
    }
    if (selection === 'View all Employees') {
        console.table(dbInfo.employee.get());
    }
};

const addMenu = async () => {

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select action you wish to perform',
            choices:
                [
                    'Add Department',
                    'Add Role',
                    'Add Employee'
                ]
        }
    ])

    const { selection } = answer;

    if (selection === 'Add Department') {
        console.table(dbInfo.addDept());
    }
    if (selection === 'Add Role') {
        console.table(dbInfo.addRole());
    }
    if (selection === 'Add Employee') {
        console.table(dbInfo.addEmploy());
    }
};

const updateMenu = () => {
    console.table(dbInfo.updateEmployee());
};

const usermodification = {
    viewMenu: viewMenu,
    addMenu: addMenu,
    updateMenu: updateMenu
}

module.exports = usermodification;