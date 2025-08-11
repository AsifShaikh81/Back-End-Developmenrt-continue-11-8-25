const Http = require('http');
const Url = require('url'); 


const serv = Http.createServer((req,res)=>{
    // console.log(req.url);
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
    res.end('hello from server');
    } else if (pathName === '/about') {
        res.end('this is about page')
    } else{
        // Header - should be always before response
        res.writeHead(404,{
            "content-type":'text/html',  //browser expecting some html
            'my-own-header':'hello world' // custom headerf
        })
        // Header
        res.end('<h1>page not found</h1>');
        
    }
    
})

serv.listen(8080,'127.0.0.2',()=>{
    console.log('listening on port 8080');
    
})

