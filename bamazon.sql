DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
item_id int NOT NULL AUTO_INCREMENT,
product VARCHAR(50),
department VARCHAR(50),
price decimal(10,2),
stock_quantity int(4),
PRIMARY KEY (item_id)
);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("camera", "electronics", 350.00, 4);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("flashlight", "electronics", 15.00, 2);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("pillow", "home",12.00, 6);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("iphone case", "electronics", 25.00, 8);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("book", "books", 16.00, 4);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("wireless speaker", "electronics", 100.00, 3);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("yoga mat", "sports", 17.99, 10);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("pop-tart", "groceries", 3.00, 20);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("painting", "art", 500.00, 1);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("rug", "home", 80.00, 3);

