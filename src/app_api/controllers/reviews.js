'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('meanwifi:api_controllers');
const db = require('../models/db');

function updateAverageRating(location) {
  if (location.reviews) {
    let avgRating = 0;

    if (location.reviews.length == 0) {
      avgRating = 0;
    } else {
      const count = location.reviews.length;
      const total = location.reviews.reduce((accumulator, { rating }) => {
        return accumulator + rating;
      }, 0);
      avgRating = Math.floor(total / count);
    }
    debug(`new avg rating is ${avgRating}`);

    location.rating = avgRating;
    location.save((error, location) => {
      if (error) {
        console.error(error.message);
      } else {
        debug(
          `avg rating for location ${location._id} updated to ${location.rating}`
        );
      }
    });
  }
}

function createOrUpdateReview(req, existingReview) {
  if (!existingReview) {
    existingReview = {};
    debug('create new review');
  }

  existingReview.author = req.body.author;
  existingReview.rating = parseInt(req.body.rating, 10);
  existingReview.reviewText = req.body.reviewText;

  return existingReview;
}

function addReview(req, res, location) {
  const newReview = createOrUpdateReview(req);

  location.reviews.push(newReview);
  debug('review pushed');

  location.save((error, location) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      debug('location saved');

      const theNewReview = location.reviews.slice(-1).pop(); //[location.reviews.length -1];

      updateAverageRating(location);

      return res.status(201).json(theNewReview);
    }
  });
}

const reviewsCreate = (req, res) => {
  const locationId = req.params.locationid;
  const valid = mongoose.isValidObjectId(locationId);
  debug(`locationsReadOne id='${locationId}', valid=${valid}`);

  if (!valid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  db.Location.findById(locationId)
    .select('_id reviews')
    .exec((error, location) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else if (!location) {
        return res.status(404).json({ message: 'location not found' });
      } else {
        return addReview(req, res, location);
      }
    });
};

const reviewsReadOne = (req, res) => {
  const id = req.params.locationid;
  const reviewId = req.params.reviewid;

  const idValid = mongoose.isValidObjectId(id);
  const reviewIdValid = mongoose.isValidObjectId(reviewId);

  debug(
    `reviewsReadOne id=${id}; valid=${idValid}, reviewId=${reviewId}; valid=${reviewIdValid}`
  );

  if (!idValid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  if (!reviewIdValid) {
    return res.status(404).json({ message: 'review id not valid' });
  }

  db.Location.findById(id)
    //The select() method accepts a space-separated string of the paths you want to retrieve.
    .select('_id name reviews')
    .exec((error, location) => {
      //mongoose returns error when bad ID is provided...
      if (error) {
        return res.status(500).json({ message: error.message });
      } else if (!location) {
        return res.status(404).json({ message: 'location id not found' });
      }
      //found location
      else {
        debug(`success retrieving location '${id}'`);
        if (location.reviews && location.reviews.length > 0) {
          const review = location.reviews.id(reviewId);
          if (!review) {
            return res.status(404).json({ message: 'review id not found' });
          } else {
            debug(`success retrieving review '${reviewId}'`);
            return res.status(200).json({
              location: {
                name: location.name,
                id: location._id
              },
              review
            });
          }
        } else {
          return res.status(404).json({ message: 'no reviews for location' });
        }
      }
    });
};
const reviewsUpdateOne = (req, res) => {
  const id = req.params.locationid;
  const reviewId = req.params.reviewid;

  const idValid = mongoose.isValidObjectId(id);
  const reviewIdValid = mongoose.isValidObjectId(reviewId);

  debug(
    `reviewsUpdateOne id=${id}; valid=${idValid}, reviewId=${reviewId}; valid=${reviewIdValid}`
  );

  if (!idValid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  if (!reviewIdValid) {
    return res.status(404).json({ message: 'review id not valid' });
  }

  db.Location.findById(id)
    //The select() method accepts a space-separated string of the paths you want to retrieve.
    .select('_id name reviews')
    .exec((error, location) => {
      //mongoose returns error when bad ID is provided...
      if (error) {
        return res.status(500).json({ message: error.message });
      } else if (!location) {
        return res.status(404).json({ message: 'location id not found' });
      }
      //found location
      else {
        debug(`success retrieving location '${id}'`);
        if (location.reviews && location.reviews.length > 0) {
          const review = location.reviews.id(reviewId);
          if (!review) {
            return res.status(404).json({ message: 'review id not found' });
          } else {
            debug(`success retrieving review '${reviewId}'`);
            createOrUpdateReview(req, review);
            //save parent location
            location.save((error, location) => {
              if (error) {
                return res.status(500).json({ message: error.message });
              } else if (!location) {
                return res.status(404).json({ message: 'location not found' });
              } else {
                return res.status(200).json(location);
              }
            });
          }
        } else {
          return res.status(404).json({ message: 'no reviews for location' });
        }
      }
    });
};

const reviewsDeleteOne = (req, res) => {
  const id = req.params.locationid;
  const reviewId = req.params.reviewid;

  const idValid = mongoose.isValidObjectId(id);
  const reviewIdValid = mongoose.isValidObjectId(reviewId);

  debug(
    `reviewsDeleteOne id=${id}; valid=${idValid}, reviewId=${reviewId}; valid=${reviewIdValid}`
  );

  if (!idValid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  if (!reviewIdValid) {
    return res.status(404).json({ message: 'review id not valid' });
  }

  db.Location.findById(id)
    .select('_id name reviews')
    .exec((error, location) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else if (!location) {
        return res.status(404).json({ message: 'location id not found' });
      }
      //found location
      else {
        debug(`success retrieving location '${id}'`);
        if (location.reviews && location.reviews.length > 0) {
          location.reviews.id(reviewId).remove();
          //save parent location
          location.save((error, location) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            } else if (!location) {
              return res.status(404).json({ message: 'location not found' });
            } else {
              return res.status(204).end();
            }
          });
        }
      }
    });
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
