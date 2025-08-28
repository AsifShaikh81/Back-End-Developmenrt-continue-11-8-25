//topic:116. Catching Errors in Async Functions

// remember sec 8 and sec 9 code impleneted in sec 4 

// remember sec 8 and sec 9 code impleneted in sec 4 
// refers notebook for explaination
// creating try catch function that will catch error for all async function ,this function is inside utils folder
const tryCatchAsync = fn=>{
    return(req,res,next) =>{
        fn(req,res,next).catch(next) // calling, next-> for catching error 
    }

}
// now here wraping created try catch function 
const creat = tryCatchAsync(async(req,res,next)=>{
 // all the code of async function 
})

// wrap "tryCatchAsync"  inside all the async func in tourcontroller-DB