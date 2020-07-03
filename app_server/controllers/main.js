const index = (req, res) => { 
	/* index is index.hbs which is rendered inside of layout.hbs */
  res.render('index', { 
		pageTitle: 'Hello, Express',
    pageHeader: 'Welcome to Express',
		appName: 'Express'
	});
};

module.exports = {
	index
};
