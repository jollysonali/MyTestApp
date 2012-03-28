/*
 * GET home page.
 */
var config = require('../config');

var Foursquare = require('node-foursquare')(config);
var aToken;

exports.index = function(req, res) {
	res.render('index.jade', { title: 'JADDDE' });
};

exports.login = function(req, res) {
  console.log(Foursquare.getAuthClientRedirectUrl());
	res.writeHead(303, { "location": Foursquare.getAuthClientRedirectUrl() });
  res.end();
};

exports.callback = function (req, res) {
  Foursquare.getAccessToken({
    code: req.query.code
  }, function (error, accessToken) {
    if(error) {
      res.send("An error was thrown: " + error.message);
    }
    else {
      // Save the accessToken and redirect.
			aToken = accessToken;
			res.redirect('/sonalisBadges');
    }
  });
};

exports.sonalisBadges = function (req, res) {
  Foursquare.Users.getBadges(null, aToken, function (error, data) {
    if(error) {
      //reportError(test, error.message);
    }
    else {
			var output ='';
			var b;
			var img = '';
			for (badge in data.badges){
				b = '';
				img = '';
				b = data.badges[badge];
				img += b.image.prefix + b.image.sizes[0] + b.image.name;
				output += b.name + '<br />';
				output += '<img src="' + img + '" /> <br />';
			}
			//res.render('badges.jade', { title: 'Badges', badges: output });
			res.writeHead(200, {
				'Content-Type': 'text/html'
			})
			res.write(output);
      res.end();
    }
  });
};

