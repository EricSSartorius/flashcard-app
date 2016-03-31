'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Progress = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    },
    stats: [{
        _card: {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        },
        correct: Number,
        wrong: Number,
        starred: Boolean
    }],
    completed: [{
        _card: {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }
    }],
    review: [{
        _card: {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }
    }]
});

module.exports = mongoose.model('Progress', Progress);