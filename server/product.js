import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'product.get'(productSlug) {
      let p = new Promise( (resolve, reject) => {
        moltin.Product.Search({slug: productSlug }, function(product) {
          resolve(product)
        })
      })
      p.then((res) => {
        return res;
      })
      return p;
    },
    'product.insertcart'(productId) {
      let p = new Promise( (resolve, reject) => {
        moltin.Cart.Insert(productId, '1', null, function(cart) {
          console.log(cart);
        })
      })
    }
  })
})
