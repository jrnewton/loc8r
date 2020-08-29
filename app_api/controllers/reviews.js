'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('meanwifi:controllers');
/* eslint-disable */
const db = require("../models/db");

const reviewsCreate = (req, res) => { };
const reviewsReadOne = (req, res) => { 
  const id = req.params.locationid;
  const reviewId = req.params.reviewid;
  
  const idValid = mongoose.Types.ObjectId.isValid(id);
  const reviewIdValid = mongoose.Types.ObjectId.isValid(reviewId);

  debug(`reviewsReadOne id=${id}; valid=${idValid}, reviewId=${reviewId}; valid=${reviewIdValid}`);

  if (!idValid) {
    return res.status(404).json({ "message": `location id '${id}' not valid` });
  }

  if (!reviewIdValid) {
    return res.status(404).json({ "message": `review id '${id}' not valid` });
  }
  

  db.Location
    .findById(id)
    //The select() method accepts a space-separated string of the paths you want to retrieve.
    .select('_id name reviews')
    .exec( (error, location) => { 
      
      //mongoose returns error when bad ID is provided... 
      if (error) { 
        return res.status(500).json({ "message": error.message });
      }
      else if (!location) {
        return res.status(404).json({ "message": `location '${id}' not found` });
      }
      //found location
      else {
        debug(`success retrieving location '${id}'`);
        if (location.reviews && location.reviews.length > 0) { 
          const review = location.reviews.id(reviewId);
          if (!review) { 
            return res.status(404).json({ "message": `review '${reviewId}' not found` });
          }
          else { 
            debug(`success retrieving review '${reviewId}'`);
            return res.status(200).json({
              location: { 
                name: location.name, 
                id: location._id
              },
              review
            });
          }
        }
        else { 
          return res.status(404).json({
            "message": `no reviews for location ${id}`
          });
        }
      }
    });
};
const reviewsUpdateOne = (req, res) => { };
const reviewsDeleteOne = (req, res) => { };

module.exports = {
  reviewsCreate, 
  reviewsReadOne, 
  reviewsUpdateOne,
  reviewsDeleteOne
}
