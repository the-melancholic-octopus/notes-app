const express = require('express')
const router = express.Router()
import {
  getAllNotes,
  getSingleNote,
  createNote,
  editNote,
  deleteNote
} from '../controllers/notes.js'

router.route('/').get(getAllNotes).post(createNote)
router.route('/:id').get(getSingleNote).patch(editNote).delete(deleteNote)

export default router
