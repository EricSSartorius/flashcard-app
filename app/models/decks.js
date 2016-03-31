'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deck = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _borrowers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    _cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    name: String,
    description: String,
    tags: [String],
    price: Number,
    image: String
});

module.exports = mongoose.model('Deck', Deck);