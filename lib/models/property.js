'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Property Schema
 */
var PropSchema = new Schema({
  title: String,
  price: String,
  pic: String,
  // location: { lat: Number, lon: Number }
  location: { type: {type: String}, coordinates: Array }
});

/**
 * Validations
 */

mongoose.model('Prop', PropSchema);
