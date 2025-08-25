// topic:97. Making the API Better: Sorting
// in this we will learn sorting like , sorting high price to low price

// .sort() : In MongoDB / Mongoose, .sort() is used to arrange the documents (data) in ascending or descending order based on a field.

// Suppose you have a users collection like this:
[
  { "name": "Ali", "age": 25 },
  { "name": "Zara", "age": 20 },
  { "name": "Bilal", "age": 30 }
]

// Case 1: Ascending Order (small → big)
User.find().sort({ age: 1 });

// output
[
  { "name": "Zara", "age": 20 },
  { "name": "Ali", "age": 25 },
  { "name": "Bilal", "age": 30 }
]


// Case 2: Descending Order (big → small)
User.find().sort({ age: -1 });

// 👉 Output:
[
  { "name": "Bilal", "age": 30 },
  { "name": "Ali", "age": 25 },
  { "name": "Zara", "age": 20 }
]

// ✅ In short:

 .sort({ field: 1 }) //positive → ascending order

.sort({ field: -1 }) //negative → descending order

    
//🔹mongoose code
//3) SORTING
    if (req.query.sort) {
      // If 'sort' is provided in the query string (e.g. ?sort=price or ?sort=-price)

      const sortBy = req.query.sort.split(',').join(' ');
      // Convert 'price,ratingsAverage' into 'price ratingsAverage'
      // Mongoose expects space-separated fields for sorting

      console.log(sortBy);
      // Just for debugging: logs the fields we are sorting by

      query = query.sort(sortBy);
      // Apply sorting to the query based on the fields provided
    } else {
      query = query.sort('-createdAt');
      // If no sort query is provided, sort results by 'createdAt' field in descending order (newest first)
    }
