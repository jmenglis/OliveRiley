import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'product.get'(productSlug) {
      var p = new Promise( (resolve, reject) => {
      moltin.Product.Search({slug: productSlug }, function(product) {
        resolve(product)
      })
    })
    p.then((res) => {
      return res;
    })
    return p;
    }
  })
})
