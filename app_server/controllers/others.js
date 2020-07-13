const about = (req, res) => { 
  res.render('about', { 
    title: 'About', 
    pageHeader: { 
      title: 'About', 
      tagline: 'Loc8r was created to help people find places to sit down and get a bit of work done.'
    } 
  });
}

const test = (req, res) => { 
  res.render('test', { title: 'Test' });
}

module.exports = {
  about, 
  test
};
