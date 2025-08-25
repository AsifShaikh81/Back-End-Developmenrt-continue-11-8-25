// topic:Making the API Better: Pagination

// 🔹 What is Pagination?

// When you have thousands of documents in MongoDB, you don’t want to send them all at once.
// 👉 Instead, you split results into pages with a certain limit per page.

// Example:

// Page 1 with 10 items → items 1–10

// Page 2 with 10 items → items 11–20

// Page 3 with 10 items → items 21–30

// 🔹 Query Parameters

// You usually send pagination info in the URL:

// 127.0.0.1:8000/api/v1/tours?page=2&limit=10


// page=2 → which page you want

// limit=10 → how many results per page

// 🔹 Mongoose Code for Pagination
  //5)PAGINATION
    const page= req.query.page * 1 || 1;
    // Convert page to number (default = 1).
    // Example: ?page=2 → pages = 2

    const limit = req.query.limit * 1 || 100;
    // Convert limit to number, default is 100
    // Example: ?limit=3 → limits = 3

    const skip = (page - 1) * limit;
    // How many documents to skip before fetching results.
    //  Example: page=2, limit=10 → skip = (2-1)*10 = 10

    query = query.skip(skip).limit(limit);
    // Apply skip & limit to the mongoose query
    // Example: skip(3).limit(3) → fetches docs 4–6

    if (req.query.page) {
      // Check if the user has provided a "page" query parameter in the URL
      // Example: /api/v1/tours?page=2&limit=10
      // If no page is passed, we skip this block

      const numTours = await Tour.countDocuments(); //countDocuments()= count number of document exist in collection

      if (skip >= numTours) throw new Error('page not exist');
      // 'skips' is how many documents we skip before fetching results
      // If skips is greater than or equal to total documents,
      // it means the user asked for a page number that doesn't exist
      // In that case, throw an error with message "page not exist"
    }