var inquirer = require("inquirer");
var mysql = require("mysql");

inquirer.prompt([

    {
      type: "input",
      name: "product-ID",
      message: "What is the product ID you are looking for?"
    },

