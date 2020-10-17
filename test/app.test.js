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
  //debug(`status=${res.status}, text=${subStringWithEllipsis(res.text)}`);
};

describe("API smoke tests", function() {
  let location = { };

  it("create location", function(done) { 
    request
      .post('/api/locations')
      .type('form')
      .send( { name: 'Bubble Test', address: '949 Sky Valley Drive Palm Springs CA', facilities: 'wifi', lng: '-71.058884', lat: '42.360081' } )
      .expect(201)
      .expect(function(res) { 
        location.id = res.body._id;
      })
      .expect(expectPrinter)
      .end(function() {
        request
          .get('/api/locations/' + location.id)
          .expect(200)
          .end(done);
       });
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
      .expect(expectPrinter)
      .end(done);
  });

  it("get single review", function(done) { 
    request
      .get('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/5f1edd81e40e5fb13c63c3b5')
      .expect(200)
      .expect(expectPrinter)
      .end(done);
  });

  it("get bad location", function(done) { 
    request
      .get('/api/locations/1234')
      .expect(404)
      .expect(expectPrinter)
      .end(done);
  });

  it("get bad review", function(done) { 
    request
      .get('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/1234')
      .expect(404)
      .expect(expectPrinter)
      .end(done);
  });

  it("get locations by geo too far away", function(done) { 
    request
      .get('/api/locationsbygeo?lng=-71.058884&lat=42.360081&maxDistance=1')
      .expect(404)
      .expect(expectPrinter)
      .end(done);
  });

  it("delete location", function(done) { 
    request
      .del('/api/locations/' + location.id)
      .expect(204)
      .expect(expectPrinter)
      .end(done);
  });
  
  after( function() { 
    app.dbConnection.close();
  });
});