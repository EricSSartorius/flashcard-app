var id=$("h1").prop("id");
$(document).ready(function(){
    $.get("/api/deck/"+id,function(deck){
        $("h1").text(deck.name)
        var cards = deck._cards;
        if(cards.length>0){
            var cardList = $("<ul></ul>");
            for(var i=0; i<cards.length; i++){
                cardList.append($("<li></li>").text(cards[i].sideA+" : "+cards[i].sideB));
            }
            $(".cards").append(cardList);
        }else{
            $(".cards").append($("<p></p>").text("There are no cards in this deck"));
        }
    });
});