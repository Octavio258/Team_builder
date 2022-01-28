const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "TeamPage.html");

const SRC_DIR = path.resolve(__dirname, "src");
const srcPath = path.join(SRC_DIR, "styles.css")

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const generateHTML = require('./src/generateHTML.js')

const teamMembers = [];

const managerprompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your managers name?',
            validate: managerAnswer => {
                if (managerAnswer) {
                    return true;
                } else {
                    console.log('\nA manager name is required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter Manager ID number:',
            validate: managerAnswer => {
                if (managerAnswer) {
                    return true;
                } else {
                    console.log('\nManager\'s employee ID number required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter Manager email address:',
            validate: managerAnswer => {
                if (managerAnswer) {
                    return true;
                } else {
                    console.log('\nManager\'s email address required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'office',
            message: 'Enter Manager office number:',
            validate: managerAnswer => {
                if (managerAnswer) {
                    return true;
                } else {
                    console.log('\nManager\'s office number required:')
                    return false;
                }
            }
        }
    ])

    
        .then((input) => {
            const employee = new Manager(input.name, input.id, input.email, input.office);
            teamMembers.push(employee);
            teamPick();
        })
}

async function init() {
    try {
        await managerprompt()
    } catch (err) {
        console.log(err)
    }
}

init();