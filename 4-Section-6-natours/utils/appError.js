// topic : sec 9 lec 115 

// extends: inheriting built in Error class in our AppError created class
class AppError extends Error {
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error'
        this.isOperationsl = true;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError; // exporting in main file (better-file-structure.ja)

