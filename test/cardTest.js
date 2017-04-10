var assert = require('assert');
let Card = require('../lib/Card');

describe('Card', function() {
  it('has a suit', function () {
    let card = new Card(3, 'Clubs');
    assert.equal('Clubs', card.suit);
  });

  it('has a value', function () {
    let card = new Card(3, 'Clubs');
    assert.equal(3, card.value);
  });

  describe('#toString()', function() {
    it('should return a string containing suit and value', function() {
      let card = new Card(3, 'Clubs');
      assert.equal('three of Clubs', card.toString());
    });
    it('should return a string for face cards too', function () {
      let queen = new Card('Queen', 'Hearts');
      assert.equal('Queen of Hearts', queen.toString());
    })
  });
});
