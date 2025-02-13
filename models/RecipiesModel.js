var mongoose = require('mongoose')

var RecipiesScheme = new mongoose.Schema({
    preparationTime: Number,
    instructions: Array,
    ingredients: Array,
    name: String,
    image: String
}, {
    collection: 'recepies'
})

module.exports = mongoose.model('RecipiesModel', RecipiesScheme)