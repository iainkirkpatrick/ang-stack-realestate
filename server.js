'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Set default node environment to development
//// This sets the string, and the config require below requires the particular .js file according to the string
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
//// connect to db with path, options specified in applicable env .js files that are merged by config.js
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
//// just iterating over models folder, requiring all the .js models in there
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate DB with sample data
//// pretty sure because the models have been loaded in previous step, the dummy data accesses them when defining mongoose models in first steps.
// require('./lib/config/dummydata');
  
// Passport Configuration
var passport = require('./lib/config/passport');

var app = express();

//populate db with TM sandbox data
//and update db collections every x milliseconds
require('./lib/config/data')(db, 3600000);

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;