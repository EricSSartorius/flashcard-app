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
                    res.json({success:deck});
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
    
    this.deleteDeck = function(req,res){
        var deckId = req.params.deckId;
        Decks.findOne({_id: deckId})
            .remove()
            .exec(function(err){
                if(err){
                    res.json({error: "Deck delete error: "+err});
                }else{
                    Users.findOneAndUpdate({_id:req.user._id},{$pull:{decksOwned:deckId}})
                        .exec(function(err,user){
                            if(err){
                                res.json({error: "User update error: "+err});
                            }else{
                                res.json({result: 'success'});
                            }
                        });
                }
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
                    res.json({success: card});
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
    
    this.deleteCard = function(req,res){
        var cardId = req.params.cardId;
        Cards.findOne({_id:cardId})
            .exec(function(err,card){
                if(err) throw err;
                Decks.findOneAndUpdate({_id:card._deck},{$pull:{_cards:cardId}})
                .exec(function(err, deck){
                    if(err){
                        res.json({error: "Delete card error: "+err});
                    }else{
                        Cards.findOne({_id:cardId})
                            .remove()
                            .exec(function(err){
                                if(err){
                                    res.json({error:"Card delete error: "+err});
                                }else{
                                    res.json({status:"Success"});
                                }
                            });
                    }
                });
            });
    };
    
    this.renderNewCard = function(req,res){     //Function is only for testing
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