'use strict';

const debug = require('debug')('meanwifi:controllers');
/* eslint-disable */
const db = require("../models/db");

const reviewsCreate = (req, res) => { };
const reviewsReadOne = (req, res) => { 
  const id = req.params.locationid;
  const reviewId = req.params.reviewid;
  db.Location
    .findById(id)
    //The select() method accepts a space-separated string of the paths you want to retrieve.
    .select('_id name reviews')
    .exec( (error, location) => { 
      
      //mongoose returns error when bad ID is provided... 
      if (error || !location) {
        const msg = `error retrieving location '${id}'`;
        console.error(msg);
        return res.status(404).json({ 
          "message": msg, 
          "error": error
        });
      }
      //found location
      else {
        debug(`success retrieving location '${id}'`);
        if (location.reviews && location.reviews.length > 0) { 
          const review = location.reviews.id(reviewId);
          if (!review) { 
            const msg = `error retrieving review '${reviewId}'`;
            return res.status(404).json({
              "message": msg 
            });
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
          const msg = `no reviews for location ${id}`;
          console.error(msg);
          return res.status(404).json({
            "message": msg
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
