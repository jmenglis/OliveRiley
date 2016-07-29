import { Meteor } from 'meteor/meteor'


var moltin = require('moltin')({
  publicId: Meteor.settings.moltin.publicId,
  secretKey: Meteor.settings.moltin.secretKey
})

moltin.Authenticate(function() {
  Meteor.methods({
    'category.get'(categorySlug) {
      var p = new Promise( (resolve, reject) => {
      moltin.Category.List({slug: categorySlug }, function(category) {
        moltin.Product.Search({category: category[0].id }, function(product) {
          resolve(product)
        })
      })
    })
    p.then((res) => {
      return res;
    })
    return p;
    }
  })
})
