// topic: callback hell to promiss

const fs = require('fs');
const superAgent = require('superagent');
// super agent ka use kar k https req mar sakte hai 

fs.readFile(`${__dirname}/starter/dog.txt`, 'utf-8', (err,data)=>{
    if (err)  return console.log('readFile:',err.message);
    
    console.log(`Breed: ${data}`);
    
    superAgent.get(`https://dog.ceo/api/breed/${data}/images/random` ).then(res =>{
        
        fs.writeFile(`${__dirname}/starter/output2.txt`, res.body.message, (err)=>{
             if (err)  return console.log('writeFile:',err.message);
            console.log('file saved');
            
        })

    }).catch(err =>{
        console.log('Error:',err.message);
        
    })
})
