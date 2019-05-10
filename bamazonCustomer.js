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
    ]).then(function (answer) {

      connection.query("SELECT * FROM products WHERE ?", { id: answer.id }, function (err, res) {
        console.log("Purchasing: " + res[0].product_name);
        console.log("How many: " + answer.quantity);
     //  if (answer.id === id) {
     //    start()
      // }
        //  function confirm() {
        inquirer
          .prompt([
            {
              type: "confirm",
              message: "Are you sure:",
              name: "confirm",
              default: true
            }
          ]).then(function (response) {
            // console.log(response.confirm);
            if (response.confirm === true) {
              console.log("Checking quantity...")
              if (answer.quantity < res[0].stock_quantity) {
                var checkStore = res[0].stock_quantity - answer.quantity;
                 console.log(checkStore)
                console.log("Transaction Complete");
                connection.query("UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: checkStore
                    },
                    {
                      id: answer.id
                    }
                  ],

                  function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    tableUpdate()
                  });
              }
              else {
                console.log("Insufficent quantity!\n");
                console.log("Quantity in stock: " + res[0].stock_quantity);
                tableUpdate()
              }
            }

          });

      });

    });

  });

}
function tableUpdate() {
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

}