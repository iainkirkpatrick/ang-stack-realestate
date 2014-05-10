'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Prop = mongoose.model('Prop');

/**
 * Get awesome things
 */
//// this func can access Thing because routes.js (which uses api.js) is required after the data has been modeled and DB populated
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

//trying things out, from http://tylerhenkel.com/creating-apps-with-angular-and-node-using-yeoman/
exports.message = function(req, res) {
  res.send('Hello World');
};

//testing TM sandbox data
//can access props because db is populated earlier in server.js, and methods are not exported to be required
exports.propData = function(req, res) {
	//at the moment, this just returns all Props
	return Prop.find(function (err, properties) {
    if (!err) {
      console.log(properties.length + ' total properties');
      return res.json(properties);
    } else {
      return res.send(err);
    }
  });
};

exports.propsBoundingBox = function(req, res) {
  var box = [[parseFloat(req.query.southwestLng), parseFloat(req.query.southwestLat)],[parseFloat(req.query.northeastLng), parseFloat(req.query.northeastLat)]];
  return Prop.find().where("location")
    .within({ box: box }) //bounds is an array of lon/lat arrays, i.e. [[lon,lat],[lon,lat]]
    .exec(function (err, properties) {
      if (!err) {
      console.log(properties.length + ' total properties in view');
      return res.json(properties);
    } else {
      console.log("error");
      return res.send(err);
    }
    });
};