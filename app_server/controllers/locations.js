'use strict';

const model = require("../model/model.js");

const homeList = (req, res) => { 
  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      
      pageHeader: 
      {
        title: 'Loc8r',
        tagline: 'Find places to work with wifi near you!'
      }, 
      
      locations: Object.values(model.locations)
    }
  );
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
        location: location
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
  addReview
};
