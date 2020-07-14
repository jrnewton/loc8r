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
  if (req.query.id) { 
    console.log('path=' + req.path + '; query id=' + req.query.id);
    const location = model.locations[req.query.id];
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
    console.log('path=' + req.path + '; query id not found');
    res.status(418).send('Short and stout');
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
