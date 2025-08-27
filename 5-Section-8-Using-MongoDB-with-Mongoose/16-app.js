//topic: 107. Aggregation Middleware
/* 🔹 What is Aggregation Middleware?

Aggregation middleware lets you run certain function before or after any aggregation pipeline runs.

pre('aggregate') → runs before the aggregation query executes.

post('aggregate') → runs after the aggregation query finishes.

🔹 Why is it used?

It is useful when you always want to automatically modify your aggregation pipelines.
👉 Example: Automatically hide secret tours, or always add a match stage before queries. */

const { pipeline } = require("superagent/lib/node/response");

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
  console.log(this.pipeline());
  next()
  
  
})

/* this -> points to the curreny aggregation Object.
pipeline() -> array of stages ,it is aggregation method/function.
unshift()-> javascript method use to add element in the beggining of array.

this.pipeline().unshift() --> add element({$match:{secretTour:{$ne:true}}}) in the beggining of array pipeline */
