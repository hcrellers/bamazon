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

    function menuOptions() {
        inquirer
            .prompt({
                name: "menu",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            })
            .then(function (answer) {
            console.log(answer.menu)
                switch (answer.menu) {
                    case "View Products for Sale":
                        saleProducts();
                        break;

                    case "View Low Inventory":
                        lowInventory();
                        break;

                    case "Add to Inventory":
                        addIventory();
                        break;

                    case "Add New Product":
                        newProduct();
                        break;


               }
            });

        
            
    }

        //if else statment
        //return statement

        menuOptions()


            function saleProducts() {

                connection.query("SELECT * FROM products", function (err, results) {
                    if (err) throw err;
                
                    const products = newTable();
                
                    results.forEach(row => {
                  
                      products.push(
                        [row.id, row.product_name, row.department_name, row.price, row.stock_quantity]
                
                      );
                
                    });
                    console.log(products.toString());
                    menuOptions();
                  });
                
                }
                
                



    

