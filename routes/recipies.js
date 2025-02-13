var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var RecipiesModel = require('../models/RecipiesModel.js')

// Using router.get to fetch the values from the kitchen_archive database
router.get('/', function(req, res, next) {
    RecipiesModel.find()
    .then(function(allRecipies) {
        res.json(allRecipies)
    })
});

module.exports = router;