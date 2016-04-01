$(document).ready(function(){
    $.get("/api/decks",function(decks){
        if(decks.length>0){
            var deckList = $("<ul></ul>");
            for(var i=0; i<decks.length; i++){
                var cardLink = $("<a href='/view/cards/"+decks[i]._id+"'></a>")
                    .text(decks[i].name);
                deckList.append($("<li></li>").append(cardLink));
            }
            $(".decks").append(deckList);
        }else{
            $(".decks").append($("<p></p>").text("You don't have any decks"));
        }
    });
});