const index = (req, res) => { 
  res.render('index', { 
		pageTitle: 'Hello, Express',
    pageHeader: 'Welcome to Express',
		appName: 'Express'
	});
};

module.exports = {
	index
};
