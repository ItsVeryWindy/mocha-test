module.exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports.test = function(req, res) {
  res.render('hello');
};
