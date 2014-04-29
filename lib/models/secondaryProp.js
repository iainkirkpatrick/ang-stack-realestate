'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Property Schema
 */
var secondaryPropSchema = new Schema({
  title: String,
  price: String,
  region: String,
  location: { lat: Number, lon: Number }
});

/**
 * Validations
 */

mongoose.model('secondaryProp', secondaryPropSchema);
