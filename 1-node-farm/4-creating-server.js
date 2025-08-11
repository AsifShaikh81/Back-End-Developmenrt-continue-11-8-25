const Http = require('http');

const server = Http.createServer((req,res)=>{
    res.end("Hello from server")
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to request on port 8000');
    
})

// *NOTE:
// require('http'): Loads the built-in Node.js HTTP module.
// http.createServer(): Creates a new HTTP server instance.
// (req, res) => {}: A callback function that handles every incoming request.
// res.end(): Ends the response and sends data back to the client.
// server.listen(port, hostname, callback): Starts the server and listens for requests.