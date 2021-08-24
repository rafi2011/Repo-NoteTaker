// LOAD DATA
// We are linking our routes to a series of "data" sources.

const notesJSON = require('../db/db.json');
const store = require('../db/store.js')
const { v4: uuidv4 } = require('uuid');

// ROUTING


module.exports = (app) => {
 
  //API ROUTES
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

  
  // Path to notes
  app.get('/api/notes', (req, res) => {
    store.getNotes().then((notes) =>{
      return res.json(notes)
    }).catch((error)=>res.status(500).json(error)
    )
  });

  // Post API notes
  app.post("/api/notes", (req, res) => {
    store.addNote(req.body).then((note) => res.json(note)).catch((error)=>res.status(500).json(error)
    );
  });

  // DELETE
  app.delete("/api/notes/:id", (req, res) => {
    store.deleteNote(req.params.id).then(() => res.json({ok: true})).catch((error)=>res.status(500).json(error)
    );
  });
}
