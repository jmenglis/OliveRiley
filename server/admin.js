import { Meteor } from 'meteor/meteor';

var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
});

moltin.Authenticate(function() {
  Meteor.methods({
    'tax.create'(tax) {
      console.log(tax[0]);
      moltin.Tax.Create({
        title: tax[0],
        description: tax[1],
        rate: tax[2]
      }, function(tax) {
        console.log(tax);
      }, function(error) {
        console.log('There is an error: ' + error)
      });
    },
  });
});

// moltin.Authenticate(function() {
// moltin.Tax.List({limit: 10, offset: 0}, function(tax) {
//     console.log(tax);
// }, function(error) {
//     // Something went wrong...
// });
// });

// moltin.Tax.Get('1261650416177774600', function(tax) {
//     console.log(tax);
// }, function(error) {
//     // Something went wrong...
// });

// moltin.Tax.Delete('1261654381606993929', {},
// function(tax) {
//     console.log(tax);
// }, function(error) {
//     // Something went wrong...
// });


// moltin.Currency.Create({
//     code:        'USD',
//     title:       'United States Dollar',
//     enabled:     '1',
//     format:      'US\u0024{price}',
//     default:     '1'
// }, function(currency) {
//     console.log(currency);
// }, function(error) {
//     console.log(error);
// });
