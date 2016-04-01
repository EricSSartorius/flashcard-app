$(document).ready(function(){
    $.get("/api/decks",function(decks){
        if(decks.length>0){
            var deckList = $("<ul></ul>");
            for(var i=0; i<decks.length; i++){
                deckList.append($("<li>"+decks[i].name+"</li>"));
            }
            $(".decks").append(deckList);
        }else{
            $(".decks").append($("<p></p>").text("You don't have any decks"));
        }
    });
});