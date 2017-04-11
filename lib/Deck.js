let Card = require('./Card');

function Deck () {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
  this.cards = suits.reduce((cards, suit) => {
    return cards.concat(values.reduce((cardsOfSuit, value) => {
      return cardsOfSuit.concat(new Card(value, suit));
    }, []));
  }, []);
  //console.log(this.cards);
}
Deck.prototype.deal = function(){
  //let randomCard = Math.floor(Math.random() * (51));
  //cardDealt = this.cards[randomCard];
  //this.cards.splice(this.cards[randomCard],1);
  //let cardDealt = this.cards[0];
  //console.log(this.cards.shift());
  return this.cards.shift();
  //let otherCard=cardDealt;
  //return cardDealt;
}
//Deck.prototype.find = function(){
  //return cardDealt;
//}
module.exports = Deck;
