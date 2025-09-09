/*  in this lecture, let's use geospatial aggregation in order to calculate distances 
to all the tours from a certain point. */

//*note
/* keep geoNear always in first stage.

to use geoNear , atleast one field shoud contain geospatial index, in our case we have tourSchema.index({startLocation:'2dsphere'}).

if you have multiple fields with geospatial indexes then you need to use the keys parameter in order to define the field that you want to use for calculations. */


exports.getDistance = async (req, res) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude in format lat,lng', 400));
  }

  const tours = await Tour.aggregate([
    {
      $geoNear: {
        //*near:point from which to calculate the distances,all the distances will be calculated from this point that we define here
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        //*distanceField, and so this is the name of the field that will be created and where all the calculated distances will be stored.
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: tours,
    },
  });
};


