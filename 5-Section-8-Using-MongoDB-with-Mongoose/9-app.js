// topic:98. Making the API Better: Limiting Fields

// 🔹 What is Field Limiting?

// Sometimes you don’t want to send all the fields of a document to the client.
// For example, your Tour model may have:

// {
//   name: "Everest Hike",
//   price: 1200,
//   duration: 14,
//   __v: 0
// }


// But maybe you only want to send name and price back.
// 👉 That’s where field limiting comes in.

// 🔹 How to Implement Field Limiting

// We check if the user passes a query parameter like this:

'127.0.0.1:8000/api/v1/tours?fields=name,price,duration'

//🔹 The select: false means:

// By default, this field will NOT be returned in query results.
// It’s still stored in the database, but it’s hidden unless you explicitly ask for it.
// usefull for sensitive info like password and extra

///🔹mongoose code :
 //4) FIELD LIMITING
    if (req.query.fields) {
      // If 'fields' is provided in the query string (e.g. ?fields=name,price)

      const fieldss = req.query.fields.split(',').join(' ');
      // Convert 'name,price' into 'name price' because mongoose .select() expects space-separated fields

      query = query.select(fieldss);
      // Select only the specified fields from the database
    } else {
      query = query.select('-__v');
      // If no 'fields' query is provided, exclude the '__v' field by default
    }