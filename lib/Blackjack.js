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
Blackjack.prototype.gameOver = function(playerTotal, dealerTotal){
  if ((playerTotal > 21) && (dealerTotal <= 21)){
    return 'Dealer wins';
  } else if ((playerTotal <= 21) && (dealerTotal > 21)){
    return 'Player wins';
  } else if((playerTotal < 21) && (dealerTotal < 21)){
    if((Math.floor(21-playerTotal)) > (Math.floor(21-dealerTotal))){
      return "Dealer wins"
    } else if((Math.floor(21-playerTotal)) < (Math.floor(21-dealerTotal))){
      return "Player wins"
    } else {
      return 'Draw';
    }
  }
  else {
    return 'Draw';
  }
}
Blackjack.prototype.splittingPairs = function(cardOneValue, cardTwoValue){
  if (cardOneValue === cardTwoValue){
    return "Cards can be split"
  }
}
Blackjack.prototype.doubleDownResult = function(){
  if ([9, 10, 11].includes(this.playerFirstTwoCardsTotal)){
    return 'double down';
  }
}
Blackjack.prototype.doubleDown = function(){
  this.playerFirstTwoCardsTotal = 0;
  for (i=0; i<2; i++){
    if (tenCards.includes(this.playerCards[i].value)){
      this.playerFirstTwoCardsTotal += 10;
    } else if (this.playerCards[i].value == 'Ace'){
      this.playerFirstTwoCardsTotal += 1;
    } else {
      this.playerFirstTwoCardsTotal += this.playerCards[i].value;
    }
  }
  console.log(this.playerCards);
  console.log("first 2 cards total:", this.playerFirstTwoCardsTotal);
}
Blackjack.prototype.handResult = function(totalCardsValue){
  if (totalCardsValue > 21){
    return 'bust';
  } else if (totalCardsValue == 21){
    return "blackjack";
  } else {
    return totalCardsValue;
  }
}
Blackjack.prototype.dealerLimit = function(){
  this.dealerCardsValue = 0;
  if ((this.dealerCards[0].value === 'Ace') || (this.dealerCards[1].value === 'Ace')){
    if ((tenCards.includes(this.dealerCards[0].value)) || (tenCards.includes(this.dealerCards[1].value))){
      this.dealerCardsValue = 21;
    }
  }
  while(this.dealerCardsValue < 17){
    for (i=0; i<this.dealerCards.length; i++){
      if (this.dealerCards[i].value == 'Ace'){
        this.dealerCardsValue++
      } else if (this.dealerCards[i].value >= 2 && this.dealerCards[i].value <= 10){
        this.dealerCardsValue += this.dealerCards[i].value;
      } else {
        this.dealerCardsValue += 10;
      }
      //console.log(i+" "+this.dealerCards[i].value+" "+dealerCardsValue);
    }
    if(this.dealerCardsValue < 17){
      this.dealerCardsValue = 0;
      this.dealerCards.push(this.deck.deal());
    }
  }
  //console.log("dealer's cards: ", this.dealerCards);
  return this.dealerCardsValue;
}
Blackjack.prototype.playerLimit = function(){
  let playerLimit;
  this.playerCardsValue = 0;
  let leftOff = 0;
  if ([7, 8, 9, 10, 'Ace', 'Jack', 'Queen', 'King'].includes(this.dealerCards[0].value)){
    playerLimit = 17;
  } else if ([4, 5 , 6].includes(this.dealerCards[0].value)){
    playerLimit = 12;
  } else {
    playerLimit = 13;
  };
  if ((this.playerCards[0].value === 'Ace') || (this.playerCards[1].value === 'Ace')){
    if ((tenCards.includes(this.playerCards[0].value)) || (tenCards.includes(this.playerCards[1].value))){
      this.playerCardsValue = 21;
    } else {
      playerLimit = 18;
    }
  }
  while(this.playerCardsValue < playerLimit){
    for (i=0; i<this.playerCards.length; i++){
      if (this.playerCards[i].value == 'Ace'){
        this.playerCardsValue++
      } else if (this.playerCards[i].value >= 2 && this.playerCards[i].value <= 10){
        this.playerCardsValue += this.playerCards[i].value;
      } else {
        this.playerCardsValue += 10;
      }
      //console.log(i+" "+this.playerCards[i].value+" "+playerCardsValue);
    }
    if(this.playerCardsValue < playerLimit){
      this.playerCardsValue = 0;
      this.playerCards.push(this.deck.deal());
    }
  }
  //console.log("dealer up face card: ",this.dealerCards[1]);
  //console.log("playerLimit: ",playerLimit);
  //console.log("player's cards: ", this.playerCards);
  //console.log("playerCardsValue: ",playerCardsValue);
  return (this.playerCardsValue >= playerLimit);
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
  //player cuts the cards
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
  this.splittingPairs(this.playerCards[0].value, this.playerCards[1].value);
  //console.log(this.dealerCards);
  //console.log(this.dealerCards[1]);
  return originalTopCard == afterCutTopCard;
}
