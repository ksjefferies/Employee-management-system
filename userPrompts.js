const dbInfo = require('./lib/dbModification');
const inquirer = require('inquirer');

// Prompt user for initial responses
const promptUser = async () => {
    const { selection } = await inquirer.prompt([{
        type: 'list',
        name: 'selection',
        message: 'Please select one of the following to perform an action',
        choices: Object.keys(mainMenuOptions)
    }]);

    await mainMenuOptions[selection]();
};

// Main Menu Options
const mainMenuOptions = {
    'View': viewMenu,
    'Add': addMenu,
    'Update': updateMenu,
    'Exit': dbInfo.close
};

// View menu
const viewMenu = async () => {
    const { selection } = await inquirer.prompt([{
        type: 'list',
        name: 'selection',
        message: 'Please select action you wish to perform',
        choices: Object.keys(viewMenuOptions)
    }]);

    await viewMenuOptions[selection]();
};

// View Menu Options
const viewMenuOptions = {
    'View all Departments': async () => {
        console.table(await dbInfo.department.get())
        await viewMenu()
    },
    'View all Roles': async () => {
        console.table(await dbInfo.roles.get());
        viewMenu();
    },
    'View all Employees': async () => {
        console.table(await dbInfo.employee.get());
        viewMenu();
    },
    'Return to previous menu': async () => {
        promptUser();
    }
};

// Add Menu
const addMenu = async () => {

    const { selection } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select action you wish to perform',
            choices: Object.keys(addMenuOptions)
        }]);

    await addMenuOptions[selection]();
};

// Add Menu Options
const addMenuOptions = {
    'Add Department': async () => {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'addDept',
                message: 'What department would you like to add?',
            }]);

        const { addDept } = answer;
        dbInfo.department.add(addDept);

        addMenu();
    },
    'Add Role': async () => {
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
            }]);

        const { title, salary, department_id } = answer;
        dbInfo.roles.add(title, salary, department_id);

        addMenu();
    },
    'Add Employee': async () => {
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
            }]);

        const { first_name, last_name, role_id, manager_id } = answer;
        dbInfo.employee.add(first_name, last_name, role_id, manager_id);

        addMenu();
    },
    'Return to previous menu': async () => {
        promptUser();
    }
};

// Update Menu and Options
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
        }]);

    const { id, role_id } = answer;
    dbInfo.employee.update(id, role_id);

    promptUser();
};

// Initiate menu call
promptUser();