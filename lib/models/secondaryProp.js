'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Property Schema
 */
var secondaryPropSchema = new Schema({
  title: String,
  price: String,
  pic: String,
  // location: { lat: Number, lon: Number }
  location: { type: {type: String}, coordinates: Array }
});

/**
 * Validations
 */

mongoose.model('secondaryProp', secondaryPropSchema);
