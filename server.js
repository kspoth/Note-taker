var express = require("express");
var path = require("path");
var fs = require("fs");
var { v4: uuidv4 } = require("uuid");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function(req, res) {
  let id = uuidv4();
  let note = {
      id: id,
      title: req.body.title,
      text: req.body.text
  };

  console.log(note);

  fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw (err);

      const noteDb = JSON.parse(data);

      noteDb.push(note);

      fs.writeFile("./db/db.json", JSON.stringify(noteDb, null, 2), err => {
          if (err) throw (err);
          res.json(noteDb);
          console.log("New note!");
      });
  });
});

app.delete("/api/notes/:id", function(req, res) {
  let setId = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw (err);
      const noteDb = JSON.parse(data);
      const filteredNotes = noteDb.filter(note => note.id != setId);

      fs.writeFile("./db/db.json", JSON.stringify(filteredNotes, null, 2), err => {
          if (err) throw (err);
          res.json(filteredNotes);
          console.log("Deleted note!")
      });
  });
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });