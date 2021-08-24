const notesJSON = require("./db.json");
const fs = require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require("util")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


// Store notes
class Store {

    // 
    read() {
        return readFileAsync('./db/db.json', "utf8");
    }

    // Writes files to db
    write(note){
        return writeFileAsync("./db/db.json", JSON.stringify(note));
    }

    // Parsing note string and returning an object in an array
    getNotes() {
        return this.read().then((notes) => {
            let parseNotes
            try{
                parseNotes = [].concat(JSON.parse(notes));
            } catch(error) {
                parseNotes = [];
            } 
            return parseNotes
        });
    };

    // Save notes in db.json
    addNote(note) {
        const{ title, text } = note
        const uniqueNote = {
            id: uuidv4(),
            title, text
          }
          return this.getNotes()
          .then((notes) => [...notes, uniqueNote])
          .then((updatedNoteDb) => this.write(updatedNoteDb))
          .then(() => uniqueNote)
    }

    // Delete notes from db.json
    deleteNote(id) {
       return this.getNotes() 
       .then((notes) => notes.filter((note) => note.id !== id))
       .then((filteredNotes) => this.write(filteredNotes))
    }
}



module.exports = new Store();