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
