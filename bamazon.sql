DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT
, product_name VARCHAR(225) NULL
, department_name VARCHAR (255) NULL
, price DECIMAL(9, 3) NOT NULL
, stock_quantity INT NOT NULL
, PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES

  ('Play-Doh','Clay & Dough', 7.99,100)
, ('L.O.L Surprise!','Dolls',10.99,36)
, ('Jenga','Games',7.19,35)
, ('Pokemon Cards','Games',11.26,15)
, ('Crayola Colored Pencils','Coloring Pens & Markers',8.90,34)
, ('Butterfly Farm','Biology',35.00,100)
, ('Break Open Geodes','STEM toys',34.99,34)
, ('LEGO Marvel Avengers','Building Toys',27.99,32)
, ('Giant Bubble Wands','Toys',14.95,25)
, ('Kids Garden Tool Kit','Outdoor Toys',15.93,54);
