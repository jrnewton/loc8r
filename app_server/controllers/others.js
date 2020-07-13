const about = (req, res) => { 
  res.render('about', { title: 'About' });
}

const test = (req, res) => { 
  res.render('test', { title: 'Test' });
}

module.exports = {
  about, 
  test
};
