var express = require('express');
var mongoose = require('mongoose');

var server = express();

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/tvshows');

// configure our server with all the middleware and routing
// require('./config/middleware.js')(server, express);
// require('./config/routes.js')(server, express);

// start listening to requests on port 8000
server.listen(8000);

// export our server for testing and flexibility, required by index.js
module.exports = server;