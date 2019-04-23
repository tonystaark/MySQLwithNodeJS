//STORING MYSQL RELATED INFO

let mysql = require("mysql");
let createDatabase, databaseName;
let createTable =  `CREATE TABLE IF NOT EXISTS teachers (id int(11) AUTO_INCREMENT PRIMARY KEY, teacher VARCHAR(100), student VARCHAR(100), suspended BOOL NOT NULL DEFAULT 0);`

if (process.env.NODE_ENV !== 'development'){
  createDatabase = 
    `
      USE mock;
      ${createTable}
    `
  databaseName = 'mock'
  
} else {
  createDatabase = 
    `
      USE registration;
      ${createTable}
    `
  databaseName = 'registration'
}

global.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  multipleStatements: true,
  database: databaseName
});


const database = connection.connect(function(err) {
  if (err) throw err;
  console.log(`Using ${databaseName} as database !`);
  console.log(`Using teachers as table !`);
  connection.query(createDatabase, function (err, result) {
    if (err) throw err;
  })
})

module.exports = database

