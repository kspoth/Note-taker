//Dependencies
var express = require("express");
var path = require("path");

//Express server set up
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Fun.
app.use(express.static('public'));
app.use(express.static('db'));


//Router - server map to respond to users request/visits
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//Listener to start the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  