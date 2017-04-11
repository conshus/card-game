/*
 x A game (for our purposes) has one player and a dealer
 x At the start of the game, the player gets two cards and so does the dealer
 x The player can ask for another card
 x The player can repeat that request as many times as desired
 x Once the player doesn't want any more cards, the dealer will ask for more cards until the dealer's hand is worth at least 17
 x For today, assume that an Ace is worth 1, a face card (Jack, Queen, or King) is worth 10, and any other card is worth its number
*/

const assert = require('assert');
const Card = require('../lib/Card');
const Deck = require('../lib/Deck');
const Blackjack = require('../lib/Blackjack');

describe('Blackjack', function(){
  it('has a player', function(){
    let game = new Blackjack('James');
    assert.equal(game.player, 'James');
  });
  it('has a dealer', function(){
    let game = new Blackjack('James','Florida');
    assert.equal(game.dealer,'Florida');
  });
  it('has a deck of 52 cards', function(){
    let game = new Blackjack('James','Florida');
    //console.log(game.deck);
    assert.equal(game.deck.cards.length,52);
  });
  describe('#start()', function(){
    it('player gets two cards', function(){
      let game = new Blackjack('James','Florida');
      let gameStart = game.startGame();
      assert.equal(game.playerCards.length,2);
      assert.equal(game.playerCards.includes(game.deck.cards),false);
    });
    it('dealer gets two cards', function(){
      let game = new Blackjack('James','Florida');
      let gameStart = game.startGame();
      assert.equal(game.dealerCards.length,2);
      assert.equal(game.dealerCards.includes(game.deck.cards),false);
    });
  })
  describe('#playerDealt()', function(){
    it('player asked for another card', function(){
      let game = new Blackjack('James','Florida');
      let gameStart = game.startGame();
      let playerDealt = game.playerDealt();
      assert.equal(game.playerCards.length>2,true);
    })
  })
  describe('#dealerDealt()', function(){
    it('player does not want anymore cards', function(){
      let game = new Blackjack('James','Florida');
      let gameStart = game.startGame();
      let dealerDealt = game.dealerDealt();
      assert.equal(game.dealerCards.length>2,true);
    })
  })
  describe('#dealerLimit()', function(){
    it('dealer takes cards till value >= 17', function(){
      let game = new Blackjack('James','Florida');
      let gameStart = game.startGame();
      let dealerDealt = game.dealerDealt();
      //let dealerLimit = game.dealerLimit();
      assert.equal(game.dealerLimit()>=17,true);
    })
  })
})
