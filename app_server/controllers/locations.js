const homeList = (req, res) => { 
  /* index is index.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', { title: 'Home' });
};

const locationInfo = (req, res) => { 
  res.render('location-info', { title: 'Location Info' });
}

const addReview = (req, res) => { 
  res.render('location-review', { title: 'Add Review' });
}

module.exports = {
  homeList,
  locationInfo,
  addReview
};
