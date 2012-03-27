var express = require('express');
config = require('./config');
console.log(config);
var Foursquare = require('node-foursquare')(config);

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('hey hey!');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

Foursquare.Users.getUser("33", accessToken, function (error, data) {
  var test = "Foursquare.Users.getUser(33)";
  if(error) {
    reportError(test, error.message);
  }
  else {
    try {
      logger.trace(sys.inspect(data));
      assert.ok(data.user);
      assert.equal(data.user.id, "33");
      assert.equal(data.user.firstName, "naveen");
      ok(test);
    } catch (error) {
      reportError(test, error);
    }
  }
	response.send(test);
});