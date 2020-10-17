'use strict';

const debug = require('debug')('meanwifi:tests');
const supertest = require('supertest');
const app = require('../app');
let request = supertest(app);

function subStringWithEllipsis(string) { 
  const maxLength = 75;
  if (string.length > maxLength) { 
    string = string.substr(0, maxLength) + '...';
  }

  return string;
}

const expectPrinter = function(res) { 
  debug(`status=${res.status}, text=${subStringWithEllipsis(res.text)}`);
};

describe("API smoke tests", function() {
  let location = { };

  before(function() { 
    //create a location to be used for testing 
    return request
      .post('/api/locations')
      .type('form')
      .send( { name: 'Bubble Test', address: '949 Sky Valley Drive Palm Springs CA', facilities: 'wifi', lng: '-71.058884', lat: '42.360081' } )
      .expect(201)
      //.expect(expectPrinter)
      .expect(function(res) { 
        location.id = res.body._id;
      });
  });
  
  it("get single location", function(done) { 
    request
      .get('/api/locations/' + location.id)
      .expect(200)
      .end(done);
  });

  it("get all locations", function(done) { 
    request
      .get('/api/locations')
      .expect(200)
      .end(done);
  });

  it("get location by geo", function(done) { 
    request
      .get('/api/locationsbygeo?lng=-0.7992599&lat=51.378091&maxDistance=20000')
      .expect(200)
      //.expect(expectPrinter)
      .end(done);
  });

  //TODO: create a review and then enable this test 
  // it("get single review", function(done) { 
  //   request
  //     .get('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/5f1edd81e40e5fb13c63c3b5')
  //     .expect(200)
  //     .expect(expectPrinter)
  //     .end(done);
  // });

  it("get bad location", function(done) { 
    request
      .get('/api/locations/1234')
      .expect(404)
      //.expect(expectPrinter)
      .end(done);
  });

  it("get bad review", function(done) { 
    request
      .get('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/1234')
      .expect(404)
      //.expect(expectPrinter)
      .end(done);
  });

  it("get locations by geo too far away", function(done) { 
    request
      .get('/api/locationsbygeo?lng=-71.478610&lat=42.186760&maxDistance=20000')
      .expect(404)
      .expect(expectPrinter)
      .end(done);
  });

  after( function() {
    const closeDb = function() { 
      app.dbConnection.close();
    };

    if (location.id) {
      //delete the location used for testing 
      request
        .del('/api/locations/' + location.id)
        .expect(204)
        //.expect(expectPrinter)
        .end(closeDb);
    }
    else { 
      closeDb();
    }
  });
});
