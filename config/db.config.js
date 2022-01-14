const { createPool } = require('mysql');

console.log(`process.env.DB_HOST : ${process.env.DB_HOST}`);
const db = createPool({
    port : 3306,
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    connectionLimit : 10,
});

module.exports = db;

