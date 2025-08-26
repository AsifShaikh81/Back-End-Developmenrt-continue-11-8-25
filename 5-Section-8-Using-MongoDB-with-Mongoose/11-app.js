
//topic:102. Aggregation Pipeline: Matching and Grouping


//aggreagation pipeline use to calculate max,min,average, doument pass through stages one by one step by step in define sequence and each stage does some work (filter, group, sort, etc.) at the end, we get processed results. 

/* 🔹 Why use both?

$match first → reduces data (only keep what matters).

$group later → summarizes that filtered data.

This makes queries faster and results clearer.

👉 In short:

$match = "Show me only the useful data" (filter).

$group = "Now summarize this data" (report). */

/* ⭕3. Real-World Analogy

Imagine a supermarket 🛒 with thousands of bills (orders).
If you want to know:
“How much each customer spent in total?”
Without aggregation:
You take all bills home 🏠 and manually add totals (slow, error-prone).
With aggregation:
You tell the supermarket’s billing software: “Show totals grouped by customer.”
The software gives you results instantly ⚡. */

/* ✅ In short:

$match = like WHERE in SQL.

$group = like GROUP BY in SQL.

Together = "WHERE + GROUP BY" in MongoDB. */

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, //$toUpper conver to uppercase, difficulty field ko uppercase mein kardega
          countTours: { $sum: 1 }, // counting number of tours
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
      {
        //------new field name
        $sort: { avgPrice: 1 }, // here we using new field name 'avgPrice' not old field name 'price' kyu ki ye stage by stage work karta hai
      },
      {
      
        $match: { _id: {$ne:'EASY'} }, // u can repeat stages
      },
    ]);
    console.log('🔥 Stats from DB:', stats);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};