// imports
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

// output file information
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// global variables
const team = [];
const typeChoices = ["***FINISHED ADDING***","Manager","Engineer","Intern"];

// inquirer prompts
const questions = [
    {
        type: "list",
        message: "Add Employee as...",
        name: "type",
        choices: typeChoices
    },
    {
        type: "input",
        message: "Enter employee's name:",
        name: "name",
        default: "Employee Name",
        when: response => response.type !== "***FINISHED ADDING***",
        validate: response => (response.length > 0)||"Please enter something for the employee name."
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id",
        default: 123456789,
        when: response => response.type !== "***FINISHED ADDING***",
        validate: response => (parseInt(response) > 0)||"Please enter a valid integer > 0 for the ID."
    },
    {
        type: "input",
        message: "Enter employee's email:",
        name: "email",
        default: "email@email.com",
        when: response => response.type !== "***FINISHED ADDING***",
        validate: response => (/\S+@\S+\.\S+/.test(response))||"Please enter a valid email."
    },
    {
        type: "input",
        message: "Enter office number:",
        name: "office",
        default: 123,
        when: response => response.type !== "***FINISHED ADDING***" && response.type === "Manager",
        validate: response => (parseInt(response) > 0)||"Please enter a valid integer > 0 for the office number."
    },
    {
        type: "input",
        message: "Enter GitHub username:",
        name: "github",
        default: "Username",
        when: response => response.type !== "***FINISHED ADDING***" && response.type === "Engineer",
        validate: response => (response.length > 0)||"Please enter something for the user name."
    },
    {
        type: "input",
        message: "Enter school name:",
        name: "school",
        default: "School Name",
        when: response => response.type !== "***FINISHED ADDING***" && response.type === "Intern",
        validate: response => (response.length > 0)||"Please enter something for the school name."
    }
];

// function to prompt user or render team
const prompt = () => inquirer.prompt(questions).then(response => {
    if (response.type !== "***FINISHED ADDING***") {
        if (response.type === "Manager") {
            team.push(new Manager(response.name,response.id,response.email,response.office));
            //README said team only has one manager, so removing the option to add a manager after the first manager is added
            typeChoices.splice(1,1);
        } else if (response.type === "Engineer") {
            team.push(new Engineer(response.name,response.id,response.email,response.github));
        } else if (response.type === "Intern") {
            team.push(new Intern(response.name,response.id,response.email,response.school));
        }
        prompt();
    // render the team html and output to a file
    } else {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFile(outputPath,render(team),err => err ? console.log(err):console.log(`Generated ${outputPath}`));
    }
});

// function call to start prompting user
prompt();