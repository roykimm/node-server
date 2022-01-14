const db = require("../config/db.config");

exports.register = (data, callback) => {

    db.query(
        `insert into users (firstName, lastName, emailId, password) values (?, ?, ?, ?)`, 
        [data.firstName, data.lastName, data.emailId, data.password],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, `Registration successful`);
        }
    )
}

exports.login = (data, callback) => {
    db.query(
        `select id from users where emailId = ? and password = ?`,
        [data.emailId, data.password],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            if(results.length > 0){
                return callback(null, "Login success");
            } else {
                return callback("Invalid credentials");
            }

        }
    )
}