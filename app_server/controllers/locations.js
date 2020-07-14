const locations = { 
  1: 
  {
    id: 1, 
    name: 'Starcups',
    address: '125 High Street, Reading, RG6 1PS',
    reviewLead: 'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
    latLong: '51.455041,-0.9690884',
    rating: 3,
    facilities: ['Hot drinks', 'Cold Drinks', 'Premium wifi'], 
    distance: '100m', 
    openingHours: [
      'Monday - Friday : 7:00am - 7:00pm',
      'Saturday : 8:00am - 5:00pm',
      'Sunday : closed'
    ], 
    reviews: [
      { 
        rating: 3, 
        author: 'Simon Holmes', 
        date: '16 July 2013', 
        text: 'What a great place. I can\'t say enough good things about it.'
      }
    ]
  },

  2: 
  {
    id: 2, 
    name: 'Cafe Hero',
    address: '12 Main Street, Reading, RG6 1PS',
    rating: 4,
    facilities: ['Books', 'Food', 'Premium wifi'], 
    distance: '200m', 
    openingHours: []
  },

  3: 
  {
    id: 3,
    name: 'Burger Queen',
    address: '1875 Lord Tennis Blvd, Reading, RG6 1PS',
    rating: 2,
    facilities: ['Food', 'Premium wifi'], 
    distance: '500m', 
    openingHours: []
  }
}

const homeList = (req, res) => { 
  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      
      pageHeader: 
      {
        title: 'Loc8r',
        tagline: 'Find places to work with wifi near you!'
      }, 
      
      locations: Object.values(locations)
    }
  );
};

const locationInfo = (req, res) => { 
  if (req.query.id) { 
    console.log('path=' + req.path + '; query id=' + req.query.id);
    const location = locations[req.query.id];
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
