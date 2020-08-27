'use strict';

const supertest = require('supertest');
const app = require('../app');
let request = supertest(app);

const basicGetRequest = function(url, status, done) { 
  request
    .get(url)
    .expect(status)
    .end( (err /*, res*/) => { 
      if (err) {
        throw err;
      }
      else { 
        done();
      }
    });

}

describe("API smoke tests", () => { 
  it("GET locations", (done) => { basicGetRequest('/api/locations', 200, done) });
  it("GET locations by geo", (done) => { basicGetRequest('/api/locationsbygeo?lng=-0.7992599&lat=51.378091&maxDistance=20000', 200, done) })
  it("GET specific location", (done) => { basicGetRequest('/api/locations/5f1edd81e40e5fb13c63c3b8', 200, done) });
  it("GET specific review", (done) => { basicGetRequest('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/5f1edd81e40e5fb13c63c3b5', 200, done) });
  it("GET bad location", (done) => { basicGetRequest('/api/locations/1234', 404, done) });
  it("GET bad review", (done) => { basicGetRequest('/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/4321', 404, done) });
  after( () => { 
    app.dbConnection.close();
  });
});
