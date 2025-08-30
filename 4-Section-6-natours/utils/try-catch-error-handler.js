module.exports = fn=>{
    return(req,res,next) =>{
        fn(req,res,next).catch(next) // calling, next-> for catching error 
    }

}