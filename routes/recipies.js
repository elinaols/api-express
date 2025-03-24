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

// Creates a new recepie and saves it to the database
router.post('/', function(req, res, next) {
    //req.body är innehållet i requestobjektet, dvs en json med en bil
    RecipiesModel.create(req.body).then(function(post) {
        res.json(post); //Här skickar vi tillbaka datan vi skickar in i databasen, om skrivningen gick bra
    }); 
});

router.delete('/:id', function(req, res, next) {
    RecipiesModel.findByIdAndDelete(req.params.id, req.body).then(function(post) {
    res.json(post);
    });
});
// https://www.youtube.com/watch?v=_7UQPve99r4 - inspiration
// https://stackoverflow.com/questions/40330916/updating-a-record-with-mongoose - recommends CarModel.findByIdAndUpdate({"_id": req.params.id}, req.body)
// don´t now if it works
/*
router.put('/:id', function(req, res, next){
    const {id} = req.params;
    RecipiesModel.findByIdAndUpdate(id, req.body)
    .then(function(post){
        res.json(post)
    })
    .catch(function(error) {
        console.log(error)
        next(error)
    })
})
*/
module.exports = router;