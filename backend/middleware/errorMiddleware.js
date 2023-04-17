// This is to overwrite default express error handler

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message : err.message,
        stack : null
    })
}

module.exports = {
    errorHandler,
}