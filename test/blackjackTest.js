/*
 x A game (for our purposes) has one player and a dealer
 x At the start of the game, the player gets two cards and so does the dealer
 x The player can ask for another card
 x The player can repeat that request as many times as desired
 x Once the player doesn't want any more cards, the dealer will ask for more cards until the dealer's hand is worth at least 17
 x For today, assume that an Ace is worth 1, a face card (Jack, Queen, or King) is worth 10, and any other card is worth its number
 -- For Wednesday's assignment --
 x shuffle deck
 x Allow a choice of 1 or 11 for an Ace card
 x nice to have - player can cut the deck
 x test player strategy
   √if dealer's upcard is 7,8,9,10 or Ace - hit until total >= 17
   √if dealer's upcard is 4,5,6 - hit until total >= 12
   √if dealer's upcard is 2,3 - hit until total >= 13
   √if player's initial hand is an Ace and 10 value card = BLACKJACK!
   √if player's initial hand is a soft hand, player's limit is >=18
 x determine if card value results in bust, blackjack or returns value
 x determine winner
 x nice to have - doubling down
 x nice to have - splitting pairs
*/

const assert = require('assert');
const Card = require('../lib/Card');
const Deck = require('../lib/Deck');
const Blackjack = require('../lib/Blackjack');

describe('Blackjack', function(){
  let game;
  beforeEach(function(){
    game = new Blackjack('James', 'Florida');
  })
  it('has a player', function(){
    assert.equal(game.player, 'James');
  });
  it('has a dealer', function(){
    assert.equal(game.dealer,'Florida');
  });
  it('has a deck of 52 cards', function(){
    assert.equal(game.deck.cards.length,52);
  });
  describe('#start()', function(){
    it('cards have been shuffled 7 times', function(){
      game.startGame();
      assert.equal(game.timesShuffled, 7);
    });
    it('player has cut the cards', function(){
      game.startGame();
      assert.equal(game.startGame(),false);
    })
    it('player gets two cards', function(){
      game.startGame();
      assert.equal(game.playerCards.length,2);
    });
    it('dealer gets two cards', function(){
      game.startGame();
      assert.equal(game.dealerCards.length,2);
    });
  })
  describe('#playerDealt()', function(){
    it('player asked for another card (hit)', function(){
      game.startGame();
      game.playerDealt();
      assert.equal(game.playerCards.length>2,true);
    })
  })
  describe('#playerLimit()', function(){
    it('player hits until limit based on strategy', function(){
      game.startGame();
      game.playerLimit();
      assert.equal(game.playerLimit(),true);
    })
  })
  describe('#dealerDealt()', function(){
    it('player does not want anymore cards (stand)', function(){
      game.startGame();
      game.dealerDealt();
      //let dealerDealt = game.dealerLimit();
      assert.equal(game.dealerCards.length>2,true);
    })
  })
  describe('#dealerLimit()', function(){
    it('dealer takes cards till value >= 17', function(){
      game.startGame();
      //let dealerDealt = game.dealerDealt();
      game.dealerLimit();
      assert.equal(game.dealerLimit()>=17,true);
    })
  })
  describe('#handResult()', function(){
    it('busts if total cards value > 21', function(){
      assert.equal(game.handResult(25),'bust');
    })
    it('hits blackjack if total cards value = 21', function(){
      assert.equal(game.handResult(21),'blackjack');
    })
    it('returns value if total cards value < 21', function(){
      assert.equal(game.handResult(18)==18,true);
    })
  })
  describe('#doubleDownResult()', function(){
    it('player decides to double down when first 2 cards total 9, 10 or 11', function(){
      let doubleDown=[9, 10, 11];
      game.startGame();
      for (i=0; i<doubleDown.length; i++){
        game.playerFirstTwoCardsTotal = doubleDown[i];
        assert.equal(game.doubleDownResult(), 'double down');
      }
    })
  })
  describe('#splittingPairs()', function(){
    it('player has the option to split pairs', function(){
      assert.equal(game.splittingPairs(12,12),"Cards can be split");
    })
  })
  describe('#gameOver()', function(){
    it('Dealer wins', function(){
      assert.equal(game.gameOver(26,12),"Dealer wins");
      assert.equal(game.gameOver(17,20),"Dealer wins");
    })
    it('Player wins', function(){
      assert.equal(game.gameOver(12,26),"Player wins");
      assert.equal(game.gameOver(20,17),"Player wins");
    })
    it('There is a draw', function(){
      assert.equal(game.gameOver(15,15),"Draw");
      assert.equal(game.gameOver(23,23),"Draw");
    })
  })
})
