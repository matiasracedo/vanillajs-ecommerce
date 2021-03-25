const express = require("express");
const connection = require("../config/db");
const server = express.Router();

server.get("/", (req, res) => {
    connection.query('SELECT * FROM `product`', (error, results) => {
        // error will be an Error if one occurred during the query
        if (error) res.json({ error: err })
        // results will contain the results of the query
        return res.json(results);
      })
})

module.exports = server;