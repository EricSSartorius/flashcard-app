'use strict';

var Users = require("../models/users.js");
var Decks = require("../models/decks.js");
var Cards = require("../models/cards.js");
var Progress = require("../models/progress.js");

var mongoose = require('mongoose');

function DataHandler(){
    this.createDeck = function(req,res){
        var newId = mongoose.Types.ObjectId();
        var newDeck = new Decks({
            _id: newId,
            name: req.body.name,
            description: req.body.desc,
            price: 0,
            tags: [],
            image: "",
            _cards: []
        });
        Users.findOneAndUpdate({'_id':req.user._id},
                                {$push: {decksOwned: newDeck._id}},{new:true})
            .populate('decksOwned')
            .exec(function(err,user){
                if(err) throw err;
                newDeck._owner = user._id;
                newDeck._borrowers = [user._id];
                newDeck.save(function(err,deck){
                    if(err) throw err;
                    res.redirect("/view/decks");
                });
            });
    };
    
    this.getDecks = function(req,res){
        Users.findOne({'_id':req.user._id})
            .populate('decksOwned')
            .exec(function(err,user){
                if(err) throw err;
                res.json(user.decksOwned);
            });
    };
    
    this.createCard = function(req,res){
        var newId = mongoose.Types.ObjectId();
        var newCard = new Cards({
            _id: newId,
            _deck: req.body.deckId,
            sideA: req.body.sideA,
            sideB: req.body.sideB,
            totalCorrect: 0,
            totalWrong: 0,
            totalStarred: 0
        });
        Decks.findOneAndUpdate({'_id':req.body.deckId},
                                {$push:{_cards:newId}},{new:true})
            .populate('_cards')
            .exec(function(err,deck){
                if(err) throw err;
                newCard.save(function(err,card){
                    if(err) throw err;
                    var cards = deck._cards;
                    cards.push(card);
                    res.render('cards',{deckName: deck.name, cards:cards});
                });
            });
    };
    
    this.getDeck = function(req,res){
        Decks.findOne({'_id':req.params.deckId})
            .populate('_cards')
            .exec(function(err,deck){
                if(err) throw err;
                res.json(deck);
            });
    };
    
    this.renderNewCard = function(req,res){
        Users.findOne({'_id':req.user._id})
            .populate('decksOwned')
            .exec(function(err,user){
                if(err) throw err;
                var decks = user.decksOwned;
                res.render('new',{type:'card',decks:decks});
            });
    };
}

module.exports = DataHandler;