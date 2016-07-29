import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'cart.get'() {
      var p = new Promise((resolve,reject) => {
        moltin.Cart.Contents(function(items) {
          resolve(items)
        })
      })
      p.then((items) => {
        return items
      })
      return p
    }
  })
})
