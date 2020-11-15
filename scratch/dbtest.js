'use strict';

const mongoose = require('mongoose');
const db = require('../app_api/models/db');

const idList = [
  '5f1edd81e40e5fb13c63c3b8', //good format, good data
  'ffffffffffffffffffffffff', //good format, bad data
  'this is not a valid id' //bad format, bad data
];

db.ready.then(() => {
  for (const id of idList) {
    findById(id);
  }
});

function findById(id) {
  const valid = mongoose.isValidObjectId(id);
  db.Location.findById(id)
    .select('_id name')
    .exec((error, location) => {
      if (error) {
        console.log(`[${id}] valid? ${valid}, got error: ${error}`);
      } else {
        if (location) {
          console.log(`[${id}] valid? ${valid}, found it: ${location}`);
        } else {
          console.log(`[${id}] valid? ${valid}, not found: ${location}`);
        }
      }
    });
}
