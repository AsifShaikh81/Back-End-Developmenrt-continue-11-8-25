// 171. Geospatial Queries: Finding Tours Within Radius

// for example tu jahan khade hoo waha se 10km ki duri pe koi tour dhundna chahta hai toh kaise dhundega, geospatial woh tarika hai, toh yeh lecture mein hum ye sikhenge

//point A(asif standing here)---------asif will search 10km ke andar kitne ya kaunse tours hai---------pont b('the park camper)

//point A se point pont b ka dis calulate kiase hua ? by Geospatial technique

/* Q) humne Geospatial query 'startLocation' mein hii kyu lagaya ?
kyu ki 'startLocation' field mein har ek tour ka location/coordinates store hai  */
// startLocation is field mein humne pehle se hii lat aur long dal ke rakha hai hai ek document ke liye check tour model

//inside tour route
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(TourControllersDB.getToursWithin);


exports.getToursWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params; // ✅ correct
  const [lat, lng] = latlng.split(','); // ✅ split correctly

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude in format lat,lng', 400));
  }

  console.log(distance, lat, lng, unit);

  const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });

  res.status(200).json({
    status: 'success',
    data: {
      data: tours,
    },
  });
};

// setting index ,basicly hum mongo db se keh rahe 'startlocation' ko 2dsphere mein set kardo , 2dsphere earth ka shape hai
// open compas inside schema check startLocation field
tourSchema.index({startLocation:'2dsphere'}) //lect 171



// what this lines means
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
/*   if distance is in miles than divide distance with 3963.2
else, if distance is in km  than divide distance with 6378.1
3963.2 => earth radius in miles
6378.1 => earth radius in km */