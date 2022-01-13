const { createPool } = require('mysql');

const db = createPool({
    port : 3306,
    host: "gobella.kr",
    user : "roykimm",
    password: "12345",
    database : "mydb",
    connectionLimit : 10,
});

module.exports = db;