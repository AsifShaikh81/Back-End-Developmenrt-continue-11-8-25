
//topci lect 123:Catching Uncaught Exceptions
process.on('uncaughtException',err=>{
   console.log(err.name,err.message);
  console.log('unhandled rejection 💥 shutting down..');
  process.exit(1)

})