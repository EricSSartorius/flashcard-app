'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Card = new Schema({
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    },
    sideA: String,
    sideB: String,
    totalCorrect: Number,
    totalWrong: Number,
    totalStarred: Number
});

module.exports = mongoose.model('Card', Card);