const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  text: {
    type: Object
  },
  title: {
    type: String
  }
})

export default mongoose.model('Note', NoteSchema)
