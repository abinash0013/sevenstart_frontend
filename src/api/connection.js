var mysql = require('mysql2');

//change this if issue creates on production
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tambola",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
  con
} 