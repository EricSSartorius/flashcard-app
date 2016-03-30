"use strict";

var path = process.cwd();

module.exports = function(app, passport){
    
    app.route("/").get(function(req,res){
        res.sendFile(path+"/client/index.html");
    });
    
    app.route("/profile")
        .get(isLoggedIn, function(req,res){
            res.render('profile',{user:req.user});
        });
   
    app.route("/error")
        .get(function(req, res) {
            res.sendFile(path+"/client/error.html");
        });
   
    //AUTHENTICATION
    app.route("/auth/local")
        .post(passport.authenticate('local-login',{
            successRedirect: "/profile",
            failureRedirect: "/error"
        }));
    app.route("/auth/create")
        .post(passport.authenticate('local-signup',{
            successRedirect: "/profile",
            failureRedirect: "/error"
        }));
    
    app.route("/auth/facebook")
        .get(passport.authenticate('facebook',{scope: 'email'}));
    app.route("/auth/facebook/callback")
        .get(passport.authenticate('facebook',{
            successRedirect: "/profile",
            failureRedirect: "/"
        }));
    
    app.route("/auth/twitter")
        .get(passport.authenticate('twitter',{scope:'email'}));
    app.route("/auth/twitter/callback")
        .get(passport.authenticate('twitter',{
            successRedirect: "/profile",
            failureRedirect: "/"
        }));
        
    app.route("/auth/google")
        .get(passport.authenticate('google',{scope:['profile','email']}));
    app.route("/auth/google/callback")
        .get(passport.authenticate('google',{
            successRedirect: "/profile",
            failureRedirect: "/"
        }));
    
    //AUTHORIZE
    app.route("/connect/facebook")
        .get(passport.authorize('facebook',{scope:'email'}));
        
    app.route("/connect/twitter")
        .get(passport.authorize('twitter',{scope:'email'}));
        
    app.route("/connect/google")
        .get(passport.authorize('google',{scope:['profile','email']}));
        
    app.route("/logout")
        .get(function(req, res) {
            req.logout();
            res.redirect("/");
        });
        
    //UNLINK
    app.route("/unlink/local")
        .get(function(req, res) {
            var user = req.user;
            user.local.email = undefined;
            user.local.password = undefined;
            user.save(function(err){
                if(err) throw err;
                res.redirect("/profile");
            });
        });
        
    app.route("/unlink/facebook")
        .get(function(req, res) {
            var user = req.user;
            user.facebook.token = undefined;
            user.save(function(err){
                if(err) throw err;
                res.redirect("/profile");
            });
        });
        
    app.route("/unlink/twitter")
        .get(function(req, res) {
            var user = req.user;
            user.twitter.token = undefined;
            user.save(function(err){
                if(err) throw err;
                res.redirect("/profile");
            });
        });
        
    app.route("/unlink/google")
        .get(function(req, res) {
            var user = req.user;
            user.google.token = undefined;
            user.save(function(err){
                if(err) throw err;
                res.redirect("/profile");
            });
        });
        
    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/");
    }
};