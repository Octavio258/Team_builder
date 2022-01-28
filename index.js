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