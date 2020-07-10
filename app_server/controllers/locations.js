const homeList = (req, res) => { 
  /* index is index.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', { title: 'Loc8r - Home' });
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
