const assert = require('assert');
const Deck = require('../lib/Deck');
const Card = require('../lib/Card');

describe('Deck', function() {
  it('has an array of 52 cards', function () {
    let deck = new Deck();
    assert.equal(52, deck.cards.length);
  });

  describe('#deal()', function() {
    it('should return a card', function() {
      let deck = new Deck();
      let card = deck.deal();
      assert(card instanceof Card);
    });

    it('should remove a card from the deck', function () {
      let deck = new Deck();
      let card = deck.deal();
      assert.equal(51, deck.cards.length);
      let matchingCard = deck.cards.find(otherCard => {
        return otherCard.suit == card.suit && otherCard.value == card.value;
      });
      assert.equal(matchingCard, undefined);
    })
  });
});
