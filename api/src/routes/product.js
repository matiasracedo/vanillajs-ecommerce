const express = require("express");
const connection = require("../config/db");
const server = express.Router();

server.get("/", (req, res) => {
    connection.query('SELECT * FROM `product`', (error, results) => {
        // error will be an Error if one occurred during the query
        if (error) res.json({ err: error })
        // results will contain the results of the query
        return res.json(results);
      })
})

server.get("/:id", (req, res) => {
  let { id } = req.params;
  connection.query('SELECT * FROM `product` WHERE `id` = ?', [id], (error, result) => {
    // error will be an Error if one occurred during the query
    if (error) res.json({ err: error })
    // results will contain the result of the query
    return res.json(result);
  })
})

server.get("/name/:name", (req, res) => {
  let { name } = req.params;
  let query = `%${name}%`;
  connection.query('SELECT * FROM `product` WHERE `name` LIKE ?', [query], (error, result) => {
    // error will be an Error if one occurred during the query
    if (error) res.json({ err: error })
    // results will contain the result of the query
    return res.json(result);
  })
})

server.get("/category/:id", (req, res) => {
  let { id } = req.params;
  connection.query('SELECT * FROM `product` WHERE `category` = ?', [id], (error, result) => {
    // error will be an Error if one occurred during the query
    if (error) res.json({ err: error })
    // results will contain the result of the query
    return res.json(result);
  })
})

module.exports = server;