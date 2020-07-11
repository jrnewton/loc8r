


const homeList = (req, res) => { 
  /* index is index.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        tagline: 'Find places to work with wifi near you!'
      }, 
      locations: [
        {
          name: 'Starcups',
          address: '125 High Street, Reading, RG6 1PS',
          rating: 3,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'], 
          distance: '100m'
        },
        {
          name: 'Cafe Hero',
          address: '125 High Street, Reading, RG6 1PS',
          rating: 4,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'], 
          distance: '200m'
        },
        {
          name: 'Burger Queen',
          address: '125 High Street, Reading, RG6 1PS',
          rating: 2,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'], 
          distance: '500m'
        },
      ]
    }
  );
};

const locationInfo = (req, res) => { 
  res.render('location-info', { title: 'Loc8r - Location Info' });
}

const addReview = (req, res) => { 
  res.render('location-review', { title: 'Loc8r - Add Review' });
}

module.exports = {
  homeList,
  locationInfo,
  addReview
};
