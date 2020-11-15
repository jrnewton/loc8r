'use strict';

const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  openingTime: String,
  closingTime: String,
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
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  },
  reviewText: {
    type: String,
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
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    /* To meet the GeoJSON specification, a coordinate pair must be entered
       into the array in the correct order: longitude, then latitude. Valid longitude
       values range from -180 to 180, whereas valid latitude values range from -90 to
       90. 
    */
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  rating: {
    type: Number,
    default: 0, //default is reserved word so be safe and quote it.
    min: 0,
    max: 5
  },
  facilities: [String],
  distance: String,
  //BUG see #121
  openingHours: [openingTimeSchema],
  reviews: [reviewSchema]
});

locationSchema.index({ coords: '2dsphere' });

/*
  If you use multiple connections, you should make sure you export schemas, not models. 
  Exporting a model from a file is called the export model pattern. 
  The export model pattern is limited because you can only use one connection.
  https://mongoosejs.com/docs/connections.html
*/
module.exports.schema = locationSchema;
