// 160. Adding a Nested GET Endpoint
// same like previ lect 159



// get all Reviews for specific tour 

// GET /:tourID/reviews

// inside review controller
// explaination for below code https://chatgpt.com/c/68bbeee3-0288-8328-bb13-a06a866daa50
let filter = {}
if(req.params.tourID) filter = {tour:req.params.tourID}

const reviews= await Review.find(filter);
