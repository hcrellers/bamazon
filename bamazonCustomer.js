var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
var products = new Table({
  head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity']
  , colWidths: [10, 20, 20, 10, 10]
});

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "test",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user

  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    //console.log(results);
    results.forEach(row => {
      // console.log(row)
      products.push(
        [row.id, row.product_name, row.department_name, row.price, row.stock_quantity]

      );

    });
    console.log(products.toString());
    start();
  });
});

//The app should then prompt users with two messages.
function start() {

  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    inquirer.prompt([

      {
        name: "id",
        message: "What is the item ID you are looking for?"
      },

      {
        name: "quantity",
        message: "How many units would you like to buy?"
      }
    ]).then(function(answer) {
     console.log(answer.id);
     console.log(answer.quantity);
     connection.query("SELECT * FROM products WHERE ?", { id: answer.id }, function(err, res) {
    console.log("Quantity: " + res[0].stock_quantity);
    //  console.log(res)
    if (answer.quantity < res[0].stock_quantity) {
      res[0].stock_quantity - answer.quantity;
      //return value 

    }


  });
      

      
      });

    });
  }

        
 



