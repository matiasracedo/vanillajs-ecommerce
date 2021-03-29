const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host     : "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user     : "bsale_test",
  password : "bsale_test",
  database : "bsale_test"
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

module.exports = connection;
