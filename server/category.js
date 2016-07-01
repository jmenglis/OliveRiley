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
        resolve(category)
      })
    })
    p.then((res) => {
      var p2 = new Promise( (resolve, reject) => {
        moltin.Product.Search({category: res[0].id }, function(product) {
          resolve(product)
        })
      })
      p2.then((res2) => {
        console.log(res2)
        return res2
      })
      return p2;
    })
    return p;
    }
  })
})
