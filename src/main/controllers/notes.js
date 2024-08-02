import Note from '../models/note.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

export const getAllNotes = asyncWrapper(async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json({ notes })
})

export const createNote = asyncWrapper(async (req, res) => {
  const note = await Note.create(req.body)
  res.status(201).json({ note })
})

export const getSingleNote = asyncWrapper(async (req, res) => {
  const { id: noteID } = req.params
  const note = await Note.findOne({ _id: noteID })
  if (!note) {
    next(createCustomError(`No note with id ${noteID}`, 404))
  } else {
    res.status(200).json({ note })
  }
})

export const editNote = asyncWrapper(async (req, res) => {
  const { id: noteID } = req.params
  const note = await Note.findOneAndUpdate({ _id: noteID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!note) {
    next(createCustomError(`No note with id ${noteID}`, 404))
  } else {
    res.status(200).json({ note })
  }
})

export const deleteNote = asyncWrapper(async (req, res) => {
  const { id: noteID } = req.params
  const note = await Note.findOneAndDelete({ _id: noteID })
  if (!note) {
    next(createCustomError(`No note with id ${noteID}`, 404))
  } else {
    res.status(200).json({ note })
  }
})

