// topic :Consuming Promises with Async/Await
const fs = require('fs');
const superAgent = require('superagent')

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

// async/await
const getDogPic = async ()=>{
    try{
    const data  = await readFilePromise(`${__dirname}/starter/dog.txt`)
    console.log(`Breed: ${data}`);

    const result = await superAgent.get(`https://dog.ceo/api/breed/${data}/images/random` )
    console.log(result.body.message);

    await writeFilePromise(`${__dirname}/starter/output4.txt`, result.body.message) //here not saving data in var bcz its writing file 
    console.log('random dog img file saved😊');
    }catch (err) {
      console.log('Error',err.message);
      
    }
    
    
    
}
getDogPic();