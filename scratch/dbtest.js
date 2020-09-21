'use strict';

const db = require('../app_api/models/db');

const locationId = '5f1edd81e40e5fb13c63c3b8';
db.Location
  .findById(locationId)
  //.select('_id name reviews')
  .exec( (error, location) => {
    if (error) { 
      console.error(error);
    }
    else { 
      console.log(location);
      console.log(location.reviews[0]); //.remove();
      // location.save( (err, doc) => { 
      //   if (err) { 
      //     console.error(err);
      //   }
      //   else { 
      //     console.log(doc);
      //   }
      // } );
    }
  } );