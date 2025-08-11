
const fs = require('fs')

// synchronous:blocking
// const Read = fs.readFileSync('./starter/txt/input.txt','utf-8');
// console.log(Read);

// const Write = "'writing the file'"
// fs.writeFileSync('./starter/txt/output.txt',Write)


// Asynchronous:non-blocking
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);

// })

// fs.writeFile('./starter/txt/output2.txt', 'utf-8', (err) => {
//     console.log('file written');

// })

// console.log('will read and write file');

// call-back 
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('Error');
    
    
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        
        fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./starter/txt/output3.txt' ,`${data2}\n${data3}`, 'utf-8', (err)=>{
                console.log('file has been written ');
                
            })

        })
    })
})

//this is also call callBack hell