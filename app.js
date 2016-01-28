var http = require('http');

var server = http.createServer(function(req, res) {

  res.end(JSON.stringify(getHeaders(req)));

});

function getHeaders(request) {

  //grabs the client IP address, first section of the language, and
  //the user agent from the request object
  var ipHeader = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
  var langHeader = request.headers['accept-language'];
  var softwareHeader = request.headers['user-agent']
    .substring(request.headers['user-agent'].indexOf('(') + 1,
    request.headers['user-agent'].indexOf(')'));

  var output = {
    ipaddress: ipHeader,
    language: langHeader,
    software: softwareHeader
  };
  return output;
}

var portNumber = process.env.PORT || 3000
server.listen(portNumber, function() {
  console.log("Listening on port " + portNumber.toString());
});
