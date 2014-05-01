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
  location: { lat: Number, lon: Number }
});

/**
 * Validations
 */

mongoose.model('Prop', PropSchema);
