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

const teamPick = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'teamselect',
            message: 'Select which team memebers to add:',
            choices: ['Engineer', 'Intern', 'I\'m done building my team']
        }
    ])
        .then(({ teamselect }) => {
            if (teamselect === 'Engineer') {
                engineerPrompt()
            } else if (teamselect === 'Intern') {
                internPrompt()
            } else {
                endQuestionaire();
            }
        })
}

const continuePrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'continueselect',
            message: 'Would you like to add more team members?',
            choices: ['Yes', 'No']
        }
    ])
        .then(({ continueselect }) => {
            if (continueselect === 'Yes') {
                teamPick();
            } else {
                endQuestionaire()
            }
        })
}

const endQuestionaire = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, generateHTML(teamMembers), err => {
        if (err) {
            console.log(err);
            return
        }
    })
    fs.copyFile(srcPath, path.join(__dirname, '/output/styles.css'), err => {
        if(err) {
            console.log(err);
        }
    } )
    console.log('\nYour team page has been created in the output sub-directory!');
}

const engineerPrompt = () => {
    console.log(`
    ======================
     Engineer Information
    ======================
    `);
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What\'s your engineer\'s name?',
            validate: engineerAnswer => {
                if (engineerAnswer) {
                    return true;
                } else {
                    console.log('\nAn engineer name is required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter Engineer ID number:',
            validate: engineerAnswer => {
                if (engineerAnswer) {
                    return true;
                } else {
                    console.log('\nEngineer\'s employee ID number required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter Engineer email address:',
            validate: engineerAnswer => {
                if (engineerAnswer) {
                    return true;
                } else {
                    console.log('\nEngineer\'s email address required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter Engineer Github user name:',
            validate: engineerAnswer => {
                if (engineerAnswer) {
                    return true;
                } else {
                    console.log('\nEngineer\'s Github user name required:')
                    return false;
                }
            }
        },
    ])
    /*Taking input from questions to build new Engineer object and push to global teammembers array.
    Takes user to continuePrompt function to decide on new members, or to finish.*/
        .then((input) => {
            const employee = new Engineer(input.name, input.id, input.email, input.github);
            teamMembers.push(employee);
            continuePrompt();
        })
}

//Function to prompt Inquirer questions regarding Intern
const internPrompt = () => {
    console.log(`
    ====================
     Intern Information
    ====================
    `);
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What\'s your intern\'s name?',
            validate: internAnswer => {
                if (internAnswer) {
                    return true;
                } else {
                    console.log('\nAn intern name is required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter Intern ID number:',
            validate: internAnswer => {
                if (internAnswer) {
                    return true;
                } else {
                    console.log('\nIntern\'s employee ID number required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter Intern email address:',
            validate: internAnswer => {
                if (internAnswer) {
                    return true;
                } else {
                    console.log('\nIntern\'s email address required:')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter Intern\'s current school:',
            validate: internAnswer => {
                if (internAnswer) {
                    return true;
                } else {
                    console.log('\nIntern\'s current school is required:')
                    return false;
                }
            }
        },
    ])
    /*Taking input from questions to build new Intern object and push to global teammembers array.
    Takes user to continuePrompt function to decide on new members, or to finish.*/
        .then((input) => {
            const employee = new Intern(input.name, input.id, input.email, input.school);
            teamMembers.push(employee);
            continuePrompt();
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