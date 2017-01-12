var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Data

require('./routing/html-routes.js')(app);

require('./routing/api-routes.js')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});