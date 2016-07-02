import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'cart.get'() {
        moltin.Cart.Contents(function(items) {
          console.log(items);
        })
    }
  })
})
