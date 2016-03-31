'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
    local: {
        email: String,
        password: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        displayName: String
    },
    twitter: {
        id: String,
        displayName: String,
        token: String,
        username: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    stats: {
        decksCompleted: Number,
        totalCorrect: Number,
        totalWrong: Number,
        totalStarred: Number
    },
    options: {
        shuffle: Boolean
    },
    decksOwned: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }],
    decksBorrowed: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }]
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);