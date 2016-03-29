'use strict';

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../models/users.js");
var configAuth = require("./auth.js");

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
    
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackUrl,
        passRequestToCallback: true,
        profileFields: ['id', 'emails', 'name']
    },
    function(req, token, refreshToken, profile, done){
        process.nextTick(function(){
            if(!req.user){
                User.findOne({'facebook.id': profile.id},function(err,user){
                    if(err)
                        return done(err);
                    if(user){
                        return done(null,user);
                    }else{
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName+' '+profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        
                        newUser.save(function(err){
                            if(err) throw err;
                            return done(null,newUser);
                        });
                    }
                });
            }else{
                var user = req.user;
                
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName+' '+profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
                
                user.save(function(err){
                    if(err) throw err;
                    return done(null,user);
                });
            }
        });
    }
    ));
    
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackUrl,
        passRequestToCallback: true
    },
    function(req, token, refreshToken, profile, done){
        if(!req.user){
            User.findOne({'twitter.id': profile.id},function(err,user){
                if(err)
                    return done(err);
                if(user){
                    return done(null,user);
                }else{
                    var newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.username = profile.username;
                    
                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null,newUser);
                    });
                }
            });
        }else{
            var user = req.user;
            
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.displayName = profile.displayName;
            user.facebook.username = profile.username;
            
            user.save(function(err){
                if(err) throw err;
                return done(null,user);
            });
        }
    }
    ));
    
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackUrl,
        passRequestToCallback: true
    },
    function(req, token, refreshToken, profile, done){
        process.nextTick(function(){
            if(!req.user){
                User.findOne({'google.id': profile.id},function(err,user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        return done(null,user);
                    }else{
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.displayName = profile.displayName;
                        newUser.google.email = profile.emails[0].value;
                        
                        newUser.save(function(err){
                            if(err) throw err;
                            return done(null,newUser);
                        });
                    }
                });
            }else{
                var user = req.user;
                
                user.google.id = profile.id;
                user.google.token = token;
                user.google.displayName = profile.displayName;
                user.google.email = profile.emails[0].value;
                
                user.save(function(err){
                    if(err) throw err;
                    return done(null,user);
                });
            }
        });
    }
    ));
};