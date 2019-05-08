var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
var products = new Table({
  head: ['item_id', 'Product', 'Department', 'Price', 'Stock Quantity']
, colWidths: [10, 20, 20, 10, 10 ]
});

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "test",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
 // start();
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //console.log(results);
    results.forEach(row => {
     // console.log(row)
      products.push(
        [row.id, row.product_name, row.department_name, row.price, row.stock_quantity]

      );
      
    });
    console.log(products.toString());
  });
});

//The app should then prompt users with two messages.

inquirer.prompt([

    {
      name: "item_id",
      message: "What is the item ID you are looking for?"
    },

    {
        name: "stock_quantity",
        message: "How many units would you like to buy?"
      }
     ]) .then(function(iResponse) {
    
         console.log(iResponse);
        // get the information of the chosen item
     });

      // for ( var j = 0; products.head[i].length; j++){
//console.log(products.head[i].length)
     // console.log("Insufficient quantity!");*/
    