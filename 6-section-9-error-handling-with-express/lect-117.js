// topic: lec:117. Adding 404 Not Found Errors
// remember sec 8 and sec 9 code impleneted in sec 4 

// all explaination notebook


if(!DATA){
    return next(new AppError(`not tour found with that id`,404))
}
