//Topic:106. Query Middleware
/* 🔹 What is Query Middleware?

Query middleware allow us to run certain function before or after a query is executed (like find, findOne, updateOne, etc.).
It lets you change the query or do something extra automatically whenever you run a query.

🔹 Why is it used?
To filter data automatically (e.g., hide secret data like "deleted = true").
To log queries for debugging.
To add extra conditions without writing them everywhere. */


// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); 
  next();
});

// tourSchema.post('find', function (docs, next) {
 tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});

// this -> "this" refers to the current query object
// docs -> document that return from/by the query
// regex /^find/- > all the query that starts with find(find(), findOne(), etc) usme ye function run honge ,har ek query ke liye alag se define karne acha hai hum regex use karle