
var express = require("express");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));
app.use(express.static('db'));



require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  