//topic: lect:119. Handling Invalid Database IDs
const AppError = require("../utils/appError"); // for lect 119

const handleCastErrorDB = (err)=>{
const mesg = `invalid ${err.path}:${err.value}`
return new AppError(mesg,404)
}

 let error = {...err} // lect 119
    if (error.name === 'CastError')   error = handleCastErrorDB(err) // lect 119
    sendErrorProd(error, res); // lect 119 changeg err to error
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
x   