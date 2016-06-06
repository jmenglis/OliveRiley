import { Meteor } from 'meteor/meteor';

var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
});

moltin.Authenticate(function() {
  Meteor.methods({
    'product.get'() {
    moltin.Product.Search({category: "Strollers"}, function(products) {
      // products.forEach(function(item,index) {
      //   return item.title;
      //   // console.log(item.title)
      //   // console.log(item.images[0].url["http"]);
      //   })
      return products[0];
      }, function(error) {
        console.log(error)
      })
    }
  });
});
