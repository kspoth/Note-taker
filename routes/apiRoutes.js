
const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");
const uuid = require("uuid/v4");


router.get("/notes", function (req, res) {
  
  fs.readFile("./db/db.json", "utf8", (err) => {
    if (err) throw err;
    res.json(db);
  });
});

router.post("/notes", function (req, res) {
  
  let noteId = uuid();
  
  let newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text,
  };

  
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const allNotes = JSON.parse(data);
    allNotes.push(newNote);

    
    fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
      if (err) throw err;
      console.log("Note created!");
      res.send(db);
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  let noteId = req.params.id;
  
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const allNotes = JSON.parse(data);
    const newAllNotes = allNotes.filter((notes) => notes.id !== noteId);

    fs.writeFile("./db/db.json", JSON.stringify(newAllNotes), (err) => {
      if (err) throw err;
      console.log("Note deleted!");
      res.send(db);
    });
  });
});

module.exports = router;