var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected" + connection.threadId);
  connection.end();
});

// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var Table = require('cli-table');
var products = new Table({
  head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity']
, colWidths: [10, 20, 20, 10, 10 ]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
products.push(
  ['100', 'Play-Doh', 'Clay & Dough', '7.99', '100']
, ['101', 'L.O.L Surprise!', 'Dolls', '10.99', '36']
, ['102', 'Jenga', 'Games', '7.19', '35']
, ['103', 'Pokemon Cards', 'Games', '11.26', '15']
, ['104', 'Colored Pencils', 'Pens & Markers', '8.90', '34']
, ['105', 'Butterfly Farm', 'Biology', '35.00', '100']
, ['106', 'Break Open Geodes', 'STEM toys', '34.99', '34']
, ['107', 'LEGO Marvel Avengers', 'Building Toys', '27.99', '32']
, ['108', 'Giant Bubble Wands', 'Outdoor Toys', '14.95', '25']
, ['109', 'Kids Garden Tool Kit', 'Outdoor Toys', '15.93', '54']
);

console.log(products.toString());


//The app should then prompt users with two messages.

inquirer.prompt([

    {
      name: "Item-ID",
      message: "What is the item ID you are looking for?"
    },

    {
        name: "stock-quantity",
        message: "How many units would you like to buy?"
      }
     ]) .then(function(iResponse) {
    
          console.log(iResponse);
        
      });

      // check if your store has enough of the product to meet the customer's request

      console.log("Insufficient quantity!");
    