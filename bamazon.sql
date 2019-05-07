DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon

USE bamazon;

CREATE TABLE products (
item_id VARCHAR(255)
, product_name VARCHAR(225) NULL
, department_name VARCHAR (255) NULL
, price INT NOT NULL
, stock_quantity INT NOT NULL
PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES

  (1, 100,'Play-Doh','Clay & Dough', 7.99,100)
, (2, 101,'L.O.L Surprise!','Dolls',10.99,36)
, (3, 102, 'Jenga','Games',7.19,35)
, (4, 103, 'Pokemon Cards','Games',11.26,15)
, (5, 104, 'Crayola Colored Pencils','Coloring Pens & Markers',8.90,34)
, (6, 105, 'Butterfly Farm','Biology',35.00,100)
, (7, 106, 'Break Open Geodes','STEM toys',34.99,34)
, (8, 107, 'LEGO Marvel Avengers','Building Toys',27.99,32)
, (9, 108, 'Giant Bubble Wands','Toys',14.95,25)
, (10, 109, 'Kids Garden Tool Kit','Outdoor Toys',15.93,54);
