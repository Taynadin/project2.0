var express = require("express");
var bodyParser = require("body-parser");
// var mailer = require('express-mailer');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// module.exports = mailer;
// // Import routes and give the server access to them.
const properties = require("./controllers/properties_controller.js");
const routes = require("./routes.js");
app.use(properties);

app.use(routes);

app.listen(PORT, function() {
  console.log("Listening at http://localhost:" + PORT);
});
