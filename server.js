// Import Inquirer, mySQL2, and Console.table packages
const inquirer = require('inquirer');
const contTable = require('console.table');
const userPrompts = require('./lib/userPrompts')
const dbModification = require('./lib/dbModification');
// const { exit } = require('process');

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
    ])
    const { selection } = answer;

    if (selection === 'View') {
        userPrompts.viewMenu();
    }
    if (selection === 'Add') {
        userPrompts.addMenu();
    }
    if (selection === 'Update') {
        userPrompts.updateMenu();
    }
    if (selection === 'No futher action needed') {
        exit;
    }
};

promptUser();