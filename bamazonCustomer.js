var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

function newTable() {
  var products = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity']
    , colWidths: [10, 30, 20, 10, 20]
  });
  return products;
}


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "test",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  
});
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
   
    const products = newTable();
    results.forEach(row => {
 
      products.push(
        [row.id, row.product_name, row.department_name, row.price, row.stock_quantity]

      );

    });
    console.log(products.toString());
    start();
  });



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

        inquirer
          .prompt([
            {
              type: "confirm",
              message: "Are you sure:",
              name: "confirm",
              default: true
            }
          ]).then(function (response) {
            
            if (response.confirm === true) {
              console.log("Checking quantity...")
            }
            if (response.confirm === false) {
              start();
            }
            if (answer.quantity < res[0].stock_quantity) {
              var checkStore = res[0].stock_quantity - answer.quantity;
            
              console.log("Transaction Complete");
              console.log("Total cost: " + res[0].price * answer.quantity)

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
                 
                  tableUpdate()
                });
            }
            else {
              console.log("Insufficent quantity!\n");
              console.log("Quantity in stock: " + res[0].stock_quantity);
              start();
            }


          });

      });

    });

  });

}
function tableUpdate() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    const products = newTable();

    results.forEach(row => {
  
      products.push(
        [row.id, row.product_name, row.department_name, row.price, row.stock_quantity]

      );

    });
    console.log(products.toString());
    start();
  });

}

