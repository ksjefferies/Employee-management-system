const dbInfo = require('./lib/dbModification');
const inquirer = require('inquirer');

// Prompt user for initial responses
const promptUser = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select one of the following to perform an action',
            choices:
                [
                    'View',
                    'Add',
                    'Update',
                    'No futher action needed'
                ]
        }
    ]);

    const { selection } = answer;

    if (selection === 'View') {
        viewMenu();
    }
    if (selection === 'Add') {
        addMenu();
    }
    if (selection === 'Update') {
        updateMenu();
    }
    if (selection === 'No futher action needed') {
        await dbInfo.close()
        return;
    }
};

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
                    'View all Employees',
                    'Return to previous menu'
                ]
        }
    ]);

    const { selection } = answer;

    if (selection === 'View all Departments') {
        console.table(await dbInfo.department.get());
        viewMenu();
    };
    if (selection === 'View all Roles') {
        console.table(await dbInfo.roles.get());
        viewMenu();
    };
    if (selection === 'View all Employees') {
        console.table(await dbInfo.employee.get());
        viewMenu();
    };
    if (selection === 'Return to previous menu') {
        promptUser();
    };
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
                    'Add Employee',
                    'Return to previous menu'
                ]
        }
    ]);

    const { selection } = answer;

    if (selection === 'Add Department') {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'addDept',
                message: 'What department would you like to add?',
            }
        ]);

        const { addDept } = answer;
        dbInfo.department.add(addDept);
        addMenu();
    };

    if (selection === 'Add Role') {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title for this Role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What salary for this role?',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID for this Role?',
            }
        ]);

        const { title, salary, department_id } = answer;
        dbInfo.roles.add(title, salary, department_id);
        addMenu();
    };

    if (selection === 'Add Employee') {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: ' Employee First Name: ',
            },
            {
                type: 'input',
                name: 'last_name',
                message: ' Employee Last Name: ',
            },
            {
                type: 'input',
                name: 'role_id',
                message: ' Employee Role ID: ',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: ' Employee Manager ID: ',
            }
        ]);

        const { first_name, last_name, role_id, manager_id } = answer;
        dbInfo.employee.add(first_name, last_name, role_id, manager_id);
        addMenu();
    };

    if (selection === 'Return to previous menu') {
        promptUser();
    };
};

const updateMenu = async () => {
    console.table(await dbInfo.employee.get());

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter ID number of the employee you wish to update their role: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter new Role ID for the employss'
        }
    ]);

    const { id, role_id } = answer;
    dbInfo.employee.update(id, role_id);

    promptUser();
};

const usermodification = {
    viewMenu: viewMenu,
    addMenu: addMenu,
    updateMenu: updateMenu
};

promptUser();