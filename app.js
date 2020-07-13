const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "list",
        message: "Add Employee as...",
        name: "type",
        choices: ["***FINISHED ADDING***","Manager","Engineer","Intern"]
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

// function to initialize program
const init = () => inquirer.prompt(questions).then(response => console.log(response));

// function call to initialize program & start prompting user
init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
