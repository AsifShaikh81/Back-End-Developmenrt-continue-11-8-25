    const fs = require('fs')
    const http = require('http')
    const url = require('url')

    const data = fs.readFileSync('./data.json','utf-8');
    const dataObj = JSON.parse(data)
    
    const server = http.createServer((req,res)=>{
        const pathName = req.url
        

        if(pathName === '/api'){
           
            res.writeHead(200,{"Content-type":"application/json"})
            res.end(data) // res.end() --> will accept only string and buffer
            
                
           
        }else {
            res.end('hi')
        }
        
    })

    const port =8000;
    server.listen(port, '127.0.0.1',()=>{
        console.log(`listening on port ${port}`);
        
    })

    //NOTE:
    // in Node.js, you can only send one response per request.

    //note vv imp:
    // in this situation using sync way to read file bcz every time user hit '127.0.0.1:8000' it will read file every time ,so to stop reading file every time i use 'readfilesync' and 'readfilesync' is at top level so it will execute first and it's out of the block scope so read file only once