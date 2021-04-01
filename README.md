$Vanilla JavaScript e-commerce 
========

This e-commerce web page was developed with Node JS, Express JS and MySQL for the back-end, and HTML, CSS and Vanilla JavaScript in the front-end (no libraries, no frameworks).

Features
--------

- Filter products by category.
- Search products by name.
- Add products to the shopping cart.
- Remove products from the shopping cart.
- Empty shopping cart.

Installation
------------

In the _/api_ folder, open the bash console and run:

>    npm install

You must create an _.env_ file with the MySQL DB host url, user, password and database name, as DB_HOST, DB_USER, DB_PASSWORD and DB_NAME, respectively, like in the following example:

`DB_HOST=mdb-test.example.url.com
DB_USER=example_user
DB_PASSWORD=example_password
DB_NAME=example_db_name`

**DB Tables:**

<table>
  <tr>
    <th>product</th>
    <th></th>
  </tr> 
  <tr>
    <td>id</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
  </tr>
  <tr>
    <td>url_image</td>
    <td>String</td>
  </tr>
  <tr>
    <td>price</td>
    <td>Float</td>
  </tr>
  <tr>
    <td>discount</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Integer</td>
  </tr>
</table>

<table>
  <tr>
    <th>category</th>
    <th></th>
  </tr> 
  <tr>
    <td>id</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
  </tr>
</table>

API Use
-------

**Category methods:**

> GET /categories

Responds a JSON object containing an array with all the categories, like in the following example:

`
[
{
"id": 1,
"name": "bebida energetica"
},
{
"id": 2,
"name": "pisco"
},
{
"id": 3,
"name": "ron"
},
...
}
]
`

> GET /products

Responds a JSON object containing an array with all the products, like in the following example:

`
[
{
"id": 5,
"name": "ENERGETICA MR BIG",
"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
"price": 1490,
"discount": 20,
"category": 1
},
{
"id": 6,
"name": "ENERGETICA RED BULL",
"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
"price": 1490,
"discount": 0,
"category": 1
},
...
}
]
`

> GET /products/:id

Where _:id_ is a number. Responds a JSON object containing an array with a single product, if there is a product with that id.

> GET /products/name/:name

Where _:name_ is a string.Responds a JSON object containing an array with all the products which have _name_ in the name, if there are any.

> GET /products/category/:id

Where _:id_ is a number.Responds a JSON object containing an array with all the products belonging to that category.

Running the project
-------------------

In the _/api_ folder, open the bash console and run:

>    npm start

In the _/client_ folder, you will find the __index.html__ file, you need to open it in a browser directly, or you can use a VS Code extension like _Live Server_ to launch a local development server with live reload feature for static pages.

Visit demo
----------

https://vanillajs-ecommerce-matias.web.app/

Support
-------

If you are having issues, please let us know at: _matiasracedo@gmail.com_

License
-------

The project is licensed under the MIT license.
