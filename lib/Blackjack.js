let Card = require('./Card');
let Deck = require('./Deck');

function Blackjack (player, dealer){
  this.player = player;
  this.dealer = dealer;
  this.deck = new Deck;
  this.playerCards = [];
  this.dealerCards = [];
}
module.exports = Blackjack;

Blackjack.prototype.dealerLimit = function(){
  let dealerCardsValue=0;
  let leftOff; //using so I know where to start in Dealer Cards after the initial value is calculated.
  for (i=0; i<this.dealerCards.length; i++){
    if (this.dealerCards[i].value == 'Ace'){
      dealerCardsValue++;
    } else if (this.dealerCards[i].value >=2 && this.dealerCards[i].value <= 10){
      dealerCardsValue += this.dealerCards[i].value;
    } else {
      dealerCardsValue += 10;
    }
    leftOff = i;
  }
  if (dealerCardsValue < 17){
    for (j=0; j<this.deck.cards.length; j++){
      if (dealerCardsValue <17){
        this.dealerDealt();
        for (k=leftOff+1; k<this.dealerCards.length; k++){
          if (this.dealerCards[i].value == 'Ace'){
            dealerCardsValue++;
          } else if (this.dealerCards[i].value >=2 && this.dealerCards[i].value <= 10){
            dealerCardsValue += this.dealerCards[i].value;
          } else {
            dealerCardsValue += 10;
          }
        }
      }
    }
  }
  return dealerCardsValue;
}
Blackjack.prototype.playerDealt = function(){
  this.playerCards.push(this.deck.deal());
}
Blackjack.prototype.dealerDealt = function(){
  this.dealerCards.push(this.deck.deal());
}
Blackjack.prototype.startGame = function(){
  for (i=0; i<2; i++){
    this.playerDealt();
    this.dealerDealt();
  }
}
