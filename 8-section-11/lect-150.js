/*     //*sec 11 lect 150. Modelling Locations (Geospatial Data)
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    //*sec 11 lect 150 */

/*🔹 What You Learn in Lecture 150:

How to Model Locations in MongoDB

MongoDB supports GeoJSON format for storing geospatial data.

Example of a location field in a schema:

location: {
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'] // GeoJSON only supports 'Point' for single coords
  },
  coordinates: [Number], // [longitude, latitude]
  address: String,
  description: String
}


⚠️ Important: Coordinates must be in [longitude, latitude] order, not [latitude, longitude].

Why Geospatial Data is Important

It allows you to do things like:

Find all tours near a given location.

Calculate distances between places.

Build features like "find restaurants near me" or "find tours within 10 km". */
