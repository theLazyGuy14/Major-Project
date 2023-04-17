const asyncHandler = require('express-async-handler')

// @desc        Get Notes
// @route       GET /api/notes
// @access      Private
const getNotes = asyncHandler(async (req, res) => {
    res.status(200).json({message : ' Get notes '})
})

// @desc        Set note
// @route       POST /api/notes
// @access      Private
const setNote = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error(' Please add a text field ')
    }

    res.status(200).json({message : ' Create note '})
})

// @desc        Delete Note
// @route       DELETE /api/notes/:id
// @access      Private
const deleteNote = asyncHandler(async (req, res) => {
    res.status(200).json({message : ' Delete note '})
})

module.exports = {
    getNotes,
    setNote,
    deleteNote
}