const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

if((process.env.NODE_ENV).trim() == 'production'){
    require('dotenv').config({path : path.join(__dirname, '.env.production')});
} else {
    require('dotenv').config({path : path.join(__dirname, '.env.development')});
}
const usersRoutes = require("./routes/users.route");
const postsRoutes = require("./routes/posts.route");

app.use(bodyParser.json());

// swagger
const swaggerOption = {
  swaggerDefinition : (swaggerJsdoc.Options = {
    info : {
      title : "my-posts",
      description : "API Documentation",
      contact : {
        name : "Developer",
      },
      servers : [`${process.env.HOST}:${process.env.PORT}`],
    },
  }),
  apis : ["index.js", "./routes/*.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.use("/bella", (req, res) => {
  res.status(200).send("bella");
});

app.listen(process.env.PORT | 8080, () => {
  console.log(`server is running on port ${process.env.PORT | 8080}`);
});
