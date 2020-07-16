const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true
  }
});

const reviewSchema = new mongoose.Schema({
  rating: { 
    type: Number,
    required: true
  },
  author: { 
    type: Number,
    required: true
  },
  date: { 
    type: Number,
    required: true
  },
  text: { 
    type: Number,
    required: true
  }
});

const locationSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true
  },
  address: {
    type: String,
    required: true
  },
  reviewLead: String,
  coords: {
    type: String, 
    /* To meet the GeoJSON specification, a coordinate pair must be entered
       into the array in the correct order: longitude, then latitude. Valid longitude
       values range from -180 to 180, whereas valid latitude values range from -90 to
       90. 
    */
    coordinates: [Number]
  },
  rating: { 
    type: Number,
    'default': 0,  //default is reserved word so be safe and quote it.
    min: 0, 
    max: 5
  },
  facilities: [String],
  distance: String,
  openingHours: [openingTimeSchema], 
  reviews: [reviewSchema]
});

locationSchema.index({coords: '2dsphere'});

mongoose.model(/* model name */ 'Location', /* schema, duh */ locationSchema, /* collection name (optional) */ 'locations');