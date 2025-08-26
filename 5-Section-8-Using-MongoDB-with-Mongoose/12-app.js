//topic: 103. Aggregation Pipeline: Unwinding and Projecting
/* 1. //*what is Unwind ( $unwind )
*Imagine you have a box of chocolates 🍫 inside another big box 📦.
*$unwind opens the big box and takes each chocolate out separately.

👉 In MongoDB, if you have an array field (like hobbies: ["reading", "gaming", "coding"]), $unwind will split it into separate documents: */

/* //*Before $unwind:
{
  "name": "Asif",
  "hobbies": ["reading", "gaming", "coding"]
} */

/*  //* After $unwind:

{ "name": "Asif", "hobbies": "reading" }
{ "name": "Asif", "hobbies": "gaming" }
{ "name": "Asif", "hobbies": "coding" } */


/* ✅ In short:
$unwind = breaks arrays into individual items so you can work with them one by one. */

/* 2 //*Projection (in MongoDB Aggregation Pipeline)
👉 Definition: Projection means choosing what fields (columns) to show or hide from the documents.

📌 //*Example:
If a document has:
{ "name": "Asif", "age": 22, "city": "Mumbai" }


//*With projection { name: 1, city: 1 }, output will be:
{ "name": "Asif", "city": "Mumbai" }


//*With projection { age: 0 }, output will be:
{ "name": "Asif", "city": "Mumbai" }

//*In short:
Projection = "filtering fields" (what you want to see, what you don’t). */

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.YEAR * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates' // unwrap startDates array 
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),// create new date and match with document
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' }, // $month = Returns the month for a date as a number between 1 (January) and 12 (December).
          numTourStarts: { $sum: 1 }, // counting number of tours for each months
          tours: { $push: '$name' }  // collects values into an array
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0 // 0 = hide ,1 = show
        }
      },
      {
        $sort: { numTourStarts: -1 } //positive 1 asc , negative -1 des
      },
      {
        $limit: 12 // only return 12 documents
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};