import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'product.get'() {
      var p = new Promise( (resolve, reject) => {
      moltin.Product.Search({category: "Strollers"}, function(products) {
        resolve(products)
      })
    })
    p.then((res) => {
      return res;
    })
    return p;
    }
  })
})
