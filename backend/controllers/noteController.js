const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')

// @desc        Get Notes
// @route       GET /api/notes
// @access      Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find()

    res.status(200).json(notes)
})

// @desc        Set note
// @route       POST /api/notes
// @access      Private
const setNote = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error(' Please add a text field ')
    }

    const cardNote = await Note.create({
        note : req.body.text
    })

    res.status(200).json(cardNote)
})

// @desc        Delete Note
// @route       DELETE /api/notes/:id
// @access      Private
const deleteNote = asyncHandler(async (req, res) => {

    const delNote = await Note.findById(req.params.id)

    if(!delNote) {
        res.status(400)
        throw new Error(' Note not found ')
    }

    await delNote.deleteOne()

    res.status(200).json({ id : req.params.id })
})

module.exports = {
    getNotes,
    setNote,
    deleteNote
}