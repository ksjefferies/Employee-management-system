// Import Inquirer, mySQL2, and Console.table packages
const inquirer = require('inquirer');
const contTable = require('console.table');
const userPrompts = require('./lib/userPrompts')
const dbModification = require('./lib/dbModification');
// const { exit } = require('process');

// Prompt user for initial responses
const promptUser = () => {
    inquirer.prompt([
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
        .then((answer) => {
            const { choices } = answer;

            if (choices === 'View') {
                userPrompts.viewMenu();
            }
            if (choices === 'Add') {
                userPrompts.addMenu();
            }
            if (choices === 'Update') {
                userPrompts.updateMenu();
            }
            if (choices === 'No futher action needed') {
                exit;
            }
        })
};