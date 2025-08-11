// Topic = Building promise
const fs = require('fs');
const superAgent = require('superagent');



//building read file promise
const readFilePromise = file =>{
    return new Promise((resolve, reject) => {
        fs.readFile(file,'utf-8',(err,data)=>{
            if (err) return reject('file could not read 😞')
                resolve(data)
        })
    })
}
//building write file promise
const writeFilePromise = (file,data) =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,(err)=>{
            if (err) return reject('file could not write 😞')
            resolve('success')    
        })
    })
}

readFilePromise(`${__dirname}/starter/dog.txt`)
 .then(data => {
 console.log(`Breed:${data}`);
 return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random` )
    
})
.then(res =>{
    console.log(res.body.message);
    return writeFilePromise(`${__dirname}/starter/output3.txt`, res.body.message)
    
})
.then(() =>{
    console.log('random dog img file saved😊');
    
})
.catch(err =>{
    console.log(err.message);
    
})