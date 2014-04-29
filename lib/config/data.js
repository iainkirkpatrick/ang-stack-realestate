/*jshint loopfunc: true */
'use strict';

var mongoose = require('mongoose'),
    request = require('request'),
    _ = require('lodash'),
  Prop = mongoose.model('Prop'),
  secondaryProp = mongoose.model('secondaryProp');
 
/**
 * Populate database with TM Sandbox data
 */
//data.js is just for database population logic - 'getting' of db items is handled by routes + api

//not the fastest / elegant way to do this, but will work for now
//ideally would have a single model definition (property.js), and access core mongo functions to specifically update seperate collections
//model.collection gives access to mongodb native driver (http://stackoverflow.com/questions/10519432/how-to-do-raw-mongodb-operations-in-mongoose)
//and also use collection.copyTo(other_collection)

//setTimeout to run the population + copying function every x miilseconds
//named functions are so that they can be called recursively
//may eventually need to pass in additional period for time between api page requests, if more pages than API hits allowed per hour (and thus run the updater once per several hours)
module.exports = function updater(db, updatePeriod) {
  var page = 1, pagesize = 25;
  setTimeout(function() {
    secondaryProp.find({}).remove(function requestTM() {
      //pagesize determines whether this request is the last page in the dataset
      if (pagesize === 25) {
        request('http://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?page=' + page, function (error, response, body) {
          console.log("calling TM api, page " + page);
          if (!error && response.statusCode === 200) {
            //iterate over parsed body for properties
            _.forEach(JSON.parse(body).List, function(listing) {
              secondaryProp.create({
                title: listing.Title,
                price: listing.PriceDisplay,
                region: listing.Region,
                location: { lat: listing.GeographicLocation.Latitude, lon: listing.GeographicLocation.Longitude }
              });
            });
            pagesize = JSON.parse(body).PageSize;
            page++;
            //call the func again recursive-like yaa
            //with a delay for testing
            setTimeout(requestTM, 500);
          } else {
            //request error handling
            //after the log, code runs out to the updater, which is called again after updatePeriod
            console.log("error with api request");
          }
        });  
      } else {
        //execute db copy
        //looks like there is no nice mongoose method for copying, argh
        //dump all main collection props, populate again with all secondary collection props
        Prop.find({}).remove(function() {
          secondaryProp.find({}, function(err, docs) {
            docs.forEach(function(doc) {
              Prop.create(doc);
            });
            console.log("main collection updated");
          });
        });
      }
    });
    //run updater again recursively
    updater(db, updatePeriod);
  },updatePeriod);
};