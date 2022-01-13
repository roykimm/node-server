const express = require("express");
const path = require("path");
const app = express();

console.log(process.env.NODE_ENV);
if((process.env.NODE_ENV).trim() == 'production'){
    console.log(11)
    require('dotenv').config({path : path.join(__dirname, '.env.production')});
} else {
    console.log(22)
    require('dotenv').config({path : path.join(__dirname, '.env.development')});
}

console.log(process.env.name)
console.log(process.env.password)

app.use("/test", (req, res) => {
  console.log("received request");
  res.status(200).send("Received request1");
});

app.listen(8080, () => {
  console.log(`server is running on port ${8080}`);
});
