import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'products.get'() {
      var p = new Promise( (resolve, reject) => {
      moltin.Product.Search({}, function(products) {
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
