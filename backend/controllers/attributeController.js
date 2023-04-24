// @desc    Add attributes to users
// @route   POST /api/users/attributes
// @access  Private
const addAttributes = asyncHandler(async (req, res) => {
    res.json({message : 'Attributes successfully added '})
})

module.exports = {
    addAttributes,
}