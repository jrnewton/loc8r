'use strict';

const model = require("../../app_api/models/static");
const db = require("../../app_api/models/db");

const homeList = (req, res) => { 
  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      
      pageHeader: 
      {
        title: 'Loc8r',
        tagline: 'Find places to work with wifi near you!'
      }, 
      
      locations: model.locations
    }
  );
};

const locationReadOne = (req, res) => { 
  console.log(`searching for ${req.params.locationid}`);
  db.Location
    .findById(req.params.locationid)
    .exec( (err, location) => { 
      if (err) { 
        return res.status(404).json(err);
      }
      else if (!location) { 
        return res.status(404).json({"message": "location not found"});
      }
      else { 
        res.render('location-info', { 
          title: 'Loc8r - Location Info - ' + location.name, 
          pageHeader: 
          {
            title: 'Loc8r',
            tagline: 'Find places to work with wifi near you!'
          },
          location: location, 
          gsm_key: process.env.GSM_KEY
        });
      }
    });
};

const locationInfo = (req, res) => { 
  const locationId = req.query.id;
  if (locationId) { 
    console.log(`path=${req.path}; location id=${locationId}`);
    const location = model.locations[locationId];
    if (location) { 
      res.render('location-info', { 
        title: 'Loc8r - Location Info - ' + location.name, 
        pageHeader: 
        {
          title: 'Loc8r',
          tagline: 'Find places to work with wifi near you!'
        },
        location: location, 
        gsm_key: process.env.GSM_KEY
      });
    }
    else {
      console.log(`path=${req.path}; location id ${locationId} not found`);
      res.status(404).send(`Location id ${locationId} not found`);
    }
  }
  else { 
    console.log(`path=${req.path}; missing location id`);
    res.status(404).send('Location id required');
  }
}

const addReview = (req, res) => { 
  res.render('location-review', { title: 'Loc8r - Add Review' });
}

module.exports = {
  homeList,
  locationInfo,
  addReview, 
  locationReadOne
};
