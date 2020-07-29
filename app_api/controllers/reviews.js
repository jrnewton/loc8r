'use strict';

/* eslint-disable */
const db = require("../../app_api/models/db");

const reviewsCreate = (req, res) => { };
const reviewsReadOne = (req, res) => { 
  let id = req.params.locationid;
  db.Location
    .findById(id)
    //space-separated string of the paths you want to retrieve
    .select('_id name reviews')
    .exec( (error, location) => { 
      //mongoose returns error when bad ID is provided... 
      if (error || !location) {
        return res.status(404).json({ 
          "message": `error retrieving location ${id}`,
          "error": error
        });
      }

      //found it  
      if (location.reviews && location.reviews.length > 0) { 
        let reviewId = req.params.reviewid;
        const review = location.reviews.id(reviewId);
        if (!review) { 
          return res.status(404).json({
            "message": `error retrieving review ${reviewId}`
          });
        }
        else { 
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