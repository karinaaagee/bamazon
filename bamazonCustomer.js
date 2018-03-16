var mysql = require("mysql");

var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "whatever123",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    itemsAvailable();
    // start();
});

function itemsAvailable() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
        start()
    });
}
function start() {
    connection.query("SELECT * FROM products", function (err, result) {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter the ID of the product you would you like to purchase",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function (answer) {
                // console.log(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].item_id === parseInt(answer.id)) {
                        connection.query("Select * from products where ?",
                            [
                                {
                                    item_id: answer.id
                                }
                            ],
                            function (err, result) {
                                if (err) throw err;
                                if (result[0].stock_quantity < answer.quantity) {
                                    console.log("insufficient quantity!")
                                    start();
                                } else {
                                    console.log(result)
                                    fulfillOrder(answer, result[0].stock_quantity, result[0])
                                
                                }
                            })

                    }
                }
            })
    })

}

function fulfillOrder(answer, stock, result) {
    //Handle the item being paid for.
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock-answer.quantity
            },
            {
                item_id: answer.id
            }
        ],
        function (err) {
            if (err) throw err;
            console.log("Remaining quantity has been updated!");
            console.log(answer)
            console.log(result.price);
            purchase(parseInt(answer.quantity), parseInt(result.price));
            
        })
        
}
function purchase(answer, price){
    inquirer.prompt([
        {
            type: "confirm",
            name: "checkout",
            message: "Are you ready for check out?"
        }
    ])
    .then(function(res) {
        console.log(res);
        if (res.checkout === true){
            var total = answer * price
            console.log("Your total is $" +  total);
            connection.end();
        }
        else{
            console.log("Purchase incomplete");
            start();
        }
    })
}