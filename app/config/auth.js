'use strict';

module.exports = {
    'facebookAuth': {
        'clientID': process.env.FACEBOOK_KEY,
        'clientSecret': process.env.FACEBOOK_SECRET,
        'callbackUrl': process.env.APP_URL + 'auth/facebook/callback'
    },
    'twitterAuth': {
        'consumerKey': process.env.TWITTER_KEY,
        'consumerSecret': process.env.TWITTER_SECRET,
        'callbackUrl': process.env.APP_URL + 'auth/twitter/callback'
    },
    'googleAuth': {
        'clientID': process.env.GOOGLE_KEY,
        'clientSecret': process.env.GOOGLE_SECRET,
        'callbackUrl': process.env.APP_URL + 'auth/google/callback'
    }
};