'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    }
});

module.exports = mongoose.model('User', User);