let Card = require('./Card');
let Deck = require('./Deck');
let tenCards = [10, 'Jack', 'Queen', 'King'];

function Blackjack (player, dealer){
  this.player = player;
  this.dealer = dealer;
  this.deck = new Deck;
  this.playerCards = [];
  this.dealerCards = [];
}
module.exports = Blackjack;

function getRandom (min, max){
  return Math.floor(Math.random()*(max-min))+min;
}

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
        //this.dealerDealt();
        this.dealerCards.push(this.deck.deal());
        for (k=leftOff+1; k<this.dealerCards.length; k++){
          if (this.dealerCards[k].value == 'Ace'){
            dealerCardsValue++;
          } else if (this.dealerCards[k].value >=2 && this.dealerCards[i].value <= 10){
            dealerCardsValue += this.dealerCards[k].value;
          } else {
            dealerCardsValue += 10;
          }
        }
      }
    }
  }
  return dealerCardsValue;
}
Blackjack.prototype.playerLimit = function(){
  let playerLimit;
  let playerCardsValue = 0;
  let leftOff = 0;
  console.log(['Ace'].includes(this.playerCards));
  if ((this.playerCards[0].value === 'Ace') || (this.playerCards[1].value === 'Ace')){
    if ((tenCards.includes(this.playerCards[0].value)) || (tenCards.includes(this.playerCards[1].value))){
      playerCardsValue = 21;
    }
  }
  //console.log(Object.keys(Object.entries(this.playerCards)));
  //console.log(Object.values(Object.entries(this.playerCards)));
  /*if ('Ace'].includes(this.playerCards.value)){

  } else */if ([7, 8, 9, 10, 'Ace', 'Jack', 'Queen', 'King'].includes(this.dealerCards[1].value)){
    playerLimit = 17;
  } else if ([4, 5 , 6].includes(this.dealerCards[1].value)){
    playerLimit = 12;
  } else {
    playerLimit = 13;
  };
  while(playerCardsValue < playerLimit){
    for (i=0; i<this.playerCards.length; i++){
      if (this.playerCards[i].value == 'Ace'){
        playerCardsValue++
      } else if (this.playerCards[i].value >= 2 && this.playerCards[i].value <= 10){
        playerCardsValue += this.playerCards[i].value;
      } else {
        playerCardsValue += 10;
      }
      console.log(i+" "+this.playerCards[i].value+" "+playerCardsValue);
    }
    if(playerCardsValue < playerLimit){
      playerCardsValue = 0;
      this.playerCards.push(this.deck.deal());
    }
  }
  console.log("dealer up face card: ",this.dealerCards[1]);
  //console.log(this.dealerCards[1].value);
  console.log(playerLimit);
  console.log("player's cards: ", this.playerCards);
  console.log("playerCardsValue: ",playerCardsValue);
  return (playerCardsValue >= playerLimit)
}
Blackjack.prototype.playerDealt = function(){
  this.playerCards.push(this.deck.deal());
}
Blackjack.prototype.dealerDealt = function(){
  this.dealerCards.push(this.deck.deal());
}
Blackjack.prototype.startGame = function(){
  //shuffle cards 7 times for optimial randomization. Source: https://www.math.hmc.edu/funfacts/ffiles/20002.4-6.shtml
  this.timesShuffled = 0;
  for (i=0; i<7; i++){
    this.deck.cards.sort(function(a,b){return 0.5 - Math.random()});
    this.timesShuffled++
  }
  //player cut the cards
  let originalTopCard = this.deck.cards[0];
  let playersCut = this.deck.cards.splice(0,getRandom(1,this.deck.cards.length))
  //console.log("player's cut:",playersCut.length);
  //console.log("deck after cut:",this.deck.cards.length);
  this.deck.cards.push.apply(this.deck.cards, playersCut);
  //console.log("deck after cards are replaced:",this.deck.cards.length);
  let afterCutTopCard = this.deck.cards[0];
  //console.log("top card: before and after cut",(originalTopCard==afterCutTopCard));

  //console.log(this.deck.cards[0]);
  //console.log(this.timesShuffled);
  for (i=0; i<2; i++){
    this.playerDealt();
    this.dealerCards.push(this.deck.deal());
  }
  //console.log(this.dealerCards);
  //console.log(this.dealerCards[1]);
  return originalTopCard == afterCutTopCard;
}
