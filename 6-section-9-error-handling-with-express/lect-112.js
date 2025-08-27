/* Lecture 112:Handlin Unhandled Routes
Handling Unhandled Routes

What is it about?
If we hit a wrong route (or a route that doesn’t exist).

Basically, we will create a handling function for all routes that do not match by router (doesn’t exist).

app.all() → works for all HTTP methods

'*' → all routes 

req.originalUrl ->url requested by user
*/


app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});


// Note:
// Add middleware after defining routes, otherwise it won’t work.

// check sec 4:better file structure js file for example
