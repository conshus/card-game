let valueToWords = {
  1: 'Ace',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten'
};
function Card (value, suit) {
  this.suit = suit;
  this.value = value;
}
Card.prototype.toString = function () {
  if ((this.value > 0) && (this.value <= 10)){
    return `${valueToWords[this.value]} of ${this.suit}`;
  } else {
    return `${this.value} of ${this.suit}`;
  }
}
module.exports = Card;
