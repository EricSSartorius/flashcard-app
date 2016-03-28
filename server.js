"use strict";

var express = require('express');
var app = express();
require('dotenv').load();

var routes = require("./app/routes/index.js");
// var mongoose = require('mongoose');
// var passport = require('passport');
// var session = require('express-session');
// var parser = require('body-parser');

var http = require('http').Server(app);

// require("./app/config/passport.js")(passport);

// var mongooseUrl = process.environment.MLAB_URI;
// mongoose.connect(mongooseUrl);

app.use("/client", express.static(process.cwd()+"/client"));
// app.use("/controllers", express.static(process.cwd()+"/app/controllers"));
// app.use("/common", express.static(process.cwd()+"/app/common"));
// app.use("/views", express.static(process.cwd()+"/app/views"));

// app.use(parser.json());
// app.use(parser.urlencoded({extended:true}));

// app.set('views',process.cwd()+'/app/views');
// app.set('view engine','jade');

// app.use(session({
    // secret: 'shhhhhh',
    // resave: false,
    // saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

routes(app);
// routes(app,passport);

// app.use(function(req,res,next){
    // res.status(404);
    // res.render('error,{}');
// });

var port = process.env.PORT || 8080;
http.listen(port,function(){
    console.log("Listening on port "+port);
});